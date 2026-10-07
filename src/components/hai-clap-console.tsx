"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReactorCore } from "@/components/reactor-core";

type ConsoleState =
  | "idle"
  | "requesting"
  | "calibrating"
  | "listening"
  | "active"
  | "error";

const DOUBLE_CLAP_MIN_MS = 180;
const DOUBLE_CLAP_MAX_MS = 900;
const REFRACTORY_MS = 170;
const CALIBRATION_MS = 850;
const METER_PAINT_MS = 80;

export function HaiClapConsole() {
  const [state, setState] = useState<ConsoleState>("idle");
  const [meter, setMeter] = useState(0);
  const [sensitivity, setSensitivity] = useState(72);
  const [clapCount, setClapCount] = useState(0);
  const [message, setMessage] = useState(
    "마이크를 활성화한 뒤 0.18–0.90초 간격으로 박수를 두 번 쳐보세요.",
  );

  const contextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTransientRef = useRef(0);
  const firstClapRef = useRef<number | null>(null);
  const noiseFloorRef = useRef(0.018);
  const calibrationUntilRef = useRef(0);
  const lastMeterPaintRef = useRef(0);
  const stateRef = useRef<ConsoleState>("idle");
  const sensitivityRef = useRef(sensitivity);

  useEffect(() => {
    sensitivityRef.current = sensitivity;
  }, [sensitivity]);

  const stopAudio = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    const context = contextRef.current;
    contextRef.current = null;
    analyserRef.current = null;

    if (context && context.state !== "closed") {
      void context.close();
    }

    stateRef.current = "idle";
    setState("idle");
    setMeter(0);
    setClapCount(0);
    firstClapRef.current = null;
    setMessage(
      "마이크를 활성화한 뒤 0.18–0.90초 간격으로 박수를 두 번 쳐보세요.",
    );
  }, []);

  useEffect(() => stopAudio, [stopAudio]);

  const playActivationTone = useCallback(() => {
    const context = contextRef.current;
    if (!context || context.state === "closed") return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(660, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      990,
      context.currentTime + 0.13,
    );
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.18);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
  }, []);

  const activateCore = useCallback(() => {
    stateRef.current = "active";
    setState("active");
    setClapCount(2);
    setMessage("DDALKAK CORE online — 두 번의 박수를 하나의 의도 신호로 해석했습니다.");
    playActivationTone();
  }, [playActivationTone]);

  const startListening = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      stateRef.current = "error";
      setState("error");
      setMessage("이 브라우저에서는 마이크 입력을 사용할 수 없습니다.");
      return;
    }

    try {
      stateRef.current = "requesting";
      setState("requesting");
      setMessage("마이크 권한을 요청하고 있습니다…");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          autoGainControl: false,
          echoCancellation: false,
          noiseSuppression: false,
        },
        video: false,
      });

      const context = new AudioContext();
      if (context.state === "suspended") {
        await context.resume();
      }

      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.08;
      source.connect(analyser);

      streamRef.current = stream;
      contextRef.current = context;
      analyserRef.current = analyser;
      noiseFloorRef.current = 0.018;
      firstClapRef.current = null;
      lastTransientRef.current = 0;
      lastMeterPaintRef.current = 0;
      calibrationUntilRef.current = performance.now() + CALIBRATION_MS;
      stateRef.current = "calibrating";
      setState("calibrating");
      setClapCount(0);
      setMessage("주변 소음을 0.85초 동안 보정하고 있습니다. 잠시만 조용히 있어주세요.");

      const timeData = new Float32Array(analyser.fftSize);
      const frequencyData = new Uint8Array(analyser.frequencyBinCount);

      const monitor = () => {
        if (
          stateRef.current !== "calibrating" &&
          stateRef.current !== "listening" &&
          stateRef.current !== "active"
        ) {
          return;
        }

        analyser.getFloatTimeDomainData(timeData);
        analyser.getByteFrequencyData(frequencyData);

        let sumSquares = 0;
        let peak = 0;
        for (const sample of timeData) {
          const absolute = Math.abs(sample);
          peak = Math.max(peak, absolute);
          sumSquares += sample * sample;
        }

        const rms = Math.sqrt(sumSquares / timeData.length);
        const crest = peak / Math.max(rms, 0.0001);

        const binHz = context.sampleRate / analyser.fftSize;
        let highEnergy = 0;
        let highBins = 0;
        let totalEnergy = 0;

        for (let index = 1; index < frequencyData.length; index += 1) {
          const value = frequencyData[index];
          const hz = index * binHz;
          totalEnergy += value;
          if (hz >= 1500 && hz <= 8000) {
            highEnergy += value;
            highBins += 1;
          }
        }

        const highAverage = highBins ? highEnergy / highBins : 0;
        const totalAverage = totalEnergy / Math.max(frequencyData.length - 1, 1);
        const highRatio = highAverage / Math.max(totalAverage, 1);

        const now = performance.now();
        const floor = noiseFloorRef.current;

        if (stateRef.current === "calibrating") {
          noiseFloorRef.current = floor * 0.9 + rms * 0.1;

          if (now >= calibrationUntilRef.current) {
            stateRef.current = "listening";
            setState("listening");
            setMessage("Listening locally — 박수 두 번으로 CORE를 깨워보세요.");
          }
        } else if (rms < floor * 2.2) {
          noiseFloorRef.current = floor * 0.985 + rms * 0.015;
        }

        const sensitivityFactor = 1.42 - sensitivityRef.current / 100;
        const peakThreshold = Math.max(
          0.12,
          noiseFloorRef.current * (3.2 + sensitivityFactor * 4),
        );
        const rmsThreshold = Math.max(
          0.022,
          noiseFloorRef.current * (1.7 + sensitivityFactor * 2.1),
        );

        const visualLevel = Math.min(
          100,
          Math.round((rms / Math.max(noiseFloorRef.current * 7, 0.14)) * 100),
        );

        if (now - lastMeterPaintRef.current >= METER_PAINT_MS) {
          lastMeterPaintRef.current = now;
          setMeter(visualLevel);
        }

        const transient =
          stateRef.current === "listening" &&
          now > calibrationUntilRef.current + 120 &&
          peak > peakThreshold &&
          rms > rmsThreshold &&
          crest > 2.05 &&
          highRatio > 1.04 &&
          now - lastTransientRef.current > REFRACTORY_MS;

        if (transient && stateRef.current === "listening") {
          lastTransientRef.current = now;
          const first = firstClapRef.current;

          if (
            first !== null &&
            now - first >= DOUBLE_CLAP_MIN_MS &&
            now - first <= DOUBLE_CLAP_MAX_MS
          ) {
            firstClapRef.current = null;
            activateCore();
          } else {
            firstClapRef.current = now;
            setClapCount(1);
            setMessage("첫 번째 박수 감지 — 한 번 더!");
          }
        }

        if (
          firstClapRef.current !== null &&
          now - firstClapRef.current > DOUBLE_CLAP_MAX_MS
        ) {
          firstClapRef.current = null;
          setClapCount(0);
          if (stateRef.current === "listening") {
            setMessage("간격이 길었습니다. 다시 박수 두 번을 시도해보세요.");
          }
        }

        frameRef.current = requestAnimationFrame(monitor);
      };

      frameRef.current = requestAnimationFrame(monitor);
    } catch (error) {
      stateRef.current = "error";
      setState("error");
      setMessage(
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "마이크 권한이 거부되었습니다. 브라우저 권한을 허용하거나 수동 데모를 사용하세요."
          : "마이크를 시작하지 못했습니다. 다른 입력 장치나 브라우저를 확인해주세요.",
      );
    }
  }, [activateCore]);

  const resetActivation = useCallback(() => {
    if (!analyserRef.current || !streamRef.current) {
      stateRef.current = "idle";
      setState("idle");
      setMessage(
        "마이크를 활성화한 뒤 0.18–0.90초 간격으로 박수를 두 번 쳐보세요.",
      );
      setClapCount(0);
      return;
    }

    firstClapRef.current = null;
    stateRef.current = "listening";
    setState("listening");
    setClapCount(0);
    setMessage("Listening locally — 박수 두 번으로 CORE를 다시 깨워보세요.");
  }, []);

  const manualDemo = useCallback(() => {
    activateCore();
  }, [activateCore]);

  const listening =
    state === "calibrating" || state === "listening" || state === "active";

  return (
    <section className={`clap-console clap-console--${state}`}>
      <div className="clap-console__top">
        <div>
          <p className="eyebrow">HAI Prototype / Clap-to-Activate</p>
          <h2>
            두 번의 박수를
            <br />
            <em>의도 신호</em>로 바꿉니다.
          </h2>
        </div>
        <div className="clap-console__status">
          <span className="clap-console__status-dot" />
          <strong>{state.toUpperCase()}</strong>
        </div>
      </div>

      <div className="clap-console__grid">
        <div className="clap-listener">
          <div className="clap-listener__rings" aria-hidden="true">
            <span />
            <span />
            <span />
            <div className="clap-listener__core">
              <small>INPUT</small>
              <strong>{clapCount}/2</strong>
            </div>
          </div>

          <div className="audio-meter" aria-label={`입력 레벨 ${meter}%`}>
            <span style={{ width: `${meter}%` }} />
          </div>

          <p className="clap-listener__message" aria-live="polite">
            {message}
          </p>

          <div className="clap-console__actions">
            {!listening ? (
              <button
                className="button-primary"
                disabled={state === "requesting"}
                onClick={startListening}
                type="button"
              >
                {state === "requesting" ? "Requesting…" : "Arm microphone"}
                <span aria-hidden="true">◎</span>
              </button>
            ) : (
              <button className="button-ghost" onClick={stopAudio} type="button">
                Stop listening
              </button>
            )}

            <button className="button-ghost" onClick={manualDemo} type="button">
              Manual demo
            </button>
          </div>

          {state === "active" ? (
            <button className="clap-reset" onClick={resetActivation} type="button">
              Reset interaction ↻
            </button>
          ) : null}
        </div>

        <div className="core-panel" aria-live="polite">
          <div className="core-panel__head">
            <span>DDALKAK CORE</span>
            <small>{state === "active" ? "ONLINE" : "STANDBY"}</small>
          </div>

          <div className="core-panel__reactor">
            <ReactorCore
              active={state === "active"}
              ariaLabel={
                state === "active"
                  ? "활성화된 DDALKAK energy core"
                  : "대기 중인 DDALKAK energy core"
              }
              eyebrow="DDALKAK"
              label="CORE"
              size="panel"
            />
          </div>

          <div className="core-panel__body">
            <p>
              {state === "active"
                ? "Signal accepted. 지금은 로컬 인터랙션 프로토타입이며, 다음 단계에서 MCP 도구 호출과 에이전트 실행으로 확장할 수 있습니다."
                : "두 번의 박수는 단순한 효과음이 아니라 사용자의 의도·동의·피드백을 설계하는 HAI 입력 방식으로 다룹니다."}
            </p>

            <div className="core-command-grid">
              <span>Research</span>
              <span>Analyze</span>
              <span>Build</span>
              <span>Verify</span>
            </div>
          </div>
        </div>
      </div>

      <div className="clap-console__foot">
        <label>
          <span>Sensitivity</span>
          <input
            aria-label="박수 감지 민감도"
            max="92"
            min="45"
            onChange={(event) => setSensitivity(Number(event.target.value))}
            type="range"
            value={sensitivity}
          />
          <strong>{sensitivity}</strong>
        </label>
        <p>
          Privacy: 오디오는 녹음·업로드하지 않고 브라우저의 Web Audio API에서
          순간적인 레벨과 주파수 특성만 로컬 계산합니다.
        </p>
      </div>
    </section>
  );
}
