import {
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Tv,
  UtensilsCrossed,
  AirVent,
  WashingMachine
} from "lucide-react";

export const AMENITIES_MAP = {
  wifi: { icon: Wifi, label: "High-Speed WiFi" },
  parking: { icon: Car, label: "Parking Spaces" },
  gym: { icon: Dumbbell, label: "Gym Access" },
  pool: { icon: Waves, label: "Pool" },
  tv: { icon: Tv, label: "Smart TV" },
  kitchen: { icon: UtensilsCrossed, label: "Full Kitchen" },
  ac: { icon: AirVent, label: "Air Conditioning" },
  laundry: { icon: WashingMachine, label: "In-unit Laundry" },
};
