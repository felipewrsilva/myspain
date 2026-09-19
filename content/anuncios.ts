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
  "Olá, Carol! Vi o anúncio da Nómada de Mascotas na Minha Espanha. Gostaria de combinar cuidado para minha mascote em Madrid. Pode me dizer disponibilidade e valores?",
);

export const ads: Ad[] = [
  {
    slug: "nomada-de-mascotas",
    title: "Nómada de Mascotas",
    summary:
      "Pet care em Madrid e arredores: passeios, cuidado em casa e atenção individual.",
    description:
      "Sua mascote cuidada como em casa, mesmo quando você não está. Pet care com confiança, carinho e atenção personalizada.",
    body: [
      "A Nómada de Mascotas é o serviço da Carol Canguro: passeios, cuidado no ambiente do próprio animal e atenção individual. Funciona bem para quem trabalha fora, viaja ou prefere evitar creche.",
    ],
    tagline: "Confianza, cariño y atención personalizada",
    location: "Madrid e arredores",
    locationDetail: {
      label: "Madrid e arredores",
      region: "Comunidad de Madrid",
      description:
        "Atendimento na capital e regiões próximas. Confirme bairro ou município no primeiro contato: a cobertura depende de deslocamento e agenda.",
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
        detail:
          "Saídas para o pet se movimentar e manter a rotina fora de casa. Combine duração e preferências no WhatsApp.",
      },
      {
        title: "Cuidado en casa",
        subtitle: "Cuidado em casa",
        detail:
          "Acompanhamento no ambiente do próprio animal: comida, água, companhia e o que for combinado, sem tirar o pet de casa.",
      },
      {
        title: "Atención individual",
        subtitle: "Atenção individual",
        detail:
          "Cuidado personalizado, com foco no temperamento do animal, em vez de atendimento em grupo.",
      },
    ],
    audience: [
      "Quem mora em Madrid ou arredores e precisa de apoio com o pet",
      "Quem viaja ou tem rotina corrida e prefere cuidado em casa",
      "Tutores que valorizam atenção individual",
    ],
    bookingSteps: [
      "Chame no WhatsApp com zona, tipo de pet e o que precisa.",
      "Combine datas, acesso à casa, rotina e valores.",
      "Se for viagem mais longa, combine uma conversa prévia.",
    ],
    prepareChecklist: [
      "Rotina do pet: comida, passeio, medicação e restrições",
      "Contato do veterinário e de uma emergência",
      "Acesso à casa (chave, código, alarme)",
      "O que fazer se o pet precisar de atendimento veterinário",
    ],
    questionsToAsk: [
      "Você atende minha zona nesta data?",
      "Qual o valor e o que está incluso?",
      "O passeio é individual? Qual a duração?",
      "Podemos fazer uma apresentação antes da primeira reserva?",
    ],
    faqs: [
      {
        question: "O pet precisa ir para a casa da cuidadora?",
        answer:
          "Em geral, não: o foco é cuidado em casa. Se fizer mais sentido outro formato para o seu pet, combine direto com a Carol.",
      },
      {
        question: "Serve para gatos também?",
        answer:
          "Sim, cães e gatos. Conta a rotina e o temperamento no WhatsApp para ela montar o cuidado certo.",
      },
      {
        question: "A Minha Espanha intermedia o pagamento?",
        answer:
          "Não. Valor, horários e detalhes você fecha direto com a Carol, do jeito que funcionar para os dois.",
      },
    ],
    price: null,
    priceNote: "Valores sob consulta no WhatsApp.",
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
