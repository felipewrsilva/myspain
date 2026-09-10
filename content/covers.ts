export type Cover = {
  src: string;
  alt: string;
};

function unsplash(photoId: string, width = 1600) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Capas por slug (guia, checklist, apostila) e por etapa. */
export const covers: Record<string, Cover> = {
  "antes-de-ir": {
    src: unsplash("photo-1436491865332-7a61a109cc05"),
    alt: "Asa de avião sobre as nuvens, no caminho para a Espanha",
  },
  "acabei-de-chegar": {
    src: unsplash("photo-1539037116277-4db20889f2d4"),
    alt: "Gran Vía de Madrid ao entardecer",
  },
  "ja-moro": {
    src: unsplash("photo-1555881400-74d7acaacd8b"),
    alt: "Plaza de España em Sevilha, rotina de quem já mora no país",
  },

  "visto-e-residencia": {
    src: unsplash("photo-1436491865332-7a61a109cc05"),
    alt: "Viagem de avião: o visto certo se decide antes de embarcar",
  },
  "documentos-essenciais": {
    src: unsplash("photo-1586281380349-632531db7ed4"),
    alt: "Mesa com papéis, caderno e laptop para organizar a pasta de documentos",
  },
  "escolher-cidade": {
    src: unsplash("photo-1583422409516-2895a77efded"),
    alt: "Sagrada Família em Barcelona, uma das cidades mais buscadas por quem se muda",
  },
  "planejamento-financeiro": {
    src: unsplash("photo-1579621970795-87facc2f976d"),
    alt: "Moedas e reserva em espécie para planejar os primeiros meses",
  },
  "seguro-saude-viagem": {
    src: unsplash("photo-1488646953014-85cb44e25828"),
    alt: "Mapa e acessórios de viagem sobre a mesa antes do embarque",
  },
  "primeiros-30-dias": {
    src: unsplash("photo-1539037116277-4db20889f2d4"),
    alt: "Rua central de Madrid, cenário típico da primeira semana",
  },
  "aluguel-na-pratica": {
    src: unsplash("photo-1522708323590-d24dbb6b0267"),
    alt: "Sala de um apartamento claro, do tipo que se visita no Idealista",
  },
  "chip-e-transporte": {
    src: unsplash("photo-1469854523086-cc02fe5d8800"),
    alt: "Estrada e viagem pela Espanha, deslocamento do dia a dia",
  },
  "saude-primeiros-meses": {
    src: unsplash("photo-1576091160399-112ba8d25d1d"),
    alt: "Consulta médica com computador, ponte entre seguro e saúde pública",
  },
  "trabalho-e-contrato": {
    src: unsplash("photo-1497366216548-37526070297c"),
    alt: "Escritório contemporâneo, ambiente de contrato por conta alheia",
  },
  "impostos-organizacao": {
    src: unsplash("photo-1554224155-6726b3ff858f"),
    alt: "Calculadora e documentos fiscais sobre a mesa",
  },
  "aprender-espanhol": {
    src: unsplash("photo-1543269865-cbf427effbad"),
    alt: "Pessoas estudando juntas, prática de idioma no dia a dia",
  },
  "vida-estabelecida": {
    src: unsplash("photo-1414235077428-338989a2e8c0"),
    alt: "Mesa de restaurante na Espanha, rotina de quem já está estabelecido",
  },

  "antes-de-viajar": {
    src: unsplash("photo-1488646953014-85cb44e25828"),
    alt: "Planejamento de viagem com mapa e passagens",
  },
  nie: {
    src: unsplash("photo-1450101499163-c8848c66ca85"),
    alt: "Assinatura de documentos oficiais, como o expediente do NIE",
  },
  empadronamiento: {
    src: unsplash("photo-1555881400-74d7acaacd8b"),
    alt: "Prédio histórico espanhol, tipo de ayuntamiento onde se faz o padrón",
  },
  "conta-bancaria": {
    src: unsplash("photo-1579621970795-87facc2f976d"),
    alt: "Dinheiro e planejamento para abrir conta em euro",
  },
  aluguel: {
    src: unsplash("photo-1502672260266-1c1ef2d93688"),
    alt: "Interior de apartamento para alugar",
  },
  "primeira-semana": {
    src: unsplash("photo-1523531294919-4bcd7c65e216"),
    alt: "Parque e cidade espanhola na primeira semana após a chegada",
  },
  "tie-residencia": {
    src: unsplash("photo-1450101499163-c8848c66ca85"),
    alt: "Documentos oficiais sobre a mesa, trâmite da TIE",
  },
  "autonomo-inicio": {
    src: unsplash("photo-1517048676732-d65bc937f952"),
    alt: "Reunião de trabalho, início como autónomo",
  },

  "nie-primeiros-tramites": {
    src: unsplash("photo-1450101499163-c8848c66ca85"),
    alt: "Papelada de trâmites, NIE e primeiros formulários",
  },
  "moradia-contratos": {
    src: unsplash("photo-1522708323590-d24dbb6b0267"),
    alt: "Apartamento mobilado, foco de contratos de aluguel",
  },
  "dinheiro-90-dias": {
    src: unsplash("photo-1553729459-efe14ef6055d"),
    alt: "Notas e planejamento financeiro dos primeiros 90 dias",
  },
};

export function getCover(slug: string): Cover | undefined {
  return covers[slug];
}
