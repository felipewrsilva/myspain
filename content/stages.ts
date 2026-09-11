export type StageId = "antes-de-ir" | "acabei-de-chegar" | "ja-moro";

export const stages: {
  id: StageId;
  title: string;
  shortTitle: string;
  description: string;
  bullets: string[];
  href: string;
}[] = [
  {
    id: "antes-de-ir",
    title: "Antes de ir",
    shortTitle: "Antes",
    description:
      "Documentos, dinheiro, visto e o que organizar no Brasil para chegar com o pé no chão.",
    bullets: ["Documentos", "Dinheiro e visto", "O que resolver no Brasil"],
    href: "/etapas/antes-de-ir",
  },
  {
    id: "acabei-de-chegar",
    title: "Acabei de chegar",
    shortTitle: "Chegada",
    description:
      "Número de estrangeiro (NIE), cadastro na prefeitura, banco, moradia e saúde nos primeiros dias no país.",
    bullets: ["NIE", "Cadastro na prefeitura", "Banco e moradia"],
    href: "/etapas/acabei-de-chegar",
  },
  {
    id: "ja-moro",
    title: "Já moro",
    shortTitle: "Vida",
    description:
      "Trabalho, impostos, idioma e a rotina de quem já está estabelecido.",
    bullets: ["Trabalho", "Impostos", "Idioma e rotina"],
    href: "/etapas/ja-moro",
  },
];

export function getStage(id: string) {
  return stages.find((stage) => stage.id === id);
}
