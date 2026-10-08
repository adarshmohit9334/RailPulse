export interface LocalTrain {
  number: string;
  name: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
}

export const popularTrains: LocalTrain[] = [
  { number: "12951", name: "Mumbai New Delhi Rajdhani Express", from: "Mumbai Central", fromCode: "MMCT", to: "New Delhi", toCode: "NDLS" },
  { number: "12952", name: "New Delhi Mumbai Rajdhani Express", from: "New Delhi", fromCode: "NDLS", to: "Mumbai Central", toCode: "MMCT" },
  { number: "22436", name: "Vande Bharat Express", from: "New Delhi", fromCode: "NDLS", to: "Varanasi Jn", toCode: "BSB" },
  { number: "12001", name: "New Delhi Shatabdi Express", from: "Rani Kamlapati", fromCode: "RKMP", to: "New Delhi", toCode: "NDLS" },
  { number: "12269", name: "Duronto Express", from: "Chennai Central", fromCode: "MAS", to: "Hazrat Nizamuddin", toCode: "NZM" },
  { number: "12805", name: "Janmabhoomi Express", from: "Visakhapatnam", fromCode: "VSKP", to: "Secunderabad", toCode: "SC" },
  { number: "12615", name: "Grand Trunk Express", from: "Chennai Central", fromCode: "MAS", to: "New Delhi", toCode: "NDLS" },
  { number: "12723", name: "Telangana Express", from: "Hyderabad", fromCode: "HYB", to: "New Delhi", toCode: "NDLS" },
  { number: "22691", name: "Rajdhani Express", from: "KSR Bengaluru", fromCode: "SBC", to: "Hazrat Nizamuddin", toCode: "NZM" },
  { number: "12301", name: "Howrah Rajdhani Express", from: "Howrah", fromCode: "HWH", to: "New Delhi", toCode: "NDLS" },
];

export function searchLocalTrains(query: string): LocalTrain[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  return popularTrains.filter((train) => {
    return (
      train.number.includes(normalizedQuery) ||
      train.name.toLowerCase().includes(normalizedQuery) ||
      train.from.toLowerCase().includes(normalizedQuery) ||
      train.fromCode.toLowerCase().includes(normalizedQuery) ||
      train.to.toLowerCase().includes(normalizedQuery) ||
      train.toCode.toLowerCase().includes(normalizedQuery)
    );
  }).slice(0, 10);
}
