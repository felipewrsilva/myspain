"use client";

import dynamic from "next/dynamic";
import type { Place } from "@/lib/content";

const MapView = dynamic(() => import("@/components/MapView").then((mod) => mod.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-3xl border border-[var(--line)] bg-[var(--paper-2)] text-sm text-[var(--ink-muted)]">
      Carregando mapa...
    </div>
  ),
});

export function MapSection({
  places,
  cities,
}: {
  places: Place[];
  cities: { id: string; name: string }[];
}) {
  return <MapView places={places} cities={cities} />;
}
