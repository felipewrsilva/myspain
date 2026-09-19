import { ads, type Ad } from "../../content/anuncios";

export type {
  Ad,
  AdContact,
  AdContactType,
  AdFaq,
  AdLocation,
  AdService,
} from "../../content/anuncios";

/**
 * Lista anúncios publicados.
 * Hoje lê o array estático; depois pode apontar para API/CMS sem mudar as páginas.
 */
export function getAds(): Ad[] {
  return [...ads].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return a.featured ? -1 : 1;
    }
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

export function getAd(slug: string): Ad | undefined {
  return getAds().find((ad) => ad.slug === slug);
}
