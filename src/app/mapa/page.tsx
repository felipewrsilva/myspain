import { MapSection } from "@/components/MapSection";
import { getCities, getPlaces } from "@/lib/content";

export const metadata = {
  title: "Mapa",
  description: "Lugares úteis na Espanha: extranjería, ayuntamiento, bancos e mais.",
};

export default function MapaPage() {
  const places = getPlaces();
  const cities = getCities().map((city) => ({ id: city.id, name: city.name }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">Mapa de lugares úteis</h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
        Referências práticas por cidade. Os pontos são editoriais e podem ser ampliados no repositório.
      </p>
      <div className="mt-8">
        <MapSection places={places} cities={cities} />
      </div>
    </div>
  );
}
