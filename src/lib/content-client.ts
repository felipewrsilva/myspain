export function getCityName(id: string, cities: { id: string; name: string }[]) {
  return cities.find((city) => city.id === id)?.name ?? id;
}
