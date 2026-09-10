import { CurrencyConverter } from "@/components/CurrencyConverter";

export const metadata = {
  title: "Conversor BRL ↔ EUR",
  description: "Converta valores entre real e euro com cotação aproximada.",
};

export default function ConversorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">
        Conversor BRL ↔ EUR
      </h1>
      <p className="mt-3 text-[var(--ink-muted)]">
        Cotação de referência via Frankfurter API. Não é recomendação financeira.
      </p>
      <div className="mt-8">
        <CurrencyConverter />
      </div>
    </div>
  );
}
