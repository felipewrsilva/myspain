import type { AdContact } from "@/lib/anuncios";
import { cn } from "@/lib/utils";

function contactCtaLabel(contact: AdContact) {
  if (contact.type === "whatsapp") return "Reservar no WhatsApp";
  if (contact.type === "instagram") return "Ver no Instagram";
  return contact.label;
}

export function AdContactLinks({
  contacts,
  className,
}: {
  contacts: AdContact[];
  className?: string;
}) {
  if (!contacts.length) return null;

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>
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
