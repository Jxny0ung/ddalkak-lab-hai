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
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="page-hero__bottom">
        <p>{description}</p>
        {meta ? <p className="page-hero__meta">{meta}</p> : null}
      </div>
    </section>
  );
}
