"use client";

import { useMemo, useState } from "react";
import { formatEuro } from "@/lib/utils";

type CostBucket = {
  rent: number;
  food: number;
  transport: number;
  utilities: number;
  other: number;
};

type CostCity = {
  id: string;
  name: string;
  solo: CostBucket;
  casal: CostBucket;
};

export function CostCalculator({
  cities,
  notes,
}: {
  cities: CostCity[];
  notes: string;
}) {
  const [cityId, setCityId] = useState(cities[0]?.id ?? "");
  const [profile, setProfile] = useState<"solo" | "casal">("solo");

  const selected = useMemo(
    () => cities.find((city) => city.id === cityId) ?? cities[0],
    [cities, cityId],
  );

  const bucket = selected?.[profile];
  const total = bucket
    ? bucket.rent + bucket.food + bucket.transport + bucket.utilities + bucket.other
    : 0;

  if (!selected || !bucket) return null;

  const rows = [
    { label: "Aluguel", value: bucket.rent },
    { label: "Alimentação", value: bucket.food },
    { label: "Transporte", value: bucket.transport },
    { label: "Contas da casa", value: bucket.utilities },
    { label: "Outros", value: bucket.other },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4 rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-6">
        <label className="block text-sm">
          <span className="text-[var(--ink-muted)]">Cidade</span>
          <select
            className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--paper-2)] px-3 py-2"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="text-sm">
          <legend className="text-[var(--ink-muted)]">Perfil</legend>
          <div className="mt-2 flex gap-2">
            {(
              [
                ["solo", "Moro sozinho(a)"],
                ["casal", "Casal"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setProfile(id)}
                className={`rounded-xl px-4 py-2 ${
                  profile === id
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "border border-[var(--line)] text-[var(--ink-muted)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="text-xs leading-relaxed text-[var(--ink-muted)]">{notes}</p>
      </div>

      <div className="rounded-3xl border border-[var(--line)] bg-[var(--paper-2)] p-6">
        <p className="text-sm text-[var(--ink-muted)]">Estimativa mensal em {selected.name}</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">
          {formatEuro(total)}
        </p>
        <ul className="mt-6 space-y-3">
          {rows.map((row) => (
            <li key={row.label} className="flex items-center justify-between border-b border-[var(--line)] pb-2 text-sm">
              <span className="text-[var(--ink-muted)]">{row.label}</span>
              <span className="font-medium text-[var(--ink)]">{formatEuro(row.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
