import { CostCalculator } from "@/components/CostCalculator";
import { getCosts } from "@/lib/content";

export const metadata = {
  title: "Custo de vida",
  description: "Estimativa mensal de custo de vida em cidades da Espanha.",
};

export default function CustoDeVidaPage() {
  const costs = getCosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">
        Calculadora de custo de vida
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
        Faixas aproximadas para planejamento. Ajuste mentalmente ao seu bairro e estilo.
      </p>
      <div className="mt-8">
        <CostCalculator cities={costs.cities} notes={costs.notes} />
      </div>
    </div>
  );
}
