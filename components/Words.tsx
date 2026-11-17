import type { ElementType } from "react";

/**
 * Headline that rises word by word from a mask (see .w-o / .w-i in globals.css).
 * Split on the server, so no DOM rewriting happens in the browser.
 */
export function Words({
  lines,
  as: Tag = "h2",
  className = "display",
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
}) {
  let i = 0;
  return (
    <Tag className={className} data-words="">
      {lines.map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {line.split(" ").map((w, wi) => (
            <span key={wi}>
              {wi > 0 && " "}
              <span className="w-o">
                <span className="w-i" style={{ transitionDelay: `${i++ * 42}ms` }}>
                  {w}
                </span>
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
