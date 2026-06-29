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
  HIGH_SPEED_WIFI: { icon: Wifi, label: "High-Speed WiFi" },
  PARKING_SPACES: { icon: Car, label: "Parking Spaces" },
  GYM_ACCESS: { icon: Dumbbell, label: "Gym Access" },
  POOL: { icon: Waves, label: "Pool" },
  SMART_TV: { icon: Tv, label: "Smart TV" },
  FULL_KITCHEN: { icon: UtensilsCrossed, label: "Full Kitchen" },
  AIR_CONDITIONING: { icon: AirVent, label: "Air Conditioning" },
  IN_UNIT_LAUNDRY: { icon: WashingMachine, label: "In-unit Laundry" },
};
