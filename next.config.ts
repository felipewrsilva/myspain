import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/apostilas", destination: "/guias", permanent: true },
      {
        source: "/apostilas/moradia-contratos",
        destination: "/guias/aluguel-na-pratica",
        permanent: true,
      },
      {
        source: "/apostilas/moradia-contratos/pdf",
        destination: "/guias/aluguel-na-pratica/pdf",
        permanent: true,
      },
      {
        source: "/apostilas/dinheiro-90-dias",
        destination: "/guias/planejamento-financeiro",
        permanent: true,
      },
      {
        source: "/apostilas/dinheiro-90-dias/pdf",
        destination: "/guias/planejamento-financeiro/pdf",
        permanent: true,
      },
      {
        source: "/apostilas/nie-primeiros-tramites",
        destination: "/guias/nie-primeiros-tramites",
        permanent: true,
      },
      {
        source: "/apostilas/nie-primeiros-tramites/pdf",
        destination: "/guias/nie-primeiros-tramites/pdf",
        permanent: true,
      },
      { source: "/comunidade", destination: "/fale-conosco", permanent: true },
    ];
  },
};

export default nextConfig;
