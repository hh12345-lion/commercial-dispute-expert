import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/og-brand-mark";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(<BrandMark size={512} />, {
    width: 512,
    height: 512,
  });
}
