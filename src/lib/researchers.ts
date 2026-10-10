export interface StudentResearcher {
  id: string;
  name: string;
  englishName: string;
  mbti: string;
  heading: string;
  introduction: string;
  interests: readonly string[];
  hobbies: readonly string[];
  focus: readonly string[];
  illustration: string;
  illustrationAlt: string;
  links: readonly {
    label: string;
    href: string;
    kind: "instagram" | "linkedin" | "blog";
  }[];
}

/**
 * Profiles based exclusively on information supplied for public researcher
 * introductions. Interests are not verified formal lab duties or outputs.
 * Images are user-provided artistic portraits, not identification photos.
 */
export const studentResearchers: readonly StudentResearcher[] = [
  {
    id: "kim-ye-bin",
    name: "김예빈",
    englishName: "Kim Ye Bin",
    mbti: "ISTJ",
    heading: "꾸준한 성장과 균형을 생각합니다.",
    introduction:
      "목표를 정하면 차근차근 실행하며 더 나은 방향을 찾는 데 관심이 있습니다. 재무와 회계를 중심으로 공부하면서 음악과 운동을 통해 일상의 균형도 소중히 여깁니다. 세심한 관찰과 꾸준한 실천을 바탕으로 다양한 경험을 쌓아가고자 합니다.",
    interests: ["음악", "자기관리", "자기계발"],
    hobbies: ["운동", "바이올린", "방탈출"],
    focus: ["재무", "회계"],
    illustration: "/researchers/kim-ye-bin.avif",
    illustrationAlt: "연못과 꽃이 가득한 인상주의 풍경 속 인물을 표현한 회화풍 이미지",
    links: [
      { kind: "instagram", label: "Instagram · @nx3.sv", href: "https://www.instagram.com/nx3.sv/" },
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/예빈-김-881bb6441" },
    ],
  },
  {
    id: "eom-tae-yeon",
    name: "엄태연",
    englishName: "Eom TaeYeon",
    mbti: "ENFP",
    heading: "시장의 움직임을 직접 관찰하고 배웁니다.",
    introduction:
      "경영학을 공부하며 금융시장과 트레이딩의 원리를 이해하는 데 관심을 두고 있습니다. 경제 기사를 읽고 관심 있는 도시를 직접 방문하며, 책에서 접한 생각을 현실의 경험과 비교해봅니다. 반복해서 관찰하고 확인하는 과정을 통해 독립적인 판단 역량을 기르고자 합니다.",
    interests: ["금융시장", "프랍 트레이딩", "나스닥·원자재"],
    hobbies: ["경제기사 읽기", "도시 탐방"],
    focus: ["금융", "트레이딩"],
    illustration: "/researchers/eom-tae-yeon.avif",
    illustrationAlt: "별이 빛나는 밤의 세계지도와 금융시장 자료를 바라보는 인물을 묘사한 회화풍 이미지",
    links: [
      { kind: "blog", label: "Blog · 독서와 트레이딩", href: "https://m.blog.naver.com/taeyeon_unn" },
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/태연-엄-017005442" },
    ],
  },
  {
    id: "kim-min-a",
    name: "김민아",
    englishName: "Kim Min A",
    mbti: "INFP",
    heading: "사람의 경험에서 새로운 서비스를 발견합니다.",
    introduction:
      "새로운 경험과 다양한 분야에 호기심을 느끼며, 사람과 현상을 여러 관점에서 바라보는 것을 좋아합니다. 궁금한 문제의 이유를 이해하는 것에서 시작해 AI 서비스와 서비스 기획, 사용자 경험에 대한 생각을 넓혀가고 있습니다. 일상에서 발견한 작은 불편을 더 나은 경험으로 연결하는 방법을 배우고자 합니다.",
    interests: ["AI 서비스", "서비스 기획", "UX·사용자 경험"],
    hobbies: ["생각 정리", "해외여행", "드라이브"],
    focus: ["AI 서비스", "UX", "서비스 기획"],
    illustration: "/researchers/kim-min-a.avif",
    illustrationAlt: "노을 진 지중해 해안과 여행·UX 노트가 함께 그려진 회화풍 이미지",
    links: [
      { kind: "instagram", label: "Instagram · @min._.naaa", href: "https://www.instagram.com/min._.naaa/" },
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/min-a-kim-a85a71441" },
    ],
  },
];
