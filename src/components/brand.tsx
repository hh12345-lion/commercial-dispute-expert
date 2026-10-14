import Image from "next/image";
import type { Photo } from "@/lib/images";

/** Full logo from the brand guidelines. `light` is the version for navy backgrounds. */
export function Logo({
  light = false,
  className = "h-10 w-auto",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={light ? "/brand/logo-light.svg" : "/brand/logo.svg"}
      alt="Commercial Dispute Expert"
      width={785}
      height={190}
      className={className}
    />
  );
}

/** The monogram: a navy bracket and a burgundy chevron. */
export function Mark({
  className = "h-8 w-auto",
  bracket = "#03263B",
  chevron = "#852C3C",
}: {
  className?: string;
  bracket?: string;
  chevron?: string;
}) {
  return (
    <svg viewBox="0 0 505 388" className={className} aria-hidden="true">
      <path
        d="M287.106 66.7016L258.202 124.51H130.513V271.965H250.398L384.935 0H0V387.003H316.01L287.106 329.061L66.9907 326.838V66.7016H287.106Z"
        fill={bracket}
      />
      <path
        d="M360.475 122.301H405.076L442.74 202.343L380.486 329.076H325.812L349.002 387.017H412.814L504.995 200.119L415.393 16.7344L360.475 122.301Z"
        fill={chevron}
      />
    </svg>
  );
}

/** The burgundy chevron on its own, as a small marker. */
export function Chevron({ className = "h-3 w-auto text-burgundy" }: { className?: string }) {
  return (
    <svg viewBox="325 16 180 371" className={className} fill="currentColor" aria-hidden="true">
      <path d="M360.475 122.301H405.076L442.74 202.343L380.486 329.076H325.812L349.002 387.017H412.814L504.995 200.119L415.393 16.7344L360.475 122.301Z" />
    </svg>
  );
}

/**
 * A photograph cut to point forward like the mark's chevron, held by an
 * open bracket on its left, as the navy bracket holds the chevron.
 */
export function ChevronPhoto({
  photo,
  className = "",
  aspect = "aspect-[4/3]",
  sizes = "(max-width: 1024px) 90vw, 520px",
  priority = false,
  bracket = "border-navy",
  tip = "14%",
}: {
  photo: Photo;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  bracket?: string;
  tip?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute -bottom-3 -left-3 -top-3 w-2/5 border-y-[10px] border-l-[10px] ${bracket}`}
        aria-hidden="true"
      />
      <div
        className={`chevron-r relative overflow-hidden bg-cream ${aspect}`}
        style={{ ["--tip" as string]: tip }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
