import Image from "next/image";
import type { AdContact, AdLocation } from "@/lib/anuncios";
import { cn } from "@/lib/utils";

function contactCtaLabel(contact: AdContact) {
  if (contact.ctaLabel) return contact.ctaLabel;
  if (contact.type === "whatsapp") return "Falar no WhatsApp";
  if (contact.type === "instagram") return "Ver no Instagram";
  if (contact.type === "email") return "Enviar e-mail";
  if (contact.type === "phone") return "Ligar";
  return contact.label;
}

export function AdContactLinks({
  contacts,
  className,
  stacked = false,
}: {
  contacts: AdContact[];
  className?: string;
  stacked?: boolean;
}) {
  if (!contacts.length) return null;

  return (
    <div
      className={cn(
        stacked ? "flex flex-col gap-3" : "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
        className,
      )}
    >
      {contacts.map((contact, index) => {
        const primary = index === 0;
        return (
          <a
            key={`${contact.type}-${contact.href}`}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold transition",
              primary
                ? "bg-[var(--accent)] text-white hover:brightness-110"
                : "border border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--accent-2)]",
            )}
          >
            {contactCtaLabel(contact)}
            <span className="sr-only"> ({contact.value}, abre em nova aba)</span>
          </a>
        );
      })}
    </div>
  );
}

export function AdLocationPanel({ location }: { location: AdLocation }) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[16rem] overflow-hidden bg-[var(--paper-2)] sm:min-h-[20rem]">
          <Image
            src={location.image}
            alt={location.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,24,31,0.88)] via-[rgba(20,24,31,0.35)] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white/55">Localização</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              {location.label}
            </h2>
            <p className="mt-2 text-sm font-medium text-white/75">{location.region}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="text-base leading-relaxed text-pretty text-[var(--ink-muted)]">
              {location.description}
            </p>
            {location.notes?.length ? (
              <ul className="mt-5 space-y-2.5">
                {location.notes.map((note) => (
                  <li key={note} className="flex gap-2.5 text-sm text-[var(--ink)]">
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--accent-2)]"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <a
            href={location.mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--line)] px-5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent-2)]"
          >
            {location.mapLabel}
            <span className="sr-only"> (abre o mapa em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
