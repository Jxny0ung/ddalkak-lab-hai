export type ProgramStatus = "진행 기록 준비" | "서평 등록 준비" | "플레이 가능" | "공개 전";

export const labPrograms = [
  {
    id: "eth",
    index: "01",
    eyebrow: "RESEARCH / PAPER PROJECT",
    title: "AI 기반 ETH 논문 프로젝트",
    description: "AI를 연구 도구로 활용하는 논문 프로젝트의 질문, 검증 절차, 변경 이력을 기록할 공간입니다. 현재 공개 가능한 세부 연구 설계와 결과는 확정 자료를 받기 전까지 표시하지 않습니다.",
    status: "진행 기록 준비",
    href: "/work/eth",
    action: "연구 기록 구조 보기",
  },
  {
    id: "reading",
    index: "02",
    eyebrow: "READING / CRITICAL REVIEW",
    title: "AI 책 읽기와 서평",
    description: "AI를 둘러싼 기술과 사회적 질문을 책으로 읽고, 주장·근거·생각을 구분해 서평으로 남기는 활동입니다. 아직 게시한 서평은 없습니다.",
    status: "서평 등록 준비",
    href: "/reading",
    action: "독서 아카이브 보기",
  },
  {
    id: "games",
    index: "03",
    eyebrow: "MAKE / PLAY / REVIEW",
    title: "AI로 만드는 웹 게임",
    description: "게임 기획, 제작, 시연을 통해 AI 협업과 상호작용을 탐색합니다. TOYOTA: PRIORITY Factory Command v0.6 브라우저 플레이 버전을 공개했습니다.",
    status: "플레이 가능",
    href: "/games",
    action: "게임 실행하러 가기",
  },
  {
    id: "prompts",
    index: "04",
    eyebrow: "PROCESS / PROMPT ARCHIVE",
    title: "제작 프롬프트 기록",
    description: "연구·독서·게임 제작의 프롬프트, 수정 과정, 검증 한계를 추후 공유하기 위한 아카이브입니다. 현재는 구조만 구축하고 프롬프트 원문은 공개하지 않습니다.",
    status: "공개 전",
    href: "/prompts",
    action: "공유 기준 확인하기",
  },
] as const;
