import Image from "next/image";
import Link from "next/link";
import { Chevron } from "@/components/brand";
import type { Photo } from "@/lib/images";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  photo?: Photo;
};

export function ServiceCard({ title, description, href, photo }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[44px] flex-col border border-border bg-white transition hover:border-navy"
    >
      {photo ? (
        <div className="chevron-r relative aspect-[16/9] overflow-hidden" style={{ ["--tip" as string]: "9%" }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col border-l-4 border-navy p-6">
        <h3 className="text-lg font-bold break-words text-navy">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/80">{description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-burgundy">
          Learn more
          <Chevron className="h-2.5 w-auto text-burgundy transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
