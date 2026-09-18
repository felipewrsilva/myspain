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
  /** Texto do botão. Se omitido, usa o padrão do tipo de contato. */
  ctaLabel?: string;
};

export type AdService = {
  title: string;
  detail: string;
};

export type Ad = {
  slug: string;
  title: string;
  /** Texto curto para cards e meta description. */
  summary: string;
  /** Lead da página de detalhe. */
  description: string;
  /** Parágrafos adicionais do detalhe. */
  body?: string[];
  tagline?: string;
  location: string;
  /** Rótulo legível (ex.: Serviços). Útil para filtros futuros. */
  category: string;
  /** Id estável da categoria (ex.: servicos). */
  categoryId: string;
  /** Lista curta para cards. */
  features: string[];
  /** Serviços com detalhe na página do anúncio. */
  services?: AdService[];
  /** Pontos de valor / diferenciais. */
  highlights?: string[];
  /** Para quem faz sentido. */
  audience?: string[];
  /** Passos para falar com o anunciante. */
  bookingSteps?: string[];
  price?: string | null;
  image: string;
  imageAlt: string;
  provider?: string;
  contacts: AdContact[];
  /** ISO date (YYYY-MM-DD). Ordenação e destaques futuros. */
  publishedAt: string;
  featured?: boolean;
};

const nomadaWhatsAppMessage = encodeURIComponent(
  "Olá! Vi o anúncio da Nómada de Mascotas na Minha Espanha e gostaria de saber mais sobre o cuidado da minha mascote.",
);

export const ads: Ad[] = [
  {
    slug: "nomada-de-mascotas",
    title: "Nómada de Mascotas",
    summary:
      "Pet care em Madrid e arredores: passeios, cuidado em casa e atenção individual, com reserva pelo WhatsApp.",
    description:
      "Sua mascote cuidada como em casa, mesmo quando você não está. A Nómada de Mascotas oferece pet care com confiança, carinho e atenção personalizada em Madrid e arredores.",
    body: [
      "O serviço é pensado para quem precisa de apoio no dia a dia ou em períodos fora de casa: o animal permanece no próprio ambiente, com acompanhamento individual e contato direto com a cuidadora.",
      "A reserva é feita pelo WhatsApp. No Instagram você também encontra o perfil da Carol para conhecer melhor o trabalho.",
    ],
    tagline: "Confianza, cariño y atención personalizada",
    location: "Madrid e arredores",
    category: "Serviços",
    categoryId: "servicos",
    features: ["Passeios", "Cuidado em casa", "Atenção individual"],
    services: [
      {
        title: "Paseos (passeios)",
        detail:
          "Saídas para o pet se movimentar, respirar e manter a rotina fora de casa, com atenção dedicada durante o passeio.",
      },
      {
        title: "Cuidado en casa (cuidado em casa)",
        detail:
          "Acompanhamento no ambiente do próprio animal, para que ele continue no lugar onde já se sente seguro.",
      },
      {
        title: "Atención individual (atenção individual)",
        detail:
          "Cuidado personalizado, com foco em confiança e carinho, em vez de atendimento em grupo.",
      },
    ],
    highlights: [
      "Atendimento em Madrid e arredores",
      "Ênfase em confiança, carinho e atenção personalizada",
      "Cuidado pensado para a mascote se sentir em casa",
      "Contato direto com a cuidadora, sem intermediário da Minha Espanha",
    ],
    audience: [
      "Quem mora em Madrid ou arredores e precisa de apoio com o pet",
      "Quem viaja, trabalha fora ou tem uma rotina corrida e quer deixar a mascote bem cuidada",
      "Quem prefere cuidado em casa e atenção individual",
    ],
    bookingSteps: [
      "Chame no WhatsApp e diga o tipo de cuidado que precisa (passeio, cuidado em casa ou ambos).",
      "Combine localização, horários e detalhes da sua mascote diretamente com a Carol.",
      "Confirme disponibilidade e condições antes de reservar.",
    ],
    price: null,
    image: "/anuncios/nomada-de-mascotas.jpg",
    imageAlt: "Golden retriever e gato tabby juntos em uma sala iluminada",
    provider: "Carol Canguro | Pet Care",
    contacts: [
      {
        type: "whatsapp",
        label: "WhatsApp",
        value: "619 44 10 40",
        href: `https://wa.me/34619441040?text=${nomadaWhatsAppMessage}`,
        ctaLabel: "Reservar no WhatsApp",
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
