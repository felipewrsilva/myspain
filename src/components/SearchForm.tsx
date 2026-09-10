import Link from "next/link";
import { getCities, getTopics } from "@/lib/content";
import { stages } from "@/lib/site";

export function SearchForm({
  defaults,
}: {
  defaults?: {
    q?: string;
    cidade?: string;
    tema?: string;
    etapa?: string;
  };
}) {
  const cities = getCities();
  const topics = getTopics();

  return (
    <form action="/buscar" className="grid gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
      <label className="flex flex-col gap-1 text-sm lg:col-span-2">
        <span className="font-medium text-[var(--ink-muted)]">Busca</span>
        <input
          name="q"
          defaultValue={defaults?.q}
          placeholder="NIE, banco, aluguel..."
          className="rounded-lg border border-[var(--line)] bg-[var(--paper-2)] px-3 py-2 outline-none ring-[var(--accent)] focus:ring-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-[var(--ink-muted)]">Etapa</span>
        <select
          name="etapa"
          defaultValue={defaults?.etapa ?? ""}
          className="rounded-lg border border-[var(--line)] bg-[var(--paper-2)] px-3 py-2 outline-none ring-[var(--accent)] focus:ring-2"
        >
          <option value="">Todas</option>
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.title}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-[var(--ink-muted)]">Cidade</span>
        <select
          name="cidade"
          defaultValue={defaults?.cidade ?? ""}
          className="rounded-lg border border-[var(--line)] bg-[var(--paper-2)] px-3 py-2 outline-none ring-[var(--accent)] focus:ring-2"
        >
          <option value="">Todas</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-[var(--ink-muted)]">Tema</span>
        <select
          name="tema"
          defaultValue={defaults?.tema ?? ""}
          className="rounded-lg border border-[var(--line)] bg-[var(--paper-2)] px-3 py-2 outline-none ring-[var(--accent)] focus:ring-2"
        >
          <option value="">Todos</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-5">
        <button
          type="submit"
          className="rounded-lg bg-[var(--ink)] px-5 py-2.5 text-sm font-bold text-white hover:bg-[var(--accent)]"
        >
          Filtrar
        </button>
        <Link href="/buscar" className="rounded-lg border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--ink-muted)]">
          Limpar
        </Link>
      </div>
    </form>
  );
}
