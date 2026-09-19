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
  subtitle?: string;
  detail: string;
  points?: string[];
};

export type AdFaq = {
  question: string;
  answer: string;
};

export type AdLocation = {
  label: string;
  region: string;
  description: string;
  image: string;
  imageAlt: string;
  mapHref: string;
  mapLabel: string;
  notes?: string[];
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
  locationDetail?: AdLocation;
  /** Rótulo legível (ex.: Serviços). Útil para filtros futuros. */
  category: string;
  /** Id estável da categoria (ex.: servicos). */
  categoryId: string;
  subcategory?: string;
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
  /** Checklist do tutor antes de reservar. */
  prepareChecklist?: string[];
  /** Perguntas úteis para fazer ao anunciante. */
  questionsToAsk?: string[];
  faqs?: AdFaq[];
  price?: string | null;
  priceNote?: string;
  image: string;
  imageAlt: string;
  provider?: string;
  providerRole?: string;
  contacts: AdContact[];
  /** ISO date (YYYY-MM-DD). Ordenação e destaques futuros. */
  publishedAt: string;
  featured?: boolean;
};

const nomadaWhatsAppMessage = encodeURIComponent(
  "Olá, Carol! Vi o anúncio da Nómada de Mascotas na Minha Espanha. Queria combinar o cuidado da minha mascote em Madrid. Pode me dizer disponibilidade e valores?",
);

export const ads: Ad[] = [
  {
    slug: "nomada-de-mascotas",
    title: "Nómada de Mascotas",
    summary:
      "Pet care em Madrid e arredores. Passeios, cuidado em casa e atenção individual, a combinar.",
    description:
      "Sua mascote bem cuidada, mesmo quando você não está. Confiança, carinho e atenção personalizada, com o formato combinado no WhatsApp.",
    body: [
      "A Nómada de Mascotas é o pet care da Carol Canguro em Madrid e arredores. Os serviços partem de passeios, cuidado em casa e atenção individual. O restante se adapta ao que você e o pet precisam.",
    ],
    tagline: "Confianza, cariño y atención personalizada",
    location: "Madrid e arredores",
    locationDetail: {
      label: "Madrid e arredores",
      region: "Comunidad de Madrid",
      description:
        "Atende Madrid e regiões próximas. No primeiro contato, diga seu bairro ou município para confirmar cobertura, deslocamento e agenda.",
      image: "/anuncios/madrid-gran-via.jpg",
      imageAlt: "Gran Vía e Edificio Metrópolis em Madrid",
      mapHref: "https://maps.google.com/?q=Madrid,+Spain",
      mapLabel: "Ver Madrid no mapa",
    },
    category: "Serviços",
    categoryId: "servicos",
    subcategory: "Pet care",
    features: ["Passeios", "Cuidado em casa", "Atenção individual"],
    services: [
      {
        title: "Paseos",
        subtitle: "Passeios",
        detail: "Passeios sob medida. Duração, frequência e rotina a combinar.",
      },
      {
        title: "Cuidado en casa",
        subtitle: "Cuidado em casa",
        detail:
          "Apoio no dia a dia do pet. Ambiente, horários e cuidados específicos a combinar.",
      },
      {
        title: "Atención individual",
        subtitle: "Atenção individual",
        detail:
          "Atenção dedicada ao temperamento e às necessidades do animal. Detalhes a combinar.",
      },
    ],
    audience: [
      "Quem precisa de apoio com o pet em Madrid ou arredores",
      "Quem viaja ou tem rotina corrida",
      "Quem quer combinar o cuidado conforme o pet",
    ],
    bookingSteps: [
      "Chame no WhatsApp com zona, tipo de pet e o que precisa.",
      "Combinem formato, datas, rotina e valores.",
      "Se quiser, façam uma conversa prévia antes de começar.",
    ],
    prepareChecklist: [
      "Rotina do pet: comida, passeios, medicação e restrições",
      "Contato do veterinário e de uma emergência",
      "Acesso e orientações práticas, se forem necessários",
      "O que fazer se o pet precisar de atendimento veterinário",
    ],
    questionsToAsk: [
      "Você atende minha zona nesta data?",
      "Qual o valor e o que está incluso?",
      "Como fica o cuidado no meu caso?",
      "Podemos conversar antes da primeira vez?",
    ],
    faqs: [
      {
        question: "O pet precisa ir para a casa da cuidadora?",
        answer:
          "Depende do que funcionar melhor para você e para o pet. Combine o formato no WhatsApp.",
      },
      {
        question: "Serve para gatos também?",
        answer:
          "Sim. Conta a rotina e o temperamento no WhatsApp para combinar o cuidado.",
      },
      {
        question: "A Minha Espanha intermedia o pagamento?",
        answer:
          "Não. Valor, horários e detalhes você fecha direto com a Carol no WhatsApp.",
      },
    ],
    price: null,
    priceNote: "Valores a combinar no WhatsApp.",
    image: "/anuncios/nomada-de-mascotas.jpg",
    imageAlt: "Golden retriever e gato tabby juntos em uma sala iluminada",
    provider: "Carol Canguro",
    providerRole: "Pet Care",
    contacts: [
      {
        type: "whatsapp",
        label: "WhatsApp",
        value: "619 44 10 40",
        href: `https://wa.me/34619441040?text=${nomadaWhatsAppMessage}`,
        ctaLabel: "Falar no WhatsApp",
      },
      {
        type: "instagram",
        label: "Instagram",
        value: "@carol_sarmentosilva",
        href: "https://www.instagram.com/carol_sarmentosilva/",
      },
    ],
    publishedAt: "2026-09-19",
    featured: true,
  },
];
