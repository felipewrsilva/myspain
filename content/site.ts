export const siteConfig = {
  name: "Minha Espanha",
  domain: "minhaespanha.com.br",
  description:
    "Guias práticos para brasileiros que querem ir ou já estão na Espanha: etapas, checklists e PDF para levar.",
  url: "https://minhaespanha.com.br",
  whatsapp: {
    principal: {
      label: "Grupo principal",
      href:
        process.env.NEXT_PUBLIC_WHATSAPP_GRUPO_URL ??
        "https://chat.whatsapp.com/GiWX4kudkrjE2TWtRI3ML1",
      description: "Canal principal da comunidade Minha Espanha.",
    },
    comunidade: {
      label: "Grupo de dúvidas",
      href:
        process.env.NEXT_PUBLIC_WHATSAPP_COMUNIDADE_URL ??
        "https://chat.whatsapp.com/Ey7G8RgFhwf41gVzhlodu7",
      description: "Espaço para tirar dúvidas e trocar experiências do dia a dia.",
    },
  },
  nav: [
    { href: "/etapas/antes-de-ir", label: "Etapas" },
    { href: "/guias", label: "Guias" },
    { href: "/checklists", label: "Checklists" },
    { href: "/anuncios", label: "Anúncios" },
    { href: "/comunidade", label: "Comunidade" },
  ],
} as const;
