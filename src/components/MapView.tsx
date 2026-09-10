"use client";

import { useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place } from "@/lib/content";
import { getCityName } from "@/lib/content-client";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const categories = [
  { id: "", label: "Todas" },
  { id: "documentos", label: "Documentos" },
  { id: "ayuntamiento", label: "Ayuntamiento" },
  { id: "banco", label: "Banco" },
  { id: "trabalho", label: "Trabalho" },
  { id: "saude", label: "Saúde" },
];

export function MapView({
  places,
  cities,
}: {
  places: Place[];
  cities: { id: string; name: string }[];
}) {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(
    () =>
      places.filter((place) => {
        if (city && place.city !== city) return false;
        if (category && place.category !== category) return false;
        return true;
      }),
    [places, city, category],
  );

  const center = useMemo<[number, number]>(() => {
    if (!filtered.length) return [40.4168, -3.7038];
    const lat = filtered.reduce((sum, p) => sum + p.lat, 0) / filtered.length;
    const lng = filtered.reduce((sum, p) => sum + p.lng, 0) / filtered.length;
    return [lat, lng];
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 flex-col gap-1 text-sm">
          <span className="text-[var(--ink-muted)]">Cidade</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2"
          >
            <option value="">Todas</option>
            {cities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm">
          <span className="text-[var(--ink-muted)]">Categoria</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2"
          >
            {categories.map((item) => (
              <option key={item.id || "all"} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[var(--line)]">
        <MapContainer center={center} zoom={6} scrollWheelZoom={false} className="h-[420px] w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((place) => (
            <Marker key={place.id} position={[place.lat, place.lng]} icon={markerIcon}>
              <Popup>
                <strong>{place.name}</strong>
                <br />
                {place.address}
                <br />
                <span className="text-xs">{getCityName(place.city, cities)}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <ul className="grid gap-3 md:grid-cols-2">
        {filtered.map((place) => (
          <li key={place.id} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              {place.category} · {getCityName(place.city, cities)}
            </p>
            <h3 className="mt-1 font-semibold text-[var(--ink)]">{place.name}</h3>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">{place.description}</p>
            <p className="mt-2 text-xs text-[var(--ink-muted)]">{place.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
