import { Fragment, type CSSProperties, type ElementType } from "react";

/**
 * Page-title treatment: each word rises in (shared `cc-reveal` timing) while
 * showing a clipped crop of a metallic sheen photo instead of flat ink. The
 * crop differs per word purely because `background-position` percentages
 * resolve against each word's own (different) box size — see `.cc-sheen`.
 */
export function SheenText({
  text,
  as: Tag = "span",
  className = "",
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            className="cc-reveal cc-reveal-rise cc-reveal-fine relative inline-block"
            style={{ "--cc-stagger": i } as CSSProperties}
          >
            <span className="text-transparent">{word}</span>
            <span aria-hidden="true" className="cc-sheen">
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
