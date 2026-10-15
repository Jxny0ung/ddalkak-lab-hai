import Image from "next/image";

/** HAI visualization: two distinct streams connected through observable interaction. */
export function CoreHeroVisual() {
  return (
    <div className="hai-hero-art">
      <div className="hai-hero-art__image">
        <Image
          src="/visuals/hai-interaction.svg"
          alt="인간과 AI의 흐름이 입체적으로 교차하고, 빛나는 연결점으로 이어지는 HAI 추상 시각화"
          fill
          priority
          sizes="(max-width: 800px) 100vw, 48vw"
        />
      </div>
      <div className="hai-hero-art__lower">
        <span><i /> HUMAN–AI INTERACTION</span>
        <span>OBSERVE · EXPERIMENT · LEARN</span>
      </div>
    </div>
  );
}
