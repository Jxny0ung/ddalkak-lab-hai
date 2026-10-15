import Image from "next/image";

type ReactorCoreProps = {
  size?: "mini" | "panel" | "hq";
  active?: boolean;
  eyebrow?: string;
  label?: string;
  className?: string;
  ariaLabel?: string;
};

/** Compatibility wrapper for the former circular core artwork.
 * All HAI views now use the non-circular neural flow illustration.
 */
export function ReactorCore({
  size = "panel",
  active = false,
  className = "",
  ariaLabel = "Human–AI Interaction neural flow",
}: ReactorCoreProps) {
  return (
    <div
      className={["hai-neural-embed", `hai-neural-embed--${size}`, active ? "hai-neural-embed--active" : "", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={ariaLabel}
    >
      <Image
        src="/visuals/hai-interaction.svg"
        alt=""
        width={1000}
        height={760}
        sizes="(max-width: 768px) 88vw, 40vw"
      />
    </div>
  );
}
