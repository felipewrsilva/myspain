export const siteConfig = {
  name: "Minha Espanha",
  domain: "minhaespanha.com.br",
  description:
    "Guias práticos para brasileiros que querem ir ou já estão na Espanha: etapas, checklist embutido e PDF para levar.",
  url: "https://minhaespanha.com.br",
  whatsapp: {
    grupo: {
      label: "Entrar no grupo",
      href:
        process.env.NEXT_PUBLIC_WHATSAPP_GRUPO_URL ??
        "https://chat.whatsapp.com/GiWX4kudkrjE2TWtRI3ML1",
      description: "Grupo oficial da Minha Espanha no WhatsApp.",
    },
  },
  /** Contato do projeto (página Fale Conosco). */
  contact: {
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contact@felipewrsilva.dev",
  },
  nav: [
    { href: "/etapas/antes-de-ir", label: "Etapas" },
    { href: "/guias", label: "Guias" },
    { href: "/anuncios", label: "Anúncios" },
    { href: "/fale-conosco", label: "Fale Conosco" },
  ],
} as const;
