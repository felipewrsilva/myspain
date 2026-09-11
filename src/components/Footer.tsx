import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-[var(--ink)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight">
            <LogoMark className="size-10 text-[1.75rem]" />
            <span>
              Minha <span className="text-[var(--accent)]">Espanha</span>
            </span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            Guias práticos para brasileiros que vão ou já moram na Espanha. O conteúdo é público, sem cadastro.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Navegar</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">WhatsApp</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>
              <a href={siteConfig.whatsapp.principal.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {siteConfig.whatsapp.principal.label}
              </a>
            </li>
            <li>
              <a href={siteConfig.whatsapp.comunidade.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {siteConfig.whatsapp.comunidade.label}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.domain}
      </div>
    </footer>
  );
}
