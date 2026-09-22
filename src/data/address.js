const places = [
  { name: 'Kalayaan Avenue, Diliman, Quezon City', position: [14.6507, 121.0494] },
  { name: 'Poblacion, Makati City', position: [14.5656, 121.0274] },
  { name: 'Bonifacio Global City, Taguig', position: [14.5507, 121.0509] },
  { name: 'Kapitolyo, Pasig City', position: [14.5734, 121.0611] },
  { name: 'San Juan City, Metro Manila', position: [14.6019, 121.0355] },
  { name: 'Malate, Manila', position: [14.5776, 120.9889] }
]

export function addressFromPin([lat, lng]) {
  const nearest = places.reduce((best, place) => ((lat - place.position[0]) ** 2 + (lng - place.position[1]) ** 2) < ((lat - best.position[0]) ** 2 + (lng - best.position[1]) ** 2) ? place : best)
  return `Delivery pin near ${nearest.name}, Philippines`
}

// A local-only address-to-pin helper. It recognizes common Metro Manila areas;
// other addresses receive a repeatable pin within the delivery coverage area.
export function pinFromAddress(address) {
  const query = address.toLowerCase()
  const matched = places.find(place => query.includes(place.name.split(',').slice(-1)[0].trim().toLowerCase()) || query.includes(place.name.split(',')[0].toLowerCase()))
  if (matched) return matched.position
  let hash = 0
  for (const character of query) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0
  const normalized = Math.abs(hash)
  return [14.52 + (normalized % 1500) / 10000, 120.96 + (Math.floor(normalized / 1500) % 1200) / 10000]
}
