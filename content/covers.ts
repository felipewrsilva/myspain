export type Cover = {
  src: string;
  alt: string;
};

/** Caminho local em public/images/unsplash/. */
function localImage(photoId: string) {
  return `/images/unsplash/${photoId}.jpg`;
}

/** Capas por slug (guia, checklist e etapa). Cada foto é única no site. */
export const covers: Record<string, Cover> = {
  "antes-de-ir": {
    src: localImage("photo-1436491865332-7a61a109cc05"),
    alt: "Asa de avião sobre as nuvens, no caminho para a Espanha",
  },
  "acabei-de-chegar": {
    src: localImage("photo-1746019418576-1141de76d46b"),
    alt: "Palácio Real de Madrid, o tipo de marco que se vê nos primeiros dias",
  },
  "ja-moro": {
    src: localImage("photo-1759431771046-5ee79ecfbabf"),
    alt: "Alhambra em Granada, o tipo de rotina visual de quem já mora na Espanha",
  },

  "visto-e-residencia": {
    src: localImage("photo-1488085061387-422e29b40080"),
    alt: "Janela de avião no pôr do sol: o visto certo se decide antes de embarcar",
  },
  "documentos-essenciais": {
    src: localImage("photo-1586281380349-632531db7ed4"),
    alt: "Mesa com papéis, caderno e laptop para organizar a pasta de documentos",
  },
  "escolher-cidade": {
    src: localImage("photo-1583422409516-2895a77efded"),
    alt: "Sagrada Família em Barcelona, uma das cidades mais buscadas por quem se muda",
  },
  "planejamento-financeiro": {
    src: localImage("photo-1579621970795-87facc2f976d"),
    alt: "Moedas e reserva em espécie para planejar os primeiros meses",
  },
  "seguro-saude-viagem": {
    src: localImage("photo-1488646953014-85cb44e25828"),
    alt: "Mapa e acessórios de viagem sobre a mesa antes do embarque",
  },
  "primeiros-30-dias": {
    src: localImage("photo-1770850186337-d6fdf280d06d"),
    alt: "Barcelona vista da montanha, o tipo de panorama da primeira exploração",
  },
  "aluguel-na-pratica": {
    src: localImage("photo-1522708323590-d24dbb6b0267"),
    alt: "Sala de um apartamento claro, do tipo que se visita no Idealista",
  },
  "chip-e-transporte": {
    src: localImage("photo-1758471206484-0eaa2568320c"),
    alt: "Barcelona ao entardecer, o deslocamento urbano do dia a dia",
  },
  "saude-primeiros-meses": {
    src: localImage("photo-1576091160399-112ba8d25d1d"),
    alt: "Consulta médica com computador, ponte entre seguro e saúde pública",
  },
  "trabalho-e-contrato": {
    src: localImage("photo-1497366216548-37526070297c"),
    alt: "Escritório contemporâneo, ambiente de contrato por conta alheia",
  },
  "impostos-organizacao": {
    src: localImage("photo-1554224155-6726b3ff858f"),
    alt: "Calculadora e documentos fiscais sobre a mesa",
  },
  "aprender-espanhol": {
    src: localImage("photo-1543269865-cbf427effbad"),
    alt: "Pessoas estudando juntas, prática de idioma no dia a dia",
  },
  "vida-estabelecida": {
    src: localImage("photo-1414235077428-338989a2e8c0"),
    alt: "Mesa de restaurante na Espanha, rotina de quem já está estabelecido",
  },

  "antes-de-viajar": {
    src: localImage("photo-1557183200-f0fec6612738"),
    alt: "Mala aberta com o que levar: o checklist antes do voo",
  },
  nie: {
    src: localImage("photo-1450101499163-c8848c66ca85"),
    alt: "Assinatura de documentos oficiais, como o pedido do número de estrangeiro (NIE)",
  },
  empadronamiento: {
    src: localImage("photo-1666861522686-02b2169e0a76"),
    alt: "Edifício da prefeitura em Valência, onde se faz o cadastro de morador",
  },
  "conta-bancaria": {
    src: localImage("photo-1563013544-824ae1b704d3"),
    alt: "Cartão e laptop para abrir e usar a conta em euro",
  },
  aluguel: {
    src: localImage("photo-1502672260266-1c1ef2d93688"),
    alt: "Interior de apartamento para alugar",
  },
  "primeira-semana": {
    src: localImage("photo-1523531294919-4bcd7c65e216"),
    alt: "Park Güell em Barcelona, exploração da primeira semana",
  },
  "tie-residencia": {
    src: localImage("photo-1521791136064-7986c2920216"),
    alt: "Aperto de mãos após um trâmite oficial, como o cartão de residência (TIE)",
  },
  "autonomo-inicio": {
    src: localImage("photo-1517048676732-d65bc937f952"),
    alt: "Reunião de trabalho, início como autónomo (trabalho por conta própria)",
  },

  "nie-primeiros-tramites": {
    src: localImage("photo-1589829545856-d10d557cf95f"),
    alt: "Balança da justiça, o peso dos primeiros trâmites oficiais",
  },
};

const coverSources = Object.values(covers).map((cover) => cover.src);
if (new Set(coverSources).size !== coverSources.length) {
  throw new Error("Duplicate cover image in content/covers.ts");
}

export function getCover(slug: string): Cover | undefined {
  return covers[slug];
}
