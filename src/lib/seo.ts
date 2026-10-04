import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type OgImage = {
  url: string;
  alt?: string;
};

type BuildPageMetadataInput = {
  title: string;
  description: string;
  /** Caminho absoluto no site, ex.: `/anuncios/slug` ou `/`. */
  path: string;
  images?: OgImage[];
  type?: "website" | "article";
};

/**
 * Metadata de página com Open Graph e Twitter alinhados ao title/description,
 * para previews corretos ao compartilhar o link.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  images,
  type = "website",
}: BuildPageMetadataInput): Metadata {
  const ogTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const ogImages = images?.map((image) => ({
    url: image.url,
    alt: image.alt ?? title,
  }));

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "pt_BR",
      type,
      ...(ogImages?.length ? { images: ogImages } : {}),
    },
    twitter: {
      card: ogImages?.length ? "summary_large_image" : "summary",
      title: ogTitle,
      description,
      ...(ogImages?.length ? { images: ogImages.map((image) => image.url) } : {}),
    },
  };
}
