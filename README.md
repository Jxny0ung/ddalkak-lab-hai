# 모두의 딸깍 연구소 · DDALKAK LAB

학생이 생성형 AI 활용 사례를 **탐색 → 직접 구현 → 개선 → 공유**하는 경영학 × 미디어커뮤니케이션 × Human–AI Interaction(HAI) 실습·연구 플랫폼입니다.

## Information architecture

- **Home:** 연구소 소개, 실제로 열어볼 수 있는 프로젝트, 활동 방식
- **Projects:** 카테고리, 구현 상태, 프로젝트 상세, 제작 절차, 학습용 시행착오 시나리오
- **Learn:** Tutorials · Prompts · API Guides · Resources
- **Lab:** 기존 HAI 박수 인식 실험 및 Agent Company 설계 아카이브
- **About:** 연구 목적, 공유 원칙, 참여 안내

기존 `/research`, `/methods`, `/archive`, `/registry`, `/handbook`, `/system` 등 연구 페이지는 유지합니다.

## Local development

Node.js 22 이상 및 npm 필요.

```bash
npm ci
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

```bash
npm run lint
npm run build
```

## Student projects

프로젝트 정의: `src/lib/student-content.ts`

- `idea-map`: 브라우저 상태 기반의 아이디어 맵. **AI API 미연결**
- `prompt-builder`: 목표·역할·형식을 결합하는 프롬프트 생성기. **AI API 미호출**
- `business-dashboard`: **가상 데이터만 사용하는 기획 예시**
- `clap-interface`: 기존 HAI Lab 브라우저 마이크 실험에 연결되는 연구 실험

프로젝트 상태는 **사용 가능한 데모 / 기획 예시 / 연구 실험** 중 실제와 맞게 유지합니다. 완료되지 않은 기능, 허구의 활동 로그, 미검증 실적을 만들지 않습니다.

## Design

블랙/화이트/그레이 중심의 학생 프로젝트 우선 UI. 블루 포인트는 CTA와 현재 선택 상태에 제한적으로 사용합니다. 새로운 페이지용 스타일은 `src/app/student-platform.css`에 있고, 기존 연구 페이지 스타일은 호환성을 위해 유지합니다.

## Signature HAI interaction

홈페이지의 **DDALKAK CORE 미리보기**는 기존 오리지널 회전 코어를 학생 중심 UI 안에 제한적으로 다시 활용한 **브라우저 시각 데모**입니다. 클릭으로 반응 상태를 전환하고 모션을 일시정지할 수 있습니다. 마이크 수집, 실제 AI API 및 MCP 호출은 일어나지 않습니다. 동의를 받은 박수 인식 실험과 AI Company **미구현 구조 시각화**는 별도 `/lab`에 유지합니다. 자세한 설계 원칙은 [`docs/signature-motion-design.md`](docs/signature-motion-design.md)를 참고하세요.

## Security & privacy

- 실습용 목업 데이터와 실제 사업·연구 데이터는 명확하게 구분합니다.
- API 비밀키를 React Client Component나 브라우저 코드에 넣지 않습니다.
- 설문 응답, 연구 참가자의 개인정보, 비공개 논문/노트, 토큰은 공개 저장소에 올리지 않습니다.
- `AI Brain Map`과 `Prompt Builder` 데모는 입력값을 서버에 전송하지 않습니다.
- 외부 AI API 통합은 추후 인증, 키 관리, 사용량 제어, 오류처리와 승인 절차가 마련된 뒤 진행합니다.

## GitHub workflow

기능 개발은 `feat/` 브랜치를 생성하고, lint/build를 확인한 다음 pull request로 main에 반영합니다. 사이트가 배포된 경우에는 실제 배포 후에도 모바일 레이아웃·링크·문구를 점검합니다.
