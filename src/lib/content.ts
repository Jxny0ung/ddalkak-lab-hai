export const researchAreas = [
  {
    code: "01",
    slug: "human-ai-interaction",
    title: "Human–AI Interaction",
    description:
      "사람이 생성형 AI와 함께 탐색하고 판단하고 창작하는 과정에서 상호작용 방식이 신뢰, 태도, 성과에 어떤 차이를 만드는지 살펴봅니다.",
  },
  {
    code: "02",
    slug: "media-information-trust",
    title: "Media, Information & Trust",
    description:
      "AI가 정보 노출, 뉴스 소비, 허위정보와 팩트체킹, 메시지 처리와 표현을 어떻게 바꾸는지 커뮤니케이션 관점에서 분석합니다.",
  },
  {
    code: "03",
    slug: "platforms-management",
    title: "Platforms, Incentives & Management",
    description:
      "플랫폼의 인센티브 구조, AI 협업, 조직 의사결정과 시장 반응을 경영학의 질문과 연결해 연구합니다.",
  },
  {
    code: "04",
    slug: "computational-communication",
    title: "Computational Communication",
    description:
      "텍스트·플랫폼 데이터를 수집하고 분석해 인간–AI–미디어의 상호작용을 관찰 가능한 데이터로 바꿉니다.",
  },
] as const;

export const agenda = [
  "Misinformation & Fact-checking",
  "Algorithmic Curation",
  "Human–AI Collaboration",
  "Platform Governance & Incentives",
] as const;

export const methods = [
  {
    title: "Experiment & Survey",
    description:
      "온라인 실험과 설문을 통해 인과관계와 태도·행동 변화를 검증합니다.",
    output: "연구 가설 · 조작 설계 · 측정 문항 · 분석 계획",
  },
  {
    title: "Content Analysis",
    description:
      "명확한 코드북과 표본 설계를 바탕으로 메시지와 콘텐츠를 체계적으로 분석합니다.",
    output: "코드북 · 표본 기준 · 코더 지침 · 신뢰도 점검",
  },
  {
    title: "Text & Computational Analysis",
    description:
      "텍스트 마이닝, NLP, LLM 보조 분석을 연구 질문에 맞게 적용합니다.",
    output: "수집 규칙 · 전처리 로그 · 분석 코드 · 검증 절차",
  },
  {
    title: "Behavioral Data",
    description:
      "클릭, 선택, 로그와 같은 행동 데이터를 통해 실제 상호작용 패턴을 살펴봅니다.",
    output: "이벤트 정의 · 로그 스키마 · 품질 점검 · 분석 변수",
  },
  {
    title: "HAI / Usability",
    description:
      "과업 수행, 인터뷰, 사용성 관찰을 결합해 AI와의 상호작용 경험을 분석합니다.",
    output: "과업 시나리오 · 관찰 기준 · 인터뷰 가이드 · 사용성 기록",
  },
  {
    title: "Mixed Methods",
    description:
      "정량·정성 자료를 교차 검증해 하나의 방법으로 놓치기 쉬운 맥락을 보완합니다.",
    output: "통합 설계 · 삼각검증 기준 · 해석 메모 · 한계 기록",
  },
] as const;

export const workflow = [
  {
    title: "Explore",
    description:
      "논문과 사례에서 질문을 찾고, 재현할 가치가 있는 메커니즘을 선별합니다.",
  },
  {
    title: "Rebuild",
    description:
      "연구 설계와 AI 워크플로를 작은 단위로 다시 구현합니다.",
  },
  {
    title: "Improve",
    description:
      "실패 지점과 한계를 기록하고 설계·측정·인터랙션을 개선합니다.",
  },
  {
    title: "Share",
    description:
      "코드, 방법, 판단 근거와 배운 점을 재현 가능한 형태로 남깁니다.",
  },
] as const;

export const projects = [
  {
    status: "BUILDING",
    title: "Research Platform",
    description:
      "연구 질문, 방법론, 선행연구, 실험 설계와 연구 로그를 한곳에서 축적하는 공개 연구 인터페이스를 구축합니다.",
    note: "현재 사이트 구조와 공개 아카이브 체계를 구축하는 단계입니다.",
  },
  {
    status: "BUILDING",
    title: "Clap HAI Interface",
    description:
      "사용자가 명시적으로 마이크를 허용한 뒤 두 번의 박수를 의도 신호로 감지해 AI 인터페이스를 활성화하는 HAI 프로토타입입니다.",
    note: "현재 버전은 Web Audio API에서 로컬 분석만 수행하며 오디오를 저장하거나 서버로 전송하지 않습니다.",
  },
  {
    status: "PLANNED",
    title: "HAI Method Sprint",
    description:
      "선행연구의 핵심 설계를 작은 단위로 재구성해 측정, 조작, 상호작용 설계의 문제를 점검하는 방법론 스프린트를 준비합니다.",
    note: "완료된 실증 결과가 아니라 연구 설계 단계입니다.",
  },
  {
    status: "PLANNED",
    title: "MCP Agent Company",
    description:
      "사용자 의도를 agent router가 해석하고 MCP gateway를 통해 허용된 도구를 호출하는 감사 가능한 AI 조직 구조를 설계합니다.",
    note: "현재는 시각화와 아키텍처 계획 단계이며 실제 자율 도구 실행은 아직 연결하지 않았습니다.",
  },
  {
    status: "PLANNED",
    title: "Open Research Archive",
    description:
      "공개 가능한 코드, 방법 노트, 재현 기록, 실패와 수정 과정을 연구 단계별로 정리하는 아카이브를 준비합니다.",
    note: "개인정보, 비공개 연구자료, 참여자 데이터는 공개 대상에서 제외합니다.",
  },
] as const;

export const principles = [
  "질문을 먼저 정하고 도구는 그다음에 선택합니다.",
  "계획, 가설, 프로토타입과 완료된 연구 결과를 명확히 구분합니다.",
  "재현 가능한 기록과 검증 가능한 근거를 남깁니다.",
  "AI가 생성한 결과를 검증 없이 연구 결과로 취급하지 않습니다.",
  "개인정보, 참여자 데이터, 비공개 연구자료는 공개 저장소에 올리지 않습니다.",
] as const;
