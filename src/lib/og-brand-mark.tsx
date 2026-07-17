import { siteConfig } from "@/config/site";

type BrandMarkProps = {
  size: number;
  subtitle?: string;
  title?: string;
};

export function BrandMark({ size, subtitle, title }: BrandMarkProps) {
  const fontSize = Math.round(size * 0.22);
  const subtitleSize = Math.round(size * 0.08);
  const titleSize = Math.round(size * 0.14);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1c2b3a 0%, #1b5e20 100%)",
        color: "white",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: Math.round(size * 0.12),
      }}
    >
      {subtitle ? (
        <div style={{ fontSize: subtitleSize, color: "#86efac", marginBottom: Math.round(size * 0.04) }}>
          {subtitle}
        </div>
      ) : null}
      <div style={{ fontSize: title ? titleSize : fontSize, fontWeight: 700, lineHeight: 1.1 }}>
        {title ?? siteConfig.brandShort}
      </div>
    </div>
  );
}
