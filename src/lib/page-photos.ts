import { photos, type Photo } from "@/lib/images";

/** One photograph per service page, keyed by the last part of its path. */
const SERVICE_PHOTOS: Record<string, Photo> = {
  "commercial-dispute-expert-witness": photos.courtroom,
  "litigation-support": photos.courthouseColumns,
  "loss-of-profits-quantum": photos.stockExchange,
  "breach-of-contract-damages": photos.contractPen,
  "shareholder-partnership-disputes": photos.chicagoTowers,
  "business-valuation": photos.wallStreet,
  "business-interruption": photos.floodedMall,
  "professional-negligence": photos.courthouseTower,
  "expert-reports-testimony": photos.counselTables,
  "arbitration-mediation": photos.courtroomMural,
};

/** One photograph per case type. */
const CASE_TYPE_PHOTOS: Record<string, Photo> = {
  "breach-of-contract": photos.containerPort,
  "shareholder-partnership": photos.chicagoTowers,
  "professional-negligence": photos.courthouseTower,
  "business-interruption": photos.floodedMall,
  "fraud-asset-tracing": photos.wallStreet,
  "international-arbitration": photos.courtroomMural,
};

export function servicePhoto(hrefOrSlug: string): Photo {
  const slug = hrefOrSlug.split("/").filter(Boolean).pop() ?? "";
  return SERVICE_PHOTOS[slug] ?? photos.courtroom;
}

export function caseTypePhoto(slug: string): Photo {
  return CASE_TYPE_PHOTOS[slug] ?? photos.contractPen;
}

/** A stable topical photograph for an article that has none of its own. */
export function fallbackPhoto(seed: string): Photo {
  const pool = [photos.stockExchange, photos.courtroom, photos.contractPen, photos.counselTables, photos.chicagoTowers, photos.wallStreet];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}
