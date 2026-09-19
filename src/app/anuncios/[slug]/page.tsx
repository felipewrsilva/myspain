import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdContactLinks, AdLocationPanel } from "@/components/AdContactLinks";
import { Callout } from "@/components/Callout";
import { CardBullets } from "@/components/ContentCard";
import { getAd, getAds } from "@/lib/anuncios";

export function generateStaticParams() {
  return getAds().map((ad) => ({ slug: ad.slug }));
}

export async function generateMetadata({ params }: PageProps<"/anuncios/[slug]">) {
  const { slug } = await params;
  const ad = getAd(slug);
  if (!ad) return {};
  return {
    title: ad.title,
    description: ad.summary,
    openGraph: {
      images: [{ url: ad.image, alt: ad.imageAlt }],
    },
  };
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">{eyebrow}</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--ink)]">
        {title}
      </h2>
      {description ? <p className="mt-3 text-[var(--ink-muted)]">{description}</p> : null}
    </div>
  );
}

export default async function AnuncioPage({ params }: PageProps<"/anuncios/[slug]">) {
  const { slug } = await params;
  const ad = getAd(slug);
  if (!ad) notFound();

  const serviceItems = ad.services ?? [];
  const hasServices = serviceItems.length > 0;
  const hasFeatureFallback = !hasServices && ad.features.length > 0;

  return (
    <article>
      <section className="relative isolate overflow-hidden bg-[var(--ink)] text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={ad.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,24,31,0.94)] via-[rgba(20,24,31,0.78)] to-[rgba(20,24,31,0.45)]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <Link
            href="/anuncios"
            className="inline-flex text-sm font-semibold text-white/70 transition hover:text-white"
          >
            ← Voltar aos anúncios
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white/50">
                {ad.subcategory ?? ad.category}
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold text-balance sm:text-5xl lg:text-6xl">
                {ad.title}
              </h1>
              {ad.tagline ? (
                <p className="mt-4 max-w-xl text-lg font-medium text-white/85">{ad.tagline}</p>
              ) : null}
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-white/65 sm:text-lg">
                {ad.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex min-h-10 items-center rounded-full bg-white/10 px-3.5 text-white/90 ring-1 ring-white/15">
                  {ad.location}
                </span>
                <span className="inline-flex min-h-10 items-center rounded-full bg-white/10 px-3.5 text-white/90 ring-1 ring-white/15">
                  {ad.category}
                </span>
                {ad.provider ? (
                  <span className="inline-flex min-h-10 items-center rounded-full bg-white/10 px-3.5 text-white/90 ring-1 ring-white/15">
                    {ad.provider}
                    {ad.providerRole ? ` · ${ad.providerRole}` : ""}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/15 bg-white/8 p-6 backdrop-blur-md sm:p-7">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/45">Contato rápido</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold">
                {ad.provider ?? "Falar com o anunciante"}
              </p>
              {ad.providerRole ? <p className="mt-1 text-sm text-white/60">{ad.providerRole}</p> : null}
              {ad.priceNote ? <p className="mt-3 text-sm text-white/65">{ad.priceNote}</p> : null}
              <ul className="mt-4 space-y-1.5 text-sm text-white/70">
                {ad.contacts.map((contact) => (
                  <li key={`${contact.type}-${contact.value}`}>
                    <span className="text-white/90">{contact.label}:</span> {contact.value}
                  </li>
                ))}
              </ul>
              <AdContactLinks contacts={ad.contacts} stacked className="mt-6 [&_a]:w-full" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <div className="space-y-12">
            {ad.body?.length ? (
              <section>
                <SectionHeading eyebrow="Sobre" title="O serviço em detalhe" />
                <div className="mt-6 space-y-4 text-base leading-relaxed text-pretty text-[var(--ink-muted)]">
                  {ad.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ) : null}

            {ad.locationDetail ? <AdLocationPanel location={ad.locationDetail} /> : null}

            {hasServices ? (
              <section>
                <SectionHeading eyebrow="Serviços" title="O que você pode combinar" />
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {serviceItems.map((service, index) => (
                    <div
                      key={service.title}
                      className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent-2)]"
                    >
                      <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[color-mix(in_oklab,var(--accent)_18%,white)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)]">
                        {service.title}
                      </h3>
                      {service.subtitle ? (
                        <p className="mt-1 text-sm font-medium text-[var(--accent-2)]">{service.subtitle}</p>
                      ) : null}
                      <p className="mt-3 text-sm leading-relaxed text-pretty text-[var(--ink-muted)]">
                        {service.detail}
                      </p>
                      {service.points?.length ? (
                        <CardBullets items={service.points} className="mt-4" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {hasFeatureFallback ? (
              <section>
                <SectionHeading eyebrow="Serviços" title="O que inclui" />
                <CardBullets items={ad.features} className="mt-6 text-base" />
              </section>
            ) : null}

            {ad.highlights?.length ? (
              <section className="rounded-[1.75rem] bg-[var(--ink)] p-6 text-white sm:p-8">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white/45">Destaques</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold">
                  Por que este anúncio se destaca
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {ad.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {ad.audience?.length ? (
              <section>
                <SectionHeading eyebrow="Perfil" title="Para quem faz mais sentido" />
                <CardBullets items={ad.audience} className="mt-6 text-base" />
              </section>
            ) : null}

            {ad.bookingSteps?.length ? (
              <section>
                <SectionHeading eyebrow="Reserva" title="Como combinar" />
                <ol className="mt-8 grid gap-4 sm:grid-cols-3">
                  {ad.bookingSteps.map((step, index) => (
                    <li
                      key={step}
                      className="rounded-2xl border border-[var(--line)] bg-white p-5"
                    >
                      <span className="inline-flex size-8 items-center justify-center rounded-full bg-[var(--paper-2)] text-sm font-bold text-[var(--ink)]">
                        {index + 1}
                      </span>
                      <p className="mt-3 text-sm leading-relaxed text-pretty text-[var(--ink-muted)]">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {(ad.prepareChecklist?.length || ad.questionsToAsk?.length) && (
              <section className="grid gap-4 md:grid-cols-2">
                {ad.prepareChecklist?.length ? (
                  <div className="rounded-2xl border border-[var(--line)] bg-white p-6 sm:p-7">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">
                      Prepare-se
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
                      Checklist do tutor
                    </h2>
                    <CardBullets items={ad.prepareChecklist} className="mt-5" />
                  </div>
                ) : null}

                {ad.questionsToAsk?.length ? (
                  <div className="rounded-2xl border border-[var(--line)] bg-white p-6 sm:p-7">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                      Antes de fechar
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
                      Perguntas úteis
                    </h2>
                    <CardBullets items={ad.questionsToAsk} className="mt-5" />
                  </div>
                ) : null}
              </section>
            )}

            {ad.faqs?.length ? (
              <section>
                <SectionHeading eyebrow="FAQ" title="Dúvidas frequentes" />
                <div className="mt-8 space-y-3">
                  {ad.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group rounded-2xl border border-[var(--line)] bg-white px-5 py-4 open:border-[var(--accent-2)]"
                    >
                      <summary className="cursor-pointer list-none font-semibold text-[var(--ink)] marker:content-none [&::-webkit-details-marker]:hidden">
                        <span className="flex items-start justify-between gap-4">
                          <span>{faq.question}</span>
                          <span
                            aria-hidden
                            className="mt-0.5 text-[var(--accent-2)] transition group-open:rotate-45"
                          >
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-pretty text-[var(--ink-muted)]">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <Callout variant="aviso">
              <p>
                A Minha Espanha divulga este anúncio da comunidade, mas não intermedia o contato nem
                garante o serviço. Confirme zona, valores, disponibilidade e condições diretamente com
                o anunciante.
              </p>
            </Callout>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white shadow-[0_24px_50px_-36px_rgba(20,24,31,0.45)]">
              <div className="relative aspect-[16/10]">
                <Image src={ad.image} alt={ad.imageAlt} fill sizes="400px" className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">
                  Anunciante
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
                  {ad.provider ?? ad.title}
                </h2>
                {ad.providerRole ? (
                  <p className="mt-1 text-sm text-[var(--ink-muted)]">{ad.providerRole}</p>
                ) : null}
                <p className="mt-3 text-sm text-[var(--ink-muted)]">{ad.location}</p>
                {ad.priceNote ? (
                  <p className="mt-4 rounded-xl bg-[var(--paper-2)] px-3 py-2 text-sm text-[var(--ink)]">
                    {ad.priceNote}
                  </p>
                ) : null}
                <AdContactLinks contacts={ad.contacts} stacked className="mt-6 [&_a]:w-full" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
