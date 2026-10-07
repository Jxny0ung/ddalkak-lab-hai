type ReactorCoreProps = {
  size?: "mini" | "panel" | "hq";
  active?: boolean;
  eyebrow?: string;
  label?: string;
  className?: string;
  ariaLabel?: string;
};

export function ReactorCore({
  size = "panel",
  active = false,
  eyebrow = "DDALKAK",
  label = "CORE",
  className = "",
  ariaLabel = "DDALKAK rotating energy core",
}: ReactorCoreProps) {
  return (
    <div
      aria-label={ariaLabel}
      className={[
        "reactor-core",
        `reactor-core--${size}`,
        active ? "reactor-core--active" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="img"
    >
      <span className="reactor-core__aura" aria-hidden="true" />
      <span className="reactor-core__orbit reactor-core__orbit--a" aria-hidden="true" />
      <span className="reactor-core__orbit reactor-core__orbit--b" aria-hidden="true" />

      <div className="reactor-core__shell" aria-hidden="true">
        <span className="reactor-core__rail reactor-core__rail--outer" />
        <span className="reactor-core__rail reactor-core__rail--middle" />
        <span className="reactor-core__rail reactor-core__rail--inner" />
        <span className="reactor-core__segments" />
        <span className="reactor-core__spokes" />
        <span className="reactor-core__iris" />
        <span className="reactor-core__energy" />
        <span className="reactor-core__scan" />
      </div>

      <div className="reactor-core__label" aria-hidden="true">
        <small>{eyebrow}</small>
        <strong>{label}</strong>
      </div>
    </div>
  );
}
