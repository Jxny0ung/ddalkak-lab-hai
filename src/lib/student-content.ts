export type ProjectCategory = "AI Tools" | "Business Apps" | "Data" | "Education" | "Automation";
export type ProjectStatus = "사용 가능한 데모" | "기획 예시" | "연구 실험";

export interface LearningProject {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  technology: string;
  status: ProjectStatus;
  level: string;
  minutes: number;
  visual: "map" | "prompt" | "dashboard" | "hai";
  summary: string;
  motivation: string;
  process: string[];
  learning: string[];
  pitfalls: { symptom: string; cause: string; solution: string }[];
  limitations: string;
}

export const projectCategories: ProjectCategory[] = [
  "AI Tools", "Business Apps", "Data", "Education", "Automation",
];

export const studentProjects: LearningProject[] = [
  {
    slug: "idea-map",
    title: "AI Brain Map",
    subtitle: "하나의 아이디어를 질문과 실행 과제로 확장하는 브레인맵",
    category: "AI Tools",
    technology: "React · Local Demo · Gemini API 연동 전",
    status: "사용 가능한 데모",
    level: "입문",
    minutes: 15,
    visual: "map",
    summary: "아이디어를 입력하면 브라우저에서 연관 질문을 정리하는 작은 실습 도구입니다. AI API를 사용하지 않는 로컬 데모이며, 향후 Gemini API를 연결하는 과정을 학습 대상으로 삼습니다.",
    motivation: "생성형 AI를 활용한 아이디어 발산 도구의 화면과 상호작용 구조를 먼저 이해하기 위해 만들었습니다.",
    process: [
      "하나의 핵심 아이디어와 사용자의 과업을 입력받도록 설계합니다.",
      "질문·시장·실행·측정 네 영역의 노드를 브라우저 안에서 생성합니다.",
      "API 연결 전/후 결과의 차이를 비교할 수 있도록 구조를 단순하게 유지합니다.",
    ],
    learning: ["상태 관리와 폼 이벤트", "정보 구조 설계", "API 연동 전 목업 검증"],
    pitfalls: [
      { symptom: "입력 후 Enter를 눌러도 반응하지 않는 경우", cause: "입력창과 제출 이벤트가 연결되지 않은 경우가 있습니다.", solution: "form onSubmit과 preventDefault 처리 여부를 점검합니다." },
      { symptom: "생성된 맵이 AI의 추론처럼 보이는 문제", cause: "규칙 기반 템플릿임을 설명하지 않은 경우입니다.", solution: "로컬 템플릿 데모라는 표기를 화면에 명확히 둡니다." },
    ],
    limitations: "현재 생성 결과는 고정된 질문 템플릿을 활용하며 Gemini 등 외부 AI 모델에 연결되지 않습니다.",
  },
  {
    slug: "prompt-builder",
    title: "Prompt Builder",
    subtitle: "목표·역할·제약을 조합해 재사용 가능한 프롬프트 구성",
    category: "Education",
    technology: "React · TypeScript · Browser-only",
    status: "사용 가능한 데모",
    level: "입문",
    minutes: 10,
    visual: "prompt",
    summary: "목표, AI 역할, 결과 형식, 검증 조건을 선택해 프롬프트를 조립하는 브라우저 실습입니다. 텍스트는 서버에 저장되지 않습니다.",
    motivation: "프롬프트를 막연한 문장이 아니라 과업·조건·출력·검증으로 나누어 설계하는 연습을 위해 만들었습니다.",
    process: [
      "목표와 역할을 분리해 입력받습니다.",
      "출력 형식과 사실 확인 조건을 명시합니다.",
      "작성된 프롬프트를 복사해 외부 AI 도구에서 테스트하도록 안내합니다.",
    ],
    learning: ["구조화된 요구사항", "프롬프트 평가", "사용자 입력과 텍스트 생성"],
    pitfalls: [
      { symptom: "답변이 길지만 정확하지 않은 경우", cause: "검증 기준과 근거 요청이 빠졌을 수 있습니다.", solution: "불확실한 사실은 표시하고 확인이 필요한 내용을 분리하도록 조건을 추가합니다." },
    ],
    limitations: "프롬프트 문장만 생성합니다. AI API 호출이나 품질 자동 평가는 포함하지 않습니다.",
  },
  {
    slug: "business-dashboard",
    title: "Business Dashboard",
    subtitle: "예시 지표로 경영 의사결정 대시보드를 설계해보기",
    category: "Business Apps",
    technology: "Next.js · Mock Data · Dashboard UI",
    status: "기획 예시",
    level: "입문",
    minutes: 20,
    visual: "dashboard",
    summary: "매출, 주문, 전환율 등 가상 지표를 바탕으로 경영용 데이터 화면의 정보 구조를 연습하는 예시입니다.",
    motivation: "숫자를 나열하는 것과 실제 의사결정에 도움이 되는 화면을 만드는 것의 차이를 배우기 위해 설계합니다.",
    process: [
      "사용자가 내려야 할 의사결정을 먼저 정의합니다.",
      "가상 지표와 실제 데이터를 명확히 분리합니다.",
      "핵심 KPI, 비교 기간, 해석상의 한계를 함께 표시합니다.",
    ],
    learning: ["KPI 정의", "정보 시각화", "가상 데이터 표기"],
    pitfalls: [
      { symptom: "숫자는 많지만 결론이 보이지 않는 대시보드", cause: "의사결정 질문 없이 지표만 배치했기 때문입니다.", solution: "한 화면에 한 가지 핵심 의사결정 질문을 둡니다." },
    ],
    limitations: "표시된 수치는 모두 설명용 가상 데이터입니다. 실제 기업 실적이나 연구 결과가 아닙니다.",
  },
  {
    slug: "clap-interface",
    title: "Clap HAI Interface",
    subtitle: "두 번의 박수를 의도 신호로 사용하는 HAI 실험",
    category: "Automation",
    technology: "Web Audio API · HAI Lab",
    status: "연구 실험",
    level: "중급",
    minutes: 20,
    visual: "hai",
    summary: "사용자가 명시적으로 마이크 사용을 허용할 때 브라우저에서 박수 신호를 분석하는 HAI 프로토타입입니다.",
    motivation: "인간의 비언어적 신호가 어떻게 AI 인터페이스의 명령으로 해석될 수 있는지 살펴보기 위해 설계했습니다.",
    process: [
      "마이크 접근 동의를 사용자에게 요청합니다.",
      "로컬 오디오 이벤트에서 박수 간 시간 간격을 감지합니다.",
      "탐지 실패와 환경 소음에 따른 오작동 가능성을 연구 기록으로 남깁니다.",
    ],
    learning: ["Web Audio API", "동의 기반 인터페이스", "오탐·미탐과 실험 설계"],
    pitfalls: [
      { symptom: "주변 소음에 잘못 반응하는 경우", cause: "박수와 다른 강한 소리가 유사한 에너지 패턴을 보일 수 있습니다.", solution: "민감도와 시간 창을 조정하고 명시적인 수동 조작을 함께 제공합니다." },
    ],
    limitations: "인터페이스 실험 단계입니다. 외부 에이전트 실행이 자동 연결됐다는 의미가 아닙니다.",
  },
];

