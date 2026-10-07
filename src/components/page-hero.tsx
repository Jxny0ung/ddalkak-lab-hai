type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  meta,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__grid">
        <div className="page-hero__copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <div className="page-hero__bottom">
            <p>{description}</p>
            {meta ? <p className="page-hero__meta">{meta}</p> : null}
          </div>
        </div>

        <div className="page-hero__visual" aria-hidden="true">
          <span className="page-hero__axis page-hero__axis--x" />
          <span className="page-hero__axis page-hero__axis--y" />
          <span className="page-hero__ring page-hero__ring--1" />
          <span className="page-hero__ring page-hero__ring--2" />
          <span className="page-hero__dot" />
          <span className="page-hero__visual-label page-hero__visual-label--top">
            SIGNAL
          </span>
          <span className="page-hero__visual-label page-hero__visual-label--side">
            EVIDENCE
          </span>
        </div>
      </div>
    </section>
  );
}
