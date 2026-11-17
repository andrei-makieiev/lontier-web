import Image from "next/image";

/**
 * The one image frame of the design system: a photograph plus a single
 * hairline 14px outside it. "print" is 4:5; "arch" is used once (The House).
 */
export function Frame({
  kind = "print",
  src,
  alt,
  sizes,
  priority = false,
  eager = false,
}: {
  kind?: "print" | "arch";
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Load now even if hidden (used for the closed service panels once the section is near). */
  eager?: boolean;
}) {
  return (
    <div className={kind} data-frame="">
      <div className="hair deco" />
      <div className="win" data-drift="">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : eager ? "eager" : "lazy"} style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}
