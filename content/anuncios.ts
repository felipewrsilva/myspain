/**
 * Anúncios estáticos da comunidade.
 * Fonte única de dados por enquanto. No futuro, troque `ads` por uma API/CMS
 * mantendo o tipo `Ad` e os getters em `src/lib/anuncios.ts`.
 */

export type AdContactType = "whatsapp" | "instagram" | "email" | "phone" | "url";

export type AdContact = {
  type: AdContactType;
  label: string;
  /** Valor exibido (telefone, @handle, e-mail, etc.). */
  value: string;
  href: string;
};

export type Ad = {
  slug: string;
  title: string;
  /** Texto curto para cards e meta description. */
  summary: string;
  /** Texto completo da página de detalhe. */
  description: string;
  tagline?: string;
  location: string;
  /** Rótulo legível (ex.: Serviços). Útil para filtros futuros. */
  category: string;
  /** Id estável da categoria (ex.: servicos). */
  categoryId: string;
  features: string[];
  price?: string | null;
  image: string;
  imageAlt: string;
  provider?: string;
  contacts: AdContact[];
  /** ISO date (YYYY-MM-DD). Ordenação e destaques futuros. */
  publishedAt: string;
  featured?: boolean;
};

export const ads: Ad[] = [
  {
    slug: "nomada-de-mascotas",
    title: "Nómada de Mascotas",
    summary:
      "Cuidado de pets em Madrid e arredores: passeios, cuidado em casa e atenção individual.",
    description:
      "Tu mascota cuidada como en casa, incluso cuando tú no estás. Serviço de pet care com atenção personalizada para quem precisa deixar a mascote bem cuidada em Madrid e arredores.",
    tagline: "Confianza, cariño y atención personalizada",
    location: "Madrid e arredores",
    category: "Serviços",
    categoryId: "servicos",
    features: ["Paseos (passeios)", "Cuidado en casa", "Atención individual"],
    price: null,
    image: "/anuncios/nomada-de-mascotas.jpg",
    imageAlt: "Golden retriever e gato tabby juntos em uma sala iluminada",
    provider: "Carol Canguro | Pet Care",
    contacts: [
      {
        type: "whatsapp",
        label: "WhatsApp",
        value: "619 44 10 40",
        href: "https://wa.me/34619441040",
      },
      {
        type: "instagram",
        label: "Instagram",
        value: "@carol_sarmentosilva",
        href: "https://www.instagram.com/carol_sarmentosilva/",
      },
    ],
    publishedAt: "2026-03-19",
    featured: true,
  },
];
