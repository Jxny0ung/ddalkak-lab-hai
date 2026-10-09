"use client";

import Link from "next/link";
import { useState } from "react";
import { ReactorCore } from "@/components/reactor-core";

/**
 * A small, explicitly simulated interaction on the student homepage.
 * Microphone detection and external tool execution belong to /lab, not here.
 */
export function CoreMotionShowcase() {
  const [activated, setActivated] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);

  return (
    <section className="sl-core-feature" aria-labelledby="sl-core-feature-title">
      <div className="sl-container sl-core-feature__layout">
        <div className="sl-core-feature__copy">
          <span className="sl-kicker">INTERACTIVE LAB / 01</span>
          <h2 id="sl-core-feature-title">
            화면을 넘어,
            <br />
            <em>반응하는 인터페이스.</em>
          </h2>
          <p className="sl-core-feature__lead">
            딸깍 연구소의 초기 실험에서 발전시킨 오리지널 에너지 코어입니다.
            회전과 상태 변화를 직접 조작해 보고, HAI Lab에서 박수 인식 실험으로 이어가세요.
          </p>
          <div className="sl-core-feature__sequence" aria-label="HAI 연구 흐름">
            <div><span>01</span><strong>사람의 신호</strong><small>Clap · Click</small></div>
            <div><span>02</span><strong>CORE 반응</strong><small>Visual feedback</small></div>
            <div><span>03</span><strong>검증과 기록</strong><small>Research protocol</small></div>
          </div>
          <Link className="sl-btn sl-btn-dark" href="/lab">
            HAI Lab에서 박수 실험하기 <span aria-hidden="true">↗</span>
          </Link>
          <p className="sl-core-feature__aside">
            이곳은 시각화 체험입니다. 실제 마이크 인식과 연구용 프로토타입은 HAI Lab에 분리되어 있습니다.
          </p>
        </div>

        <div
          className="sl-core-feature__stage"
          data-active={activated ? "true" : "false"}
          data-motion={motionPaused ? "paused" : "running"}
        >
          <div className="sl-core-feature__stage-head">
            <span><i aria-hidden="true" /> DDALKAK / CORE</span>
            <small>INTERACTION PREVIEW · LOCAL ONLY</small>
          </div>

          <div className="sl-core-feature__reactor">
            <div className="sl-core-feature__reticle" aria-hidden="true" />
            <ReactorCore
              size="hq"
              active={activated}
              eyebrow="DDALKAK"
              label="CORE"
              ariaLabel="회전하는 DDALKAK 에너지 코어의 오리지널 인터페이스 시각화"
            />
          </div>

          <div className="sl-core-feature__stage-readout" role="status" aria-live="polite" aria-atomic="true">
            <span className="sl-core-feature__status-dot" aria-hidden="true" />
            <div>
              <strong>{activated ? "VISUAL ACTIVE" : "STANDBY"}</strong>
              <p>{activated
                ? "클릭 입력으로 화면의 반응 상태를 전환했습니다."
                : "아래 버튼을 눌러 시각 반응을 체험해 보세요."}</p>
            </div>
            <span className="sl-core-feature__stage-index">01 / HAI</span>
          </div>

          <div className="sl-core-feature__controls">
            <button
              className="sl-core-feature__primary"
              type="button"
              aria-pressed={activated}
              onClick={() => setActivated((value) => !value)}
            >
              {activated ? "반응 초기화" : "코어 반응 보기"}
              <span aria-hidden="true">{activated ? "↺" : "↗"}</span>
            </button>
            <button
              className="sl-core-feature__secondary"
              type="button"
              aria-pressed={motionPaused}
              onClick={() => setMotionPaused((value) => !value)}
            >
              {motionPaused ? "모션 재생" : "모션 일시정지"}
              <span aria-hidden="true">{motionPaused ? "▶" : "Ⅱ"}</span>
            </button>
          </div>
          <p className="sl-core-feature__stage-note">
            시각 데모 · 음성 수집 없음 · 외부 AI/MCP 호출 없음
          </p>
        </div>
      </div>
    </section>
  );
}
