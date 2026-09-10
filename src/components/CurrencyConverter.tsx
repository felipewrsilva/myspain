"use client";

import { useEffect, useState } from "react";

export function CurrencyConverter() {
  const [amount, setAmount] = useState("1000");
  const [direction, setDirection] = useState<"BRL_EUR" | "EUR_BRL">("BRL_EUR");
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("https://api.frankfurter.app/latest?from=EUR&to=BRL");
        if (!res.ok) throw new Error("Falha ao carregar cotação");
        const data = (await res.json()) as { rates: { BRL: number }; date: string };
        if (!cancelled) {
          setRate(data.rates.BRL);
          setUpdatedAt(data.date);
          setError(null);
        }
      } catch {
        if (!cancelled) setError("Não foi possível obter a cotação agora. Tente novamente em instantes.");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const numeric = Number(amount.replace(",", ".")) || 0;
  const result =
    rate == null
      ? null
      : direction === "BRL_EUR"
        ? numeric / rate
        : numeric * rate;

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-[var(--ink-muted)]">Valor</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--paper-2)] px-3 py-2"
            inputMode="decimal"
          />
        </label>
        <label className="text-sm">
          <span className="text-[var(--ink-muted)]">Direção</span>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as "BRL_EUR" | "EUR_BRL")}
            className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--paper-2)] px-3 py-2"
          >
            <option value="BRL_EUR">BRL → EUR</option>
            <option value="EUR_BRL">EUR → BRL</option>
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-2xl bg-[var(--paper-2)] p-5">
        {error ? (
          <p className="text-sm text-red-700">{error}</p>
        ) : (
          <>
            <p className="text-sm text-[var(--ink-muted)]">Resultado aproximado</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
              {result == null
                ? "Carregando..."
                : new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: direction === "BRL_EUR" ? "EUR" : "BRL",
                  }).format(result)}
            </p>
            {rate != null ? (
              <p className="mt-2 text-xs text-[var(--ink-muted)]">
                1 EUR ≈ {rate.toFixed(4)} BRL
                {updatedAt ? ` · ref. ${updatedAt}` : ""}
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
