"use client";

import Link from "next/link";
import { useState } from "react";
import { ReactorCore } from "@/components/reactor-core";

const concepts = [
  {
    key: "question",
    number: "01",
    title: "연구 질문",
    english: "Question",
    description: "가운데 코어는 해결하려는 질문을 상징합니다. AI보다 먼저 무엇을 알고 싶은지 정합니다.",
  },
  {
    key: "methods",
    number: "02",
    title: "방법론",
    english: "Methods",
    description: "회전하는 링은 관찰·분석·실험 절차를 상징합니다. 결과를 재현할 수 있도록 과정을 기록합니다.",
  },
  {
    key: "evidence",
    number: "03",
    title: "검증과 공유",
    english: "Evidence",
    description: "코어 바깥의 인터페이스는 검증·수정·공유를 상징합니다. 데모와 검증된 연구 결과를 구분합니다.",
  },
] as const;

/** Homepage-only symbolic interaction, not the audio detector or an AI agent. */
export function CoreHeroVisual() {
  const [active, setActive] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [selectedKey, setSelectedKey] = useState<(typeof concepts)[number]["key"]>("question");
  const selected = concepts.find((item) => item.key === selectedKey) ?? concepts[0];

  return (
    <div className="sl-core-hero" data-active={active} data-motion={motionPaused ? "paused" : "running"}>
      <div className="sl-core-hero__top">
        <span className="sl-core-hero__eyebrow">DDALKAK / HUMAN–AI INTERACTION</span>
        <span className="sl-core-hero__state">{active ? "CORE VISUAL ACTIVE" : "RESEARCH CORE / STANDBY"}</span>
      </div>

      <div className="sl-core-hero__stage">
        <div className="sl-core-hero__halo" aria-hidden="true" />
        <span className="sl-core-hero__mark sl-core-hero__mark--top" aria-hidden="true">01 / EXPERIMENTAL INTELLIGENCE</span>
        <ReactorCore
          size="hq"
          active={active}
          eyebrow="DDALKAK"
          label="CORE"
          ariaLabel="DDALKAK LAB 고유의 다층 회전형 에너지 코어. 연구 질문과 방법론, 검증의 연결을 상징하는 시각화"
        />
        <span className="sl-core-hero__mark sl-core-hero__mark--bottom" aria-hidden="true">
          RESEARCH · METHOD · EVIDENCE
        </span>
      </div>

      <div className="sl-core-hero__controls">
        <button className="sl-core-hero__activate" type="button" aria-pressed={active} onClick={() => setActive((v) => !v)}>
          {active ? "코어 초기화 ↺" : "코어 활성화 ↗"}
        </button>
        <button className="sl-core-hero__pause" type="button" aria-pressed={motionPaused} onClick={() => setMotionPaused((v) => !v)}>
          {motionPaused ? "모션 재생 ▶" : "모션 정지 Ⅱ"}
        </button>
      </div>

      <div className="sl-core-hero__topics" aria-label="코어 디자인에 담긴 연구 의미">
        {concepts.map((concept) => (
          <button
            key={concept.key}
            type="button"
            className={concept.key === selectedKey ? "sl-core-hero__topic selected" : "sl-core-hero__topic"}
            aria-pressed={concept.key === selectedKey}
            onClick={() => setSelectedKey(concept.key)}
          >
            <small>{concept.number}</small>
            <span>{concept.title}</span>
          </button>
        ))}
      </div>
      <div className="sl-core-hero__detail" aria-live="polite" aria-atomic="true">
        <strong>{selected.english}</strong>
        <p>{selected.description}</p>
      </div>
      <div className="sl-core-hero__foot">
        <span>오리지널 연구용 시각화 · 외부 AI/마이크 실행 없음</span>
        <Link href="/lab">HAI Lab <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  );
}
