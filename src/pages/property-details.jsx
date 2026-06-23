import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Users,
  MapPin,
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Tv,
  UtensilsCrossed,
  AirVent,
  WashingMachine,
  Star,
  Send,
  Shield,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import penthouse from "@/assets/penthouse.jpg";
import living from "@/assets/living-room.jpg";
import bedroom from "@/assets/bedroom.jpg";
import kitchen from "@/assets/kitchen.jpg";
import dining from "@/assets/dining.jpg";
import skyline from "@/assets/skyline.jpg";

const allProperties = {
  "sub-penthouse-southbank": {
    title: "Modern Penthouse Retreat with Private Terrace & City Skyline Views",
    location: "Southbank, Melbourne",
    beds: 3,
    baths: 2,
    guests: 6,
    images: [penthouse, skyline, living, kitchen, dining, bedroom],
    description: `Experience Melbourne at its finest from this stunning sub-penthouse in the heart of Southbank. With panoramic city skyline views, a private terrace, and luxurious interiors, this property is the ultimate urban retreat.\n\nSpanning over 120sqm of living space, this beautifully appointed apartment features three spacious bedrooms, two modern bathrooms, and a gourmet kitchen with premium appliances. The open-plan living and dining area flows seamlessly onto the expansive balcony where you can enjoy breathtaking views of the Melbourne skyline.\n\nWhether you're visiting for business, a family holiday, or a special occasion, this sub-penthouse delivers an unforgettable stay with resort-style amenities including a heated pool, fully-equipped gym, and secure double parking.`,
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Car, label: "2x Parking Spaces" },
      { icon: Dumbbell, label: "Gym Access" },
      { icon: Waves, label: "Heated Pool" },
      { icon: Tv, label: "Smart TV" },
      { icon: UtensilsCrossed, label: "Full Kitchen" },
      { icon: AirVent, label: "Air Conditioning" },
      { icon: WashingMachine, label: "In-unit Laundry" },
    ],
    houseRules: {
      checkIn: "3:00 PM",
      checkOut: "10:00 AM",
      smoking: "No smoking",
      pets: "No pets allowed",
      parties: "No parties or events",
      quiet: "Quiet hours 10 PM - 8 AM",
    },
    reviews: [
      {
        name: "Paul",
        rating: 5,
        date: "October 2024",
        text: "Very clean and modern with great views. Truly five star. Excellent host.",
      },
      {
        name: "Manuelika",
        rating: 5,
        date: "September 2024",
        text: "The most luxurious amazing place. I want to stay here forever!",
      },
      {
        name: "Ahmed",
        rating: 5,
        date: "August 2024",
        text: "Highly recommend! Hosts attended to all my needs immediately.",
      },
    ],
    otherListings: ["central-apt-docklands", "city-views-cbd"],
  },
  "central-apt-docklands": {
    title: "Super Central Apartment with Parking, Tennis, Pool & Gym",
    location: "Docklands, Melbourne",
    beds: 2,
    baths: 1,
    guests: 4,
    images: [living, kitchen, bedroom, dining, skyline, penthouse],
    description: `Located in the vibrant Docklands precinct, this modern apartment offers the perfect base for exploring Melbourne. With direct access to tennis courts, a swimming pool, and a fully-equipped gym, you'll have everything you need for a comfortable and active stay.\n\nThe apartment features two well-appointed bedrooms, a modern bathroom, and an open-plan kitchen and living area with water views. The building's prime location puts you within walking distance of Melbourne's best restaurants, shopping, and entertainment.\n\nSecure parking is included, making this the ideal choice for both business and leisure travellers seeking convenience and comfort in Melbourne's waterfront district.`,
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Car, label: "Parking Space" },
      { icon: Dumbbell, label: "Gym Access" },
      { icon: Waves, label: "Pool & Tennis" },
      { icon: Tv, label: "Smart TV" },
      { icon: UtensilsCrossed, label: "Full Kitchen" },
      { icon: AirVent, label: "Air Conditioning" },
      { icon: WashingMachine, label: "In-unit Laundry" },
    ],
    houseRules: {
      checkIn: "3:00 PM",
      checkOut: "10:00 AM",
      smoking: "No smoking",
      pets: "No pets allowed",
      parties: "No parties or events",
      quiet: "Quiet hours 10 PM - 8 AM",
    },
    reviews: [
      {
        name: "Josh",
        rating: 5,
        date: "November 2024",
        text: "Loved the location, scenic views. Apartment is gorgeous.",
      },
      {
        name: "Sheng",
        rating: 5,
        date: "October 2024",
        text: "Very enjoyed our stay. Will book again.",
      },
    ],
    otherListings: ["sub-penthouse-southbank", "city-views-cbd"],
  },
  "city-views-cbd": {
    title: "Live Luxe | Gorgeous City Views 2BR APT w/ Pool & Gym",
    location: "Melbourne CBD",
    beds: 2,
    baths: 2,
    guests: 4,
    images: [bedroom, skyline, penthouse, living, kitchen, dining],
    description: `Wake up to stunning city views in this gorgeous two-bedroom apartment right in the heart of Melbourne's CBD. Floor-to-ceiling windows flood the space with natural light while showcasing the incredible Melbourne skyline.\n\nEach bedroom has been thoughtfully designed with premium bedding and ample storage. The two modern bathrooms feature rainfall showers and quality fixtures. The kitchen is fully equipped for preparing meals, and the living area is the perfect spot to unwind after a day exploring the city.\n\nResidents enjoy access to a heated pool, sauna, and well-equipped gym. The central location puts you steps away from Melbourne's best dining, shopping, and cultural attractions.`,
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Dumbbell, label: "Gym & Sauna" },
      { icon: Waves, label: "Heated Pool" },
      { icon: Tv, label: "Smart TV" },
      { icon: UtensilsCrossed, label: "Full Kitchen" },
      { icon: AirVent, label: "Air Conditioning" },
      { icon: WashingMachine, label: "In-unit Laundry" },
    ],
    houseRules: {
      checkIn: "3:00 PM",
      checkOut: "10:00 AM",
      smoking: "No smoking",
      pets: "No pets allowed",
      parties: "No parties or events",
      quiet: "Quiet hours 10 PM - 8 AM",
    },
    reviews: [
      {
        name: "Sehet",
        rating: 5,
        date: "December 2024",
        text: "Modern, comfortable, spacious, and a great location.",
      },
      {
        name: "Nez",
        rating: 5,
        date: "November 2024",
        text: "Fantastic accommodation, clean and modern with stunning views.",
      },
      {
        name: "Cherrie",
        rating: 5,
        date: "October 2024",
        text: "Wonderful, helpful, accommodating. Highly recommend!",
      },
    ],
    otherListings: ["sub-penthouse-southbank", "central-apt-docklands"],
  },
  "designer-loft-fitzroy": {
    title: "Designer Kitchen Loft in Trendy Fitzroy",
    location: "Fitzroy, Melbourne",
    beds: 1,
    baths: 1,
    guests: 2,
    images: [kitchen, dining, living, bedroom, skyline, penthouse],
    description: `Nestled in Melbourne's trendiest suburb, this designer loft blends industrial chic with modern luxury. The showpiece kitchen features premium appliances and a stunning stone benchtop — perfect for foodies and home chefs.\n\nThe open-plan design creates a spacious feel, with the bedroom tucked away for privacy. Natural light pours through oversized windows, and the bathroom features a rain shower and designer fixtures.\n\nFitzroy is Melbourne's creative heart, and you'll be steps from some of the city's best cafés, boutiques, street art, and nightlife.`,
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Tv, label: "Smart TV" },
      { icon: UtensilsCrossed, label: "Designer Kitchen" },
      { icon: AirVent, label: "Air Conditioning" },
      { icon: WashingMachine, label: "In-unit Laundry" },
    ],
    houseRules: {
      checkIn: "3:00 PM",
      checkOut: "10:00 AM",
      smoking: "No smoking",
      pets: "No pets allowed",
      parties: "No parties or events",
      quiet: "Quiet hours 10 PM - 8 AM",
    },
    reviews: [
      {
        name: "Lena",
        rating: 5,
        date: "January 2025",
        text: "Absolutely stunning loft. The kitchen was a dream to cook in!",
      },
    ],
    otherListings: ["sub-penthouse-southbank", "sun-lit-residence-south-yarra"],
  },
  "sunlit-residence-south-yarra": {
    title: "Sunlit Family Residence in South Yarra",
    location: "South Yarra, Melbourne",
    beds: 3,
    baths: 2,
    guests: 6,
    images: [dining, living, bedroom, kitchen, penthouse, skyline],
    description: `This beautifully sunlit family residence offers generous space and premium comfort in the prestigious South Yarra neighbourhood. Three bedrooms and two bathrooms provide plenty of room for families or groups.\n\nThe home features a gourmet kitchen, spacious living areas, and a charming outdoor entertaining space. Every room is bathed in natural light, creating a warm and inviting atmosphere.\n\nSouth Yarra's famous Chapel Street is at your doorstep with world-class dining, boutique shopping, and vibrant nightlife. The Royal Botanic Gardens are just a short stroll away.`,
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Car, label: "Parking" },
      { icon: Tv, label: "Smart TV" },
      { icon: UtensilsCrossed, label: "Full Kitchen" },
      { icon: AirVent, label: "Air Conditioning" },
      { icon: WashingMachine, label: "In-unit Laundry" },
    ],
    houseRules: {
      checkIn: "3:00 PM",
      checkOut: "10:00 AM",
      smoking: "No smoking",
      pets: "No pets allowed",
      parties: "No parties or events",
      quiet: "Quiet hours 10 PM - 8 AM",
    },
    reviews: [
      {
        name: "Tom",
        rating: 5,
        date: "February 2025",
        text: "Perfect for our family. Spacious, clean, and beautifully decorated.",
      },
      {
        name: "Sarah",
        rating: 5,
        date: "January 2025",
        text: "Loved the location and the outdoor area. Kids had a great time!",
      },
    ],
    otherListings: ["designer-loft-fitzroy", "city-views-cbd"],
  },
  "skyline-studio-carlton": {
    title: "Skyline Studio Retreat in Carlton",
    location: "Carlton, Melbourne",
    beds: 1,
    baths: 1,
    guests: 2,
    images: [skyline, bedroom, kitchen, living, dining, penthouse],
    description: `Perched high above Carlton, this modern studio retreat offers sweeping skyline views that will take your breath away. The compact but cleverly designed space maximises every square metre.\n\nThe studio features a comfortable queen bed, a well-equipped kitchenette, and a modern bathroom with quality fixtures. The highlight is the floor-to-ceiling windows that frame the Melbourne skyline — perfect for watching sunsets over the city.\n\nCarlton is Melbourne's Little Italy, and you'll be surrounded by some of the city's best Italian restaurants, cafés, and the beautiful Carlton Gardens.`,
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Tv, label: "Smart TV" },
      { icon: UtensilsCrossed, label: "Kitchenette" },
      { icon: AirVent, label: "Air Conditioning" },
    ],
    houseRules: {
      checkIn: "3:00 PM",
      checkOut: "10:00 AM",
      smoking: "No smoking",
      pets: "No pets allowed",
      parties: "No parties or events",
      quiet: "Quiet hours 10 PM - 8 AM",
    },
    reviews: [
      {
        name: "Mia",
        rating: 5,
        date: "March 2025",
        text: "The views! Absolutely incredible. Perfect little retreat.",
      },
    ],
    otherListings: ["central-apt-docklands", "designer-loft-fitzroy"],
  },
};

