import type { LearningProject } from "@/lib/student-content";

export function ProjectVisual({ visual }: { visual: LearningProject["visual"] }) {
  if (visual === "map") {
    return (
      <div className="sl-art sl-art-map" aria-label="아이디어 맵 인터페이스 미리보기" role="img">
        <div className="sl-art-top"><span className="sl-art-dot"/> Idea map <span>•••</span></div>
        <div className="sl-map-grid">
          <div className="sl-map-branch">누구를 위한가?</div>
          <div className="sl-map-branch">어떤 문제인가?</div>
          <div className="sl-map-center">새로운 아이디어</div>
          <div className="sl-map-branch">어떻게 검증할까?</div>
          <div className="sl-map-branch">첫 실행 과제는?</div>
        </div>
      </div>
    );
  }
  if (visual === "prompt") {
    return (
      <div className="sl-art sl-art-prompt" aria-label="프롬프트 빌더 인터페이스 미리보기" role="img">
        <div className="sl-art-top"><span className="sl-art-dot"/> Prompt workshop <span>•••</span></div>
        <div className="sl-fake-field"><span>GOAL</span><strong>학생 대상 서비스 아이디어 정리</strong></div>
        <div className="sl-fake-field"><span>ROLE</span><strong>시장 조사자</strong></div>
        <div className="sl-fake-field"><span>FORMAT</span><strong>5개 항목의 표</strong></div>
        <div className="sl-fake-submit" aria-hidden="true">화면 구성 예시 <span>PREVIEW</span></div>
      </div>
    );
  }
  if (visual === "dashboard") {
    return (
      <div className="sl-art sl-art-dashboard" aria-label="가상 데이터 대시보드 미리보기" role="img">
        <div className="sl-art-top"><span className="sl-art-dot"/> Business snapshot <span>DEMO DATA</span></div>
        <div className="sl-dashboard-metrics">
          <div><span>매출 (예시)</span><strong>₩ 24.8M</strong><small>가상 증감</small></div>
          <div><span>전환율 (예시)</span><strong>3.8%</strong><small>가상 증감</small></div>
        </div>
        <div className="sl-chart-bars" aria-hidden="true">
          {[38, 55, 47, 72, 63, 85, 76, 95, 81, 100].map((v, i) => (
            <i key={i} style={{ height: v + "%" }}/>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="sl-art sl-art-hai" aria-label="박수 인식 HAI 인터페이스 미리보기" role="img">
      <div className="sl-art-top"><span className="sl-art-dot"/> HAI LAB <span>LOCAL PROTOTYPE</span></div>
      <div className="sl-hai-signal" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/></div>
      <strong>Clap → Intent</strong>
      <p>동의를 받은 뒤 오디오 신호를 브라우저에서 처리합니다.</p>
    </div>
  );
}
