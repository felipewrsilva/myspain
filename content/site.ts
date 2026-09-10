export const siteConfig = {
  name: "Minha Espanha",
  domain: "minhaespanha.com.br",
  description:
    "Guia prático para brasileiros que querem ir ou já estão na Espanha: etapas, checklists, apostilas, mapa e ferramentas.",
  url: "https://minhaespanha.com.br",
  whatsapp: {
    principal: {
      label: "Grupo principal",
      href: "https://chat.whatsapp.com/Fvt3hT3pHo75s43ujI4bUQ",
      description: "Canal principal da comunidade Minha Espanha.",
    },
    comunidade: {
      label: "Comunidade",
      href: "https://chat.whatsapp.com/BaAoOrCt4FTGhiXiiZxNSu",
      description: "Espaço para tirar dúvidas e trocar experiências do dia a dia.",
    },
  },
  nav: [
    { href: "/etapas/antes-de-ir", label: "Etapas" },
    { href: "/guias", label: "Guias" },
    { href: "/checklists", label: "Checklists" },
    { href: "/apostilas", label: "Apostilas" },
    { href: "/mapa", label: "Mapa" },
    { href: "/ferramentas", label: "Ferramentas" },
    { href: "/comunidade", label: "Comunidade" },
  ],
} as const;
