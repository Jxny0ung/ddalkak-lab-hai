import Image from "next/image";

/** Original generated key art, explicitly separated from actual gameplay. */
export function FactoryIllustration() {
  return <figure className="dx-factory-art">
    <Image src="/visuals/factory-industrial.webp" alt="자동차 생산라인과 작업등을 표현한 게임 콘셉트 이미지" fill sizes="(max-width: 700px) 100vw, 700px" />
    <figcaption>AI 콘셉트 이미지</figcaption>
  </figure>;
}