export default function PropertyDetailsPage() {
  const { slug } = useParams();
  const property = allProperties[slug];
  const [sent, setSent] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!property) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Property Not Found</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              This property doesn&rsquo;t exist or has been removed.
            </p>
            <Link to="/properties" className="btn-primary mt-8">
              <ArrowLeft size={18} /> Back to Properties
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const images = property.images;
  const otherProperties = property.otherListings
    .map((s) => ({ slug: s, ...allProperties[s] }))
    .filter(Boolean);

  const avgRating =
    property.reviews.reduce((acc, r) => acc + r.rating, 0) / property.reviews.length || 0;

  return (
    <Layout theme="light">
      <div className="pt-32 pb-20 bg-sand-soft min-h-screen">
        <div className="container-luxe">
          {/* Top Header */}
          <FadeIn>
            <div className="mb-6">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors mb-4 group"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Properties
              </Link>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-ink md:text-4xl max-w-4xl leading-tight">
                    {property.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-ink/75 font-medium text-[0.95rem]">
                    <span className="flex items-center gap-1.5 underline decoration-ink/30 underline-offset-4 cursor-pointer hover:text-ink transition-colors">
                      <Star size={16} fill="currentColor" className="text-copper" />
                      {avgRating.toFixed(1)} · {property.reviews.length} reviews
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5 underline decoration-ink/30 underline-offset-4 cursor-pointer hover:text-ink transition-colors">
                      <MapPin size={16} className="text-copper" />
                      {property.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Responsive Gallery */}
          <FadeIn delay={0.1}>
            {/* Mobile View: Main Image + Thumbnails */}
            <div className="md:hidden flex flex-col gap-3">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm">
                <img 
                  src={images[activeImage]} 
                  alt={`Property Image ${activeImage + 1}`} 
                  className="w-full h-full object-cover transition-opacity duration-300" 
                  key={activeImage}
                />
                <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold shadow-soft flex items-center gap-2 border border-border z-10">
                  {activeImage + 1} / {images.length}
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden snap-x pb-2">
                {images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    className={`relative w-[22%] aspect-[4/3] shrink-0 rounded-xl overflow-hidden snap-center transition-all ${
                      activeImage === i 
                        ? 'ring-2 ring-ink ring-offset-1' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop View: Masonry Grid */}
            <div className="hidden md:block relative group">
              <div className="grid md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2 gap-2 h-[60vh] rounded-2xl overflow-hidden">
                <div className="md:row-span-2 relative overflow-hidden group/item">
                  <img src={images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]" />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
                <div className="relative overflow-hidden group/item">
                  <img src={images[1]} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]" />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
                <div className="relative overflow-hidden group/item">
                  <img src={images[2]} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]" />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
                <div className="relative overflow-hidden group/item">
                  <img src={images[3]} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]" />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
                <div className="relative overflow-hidden group/item">
                  <img src={images[4]} alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]" />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
              </div>
              <button className="absolute bottom-4 right-4 bg-white/95 px-4 py-2 rounded-lg text-sm font-semibold shadow-soft hover:scale-105 transition-transform flex items-center gap-2 border border-border z-10">
                Show all photos
              </button>
            </div>
          </FadeIn>

          <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr] mt-12">
            {/* Left Column - Content */}
            <div className="pb-10">
              {/* Host / Key Info */}
              <FadeIn delay={0.15}>
                <div className="flex items-center justify-between pb-8 border-b border-border">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Hosted by Live Luxe</h2>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2 text-[0.95rem] text-ink/75">
                      <span>{property.guests} guests</span>
                      <span>·</span>
                      <span>{property.beds} bedrooms</span>
                      <span>·</span>
                      <span>{property.baths} baths</span>
                    </div>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-copper/60 bg-ink text-sand-soft">
                    <span className="font-display text-2xl italic text-copper">L</span>
                  </div>
                </div>
              </FadeIn>

              {/* Highlights */}
              <FadeIn delay={0.2}>
                <div className="py-8 border-b border-border space-y-6">
                  <div className="flex gap-5">
                    <Star className="text-ink mt-0.5" size={26} strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold text-lg">Highly rated</h3>
                      <p className="text-muted-foreground text-[0.95rem] mt-0.5">
                        Recent guests gave this property a 5-star rating.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <MapPin className="text-ink mt-0.5" size={26} strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold text-lg">Great location</h3>
                      <p className="text-muted-foreground text-[0.95rem] mt-0.5">
                        100% of recent guests gave the location a 5-star rating.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <Shield className="text-ink mt-0.5" size={26} strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold text-lg">Professionally managed</h3>
                      <p className="text-muted-foreground text-[0.95rem] mt-0.5">
                        Managed by Live Luxe, ensuring hotel-grade cleanliness and 24/7 support.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Description */}
              <FadeIn delay={0.25}>
                <div className="py-8 border-b border-border">
                  <div className="space-y-4 text-[0.95rem] text-ink/80 leading-relaxed whitespace-pre-line">
                    {property.description}
                  </div>
                </div>
              </FadeIn>

              {/* Amenities */}
              <FadeIn delay={0.3}>
                <div className="py-8 border-b border-border">
                  <h2 className="text-2xl font-bold tracking-tight mb-6">What this place offers</h2>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    {property.amenities.map((a) => {
                      const Icon = a.icon;
                      return (
                        <div key={a.label} className="flex items-center gap-4 text-ink/85">
                          <Icon size={24} strokeWidth={1.5} className="flex-none" />
                          <span className="text-[0.95rem]">{a.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <button className="mt-8 px-6 py-3 rounded-lg border border-ink font-semibold hover:bg-ink/5 transition-colors">
                    Show all amenities
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column — Sticky Booking Widget */}
            <div>
              <FadeIn direction="left" delay={0.3}>
                <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] border border-border">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold">Estimate</span>
                      <span className="text-muted-foreground ml-2">revenue</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Star size={14} fill="currentColor" />
                      <span>{avgRating.toFixed(1)}</span>
                      <span className="text-muted-foreground underline">
                        ({property.reviews.length})
                      </span>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="rounded-xl border border-ink/20 overflow-hidden divide-y divide-ink/20 focus-within:ring-2 focus-within:ring-ink transition-all">
                      <div className="grid grid-cols-2 divide-x divide-ink/20">
                        <div className="p-3 transition-colors hover:bg-sand/30 cursor-text">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink/70">
                            Check-in
                          </label>
                          <input
                            type="date"
                            className="w-full bg-transparent outline-none text-[0.95rem] text-ink mt-0.5 cursor-pointer"
                          />
                        </div>
                        <div className="p-3 transition-colors hover:bg-sand/30 cursor-text">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink/70">
                            Check-out
                          </label>
                          <input
                            type="date"
                            className="w-full bg-transparent outline-none text-[0.95rem] text-ink mt-0.5 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="p-3 relative transition-colors hover:bg-sand/30 cursor-pointer">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-ink/70">
                          Guests
                        </label>
                        <select className="w-full bg-transparent outline-none text-[0.95rem] text-ink mt-0.5 appearance-none cursor-pointer pr-8">
                          {Array.from({ length: property.guests }).map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1} guest{i > 0 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink/50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-full bg-copper hover:bg-[#A67E46] text-white py-3.5 rounded-xl font-bold text-base transition-colors"
                      type="submit"
                    >
                      {sent ? "Request Sent ✓" : "Request to Book"}
                    </button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                      You won't be charged yet
                    </p>
                  </form>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-4 bg-sand p-4 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                        <Shield size={20} className="text-copper" />
                      </div>
                      <p className="text-sm font-medium text-ink/80 leading-snug">
                        Secure booking directly with Live Luxe management.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Reviews Section */}
          {property.reviews.length > 0 && (
            <div className="mt-10 pt-10 border-t border-border">
              <FadeIn>
                <div className="flex items-center gap-3 text-2xl font-bold mb-8">
                  <Star size={24} fill="currentColor" />
                  <span>
                    {avgRating.toFixed(1)} · {property.reviews.length} reviews
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                  {property.reviews.map((r, i) => (
                    <div key={r.name + i}>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-copper/20 text-copper rounded-full flex items-center justify-center font-bold text-lg">
                          {r.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold">{r.name}</div>
                          <div className="text-sm text-muted-foreground">{r.date}</div>
                        </div>
                      </div>
                      <p className="text-[0.95rem] text-ink/80 leading-relaxed">
                        &ldquo;{r.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
                <button className="mt-10 px-6 py-3 rounded-lg border border-ink font-semibold hover:bg-ink/5 transition-colors">
                  Show all {property.reviews.length} reviews
                </button>
              </FadeIn>
            </div>
          )}

          {/* Other Listings */}
          {otherProperties.length > 0 && (
            <div className="mt-16 pt-16 border-t border-border">
              <FadeIn>
                <h2 className="text-2xl font-bold tracking-tight">More from Live Luxe</h2>
              </FadeIn>
              <StaggerContainer
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                staggerDelay={0.1}
              >
                {otherProperties.map((p) => (
                  <StaggerItem key={p.slug} className="min-w-0 w-full">
                    <Link to={`/properties/${p.slug}`} className="block group min-w-0 w-full">
                      <div className="relative aspect-4/3 overflow-hidden rounded-2xl mb-3 w-full">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 w-full">
                        <div className="flex justify-between items-start gap-2 min-w-0">
                          <h3 className="font-semibold text-ink truncate min-w-0 flex-1">
                            {p.location}
                          </h3>
                          <div className="flex items-center gap-1 text-[0.9rem] shrink-0 text-ink">
                            <Star size={12} fill="currentColor" /> 5.0
                          </div>
                        </div>
                        <p className="text-[0.95rem] text-muted-foreground truncate min-w-0 w-full">
                          {p.title}
                        </p>
                        <p className="text-[0.95rem] mt-1 text-ink">
                          <span className="font-semibold">
                            ${Math.floor(Math.random() * 200 + 200)}
                          </span>{" "}
                          AUD <span className="font-normal text-muted-foreground">night</span>
                        </p>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
