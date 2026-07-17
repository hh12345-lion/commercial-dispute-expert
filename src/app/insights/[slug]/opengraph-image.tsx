import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { getInsightBySlug, getInsightSlugs } from "@/lib/mdx";

export const alt = "Commercial Dispute Expert Insight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export default async function InsightOgImage({ params }: Props) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  const title = post?.title ?? "Commercial Dispute Expert";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #1c2b3a 0%, #1e293b 50%, #1b5e20 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#86efac", marginBottom: 16 }}>Insight</div>
        <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          {title}
        </div>
        <div style={{ fontSize: 24, marginTop: 32, color: "#cbd5e1" }}>{siteConfig.brandShort}</div>
      </div>
    ),
    { ...size },
  );
}