export const learningTracks = [
  {
    id: "tutorials",
    label: "Tutorials",
    title: "처음부터 따라 만드는 실습",
    description: "React 화면을 읽고, 입력을 받고, 사용자 반응을 다루는 기초 과정",
    steps: ["작은 문제 하나 정하기", "화면의 입력·출력 구조 그리기", "상태와 이벤트 연결하기", "오류를 기록한 뒤 다시 실행하기"],
    href: "/projects/idea-map",
    link: "브레인맵 실습 시작",
  },
  {
    id: "prompts",
    label: "Prompts",
    title: "좋은 프롬프트를 검증 가능한 형태로",
    description: "과업, 역할, 제약, 형식, 검증 기준을 나누어 프롬프트 구성하기",
    steps: ["최종 결과물 명시", "AI가 맡을 역할 지정", "출력 형식과 제약 추가", "근거 확인과 수정 기준 설정"],
    href: "/projects/prompt-builder",
    link: "프롬프트 빌더 열기",
  },
  {
    id: "api",
    label: "API Guides",
    title: "API 연결 전 반드시 점검할 것",
    description: "모델 호출보다 먼저 키 관리·요청 흐름·비용 제한을 이해하기",
    steps: ["API 키는 서버 환경 변수에만 보관", "브라우저에 비밀키 노출 금지", "요청 횟수·비용 상한 설정", "에러·응답 검증·사용자 동의 설계"],
    href: "/handbook",
    link: "운영 가이드 확인",
  },
  {
    id: "resources",
    label: "Resources",
    title: "연구 기록과 재현을 위한 자료",
    description: "프로젝트를 만든 다음 남겨야 할 근거와 기록의 최소 요건",
    steps: ["변경 내역 기록", "참고 자료와 출처 정리", "재현 가능한 실행 방법 작성", "공개 가능한 자료인지 확인"],
    href: "/archive",
    link: "아카이브 보기",
  },
] as const;
