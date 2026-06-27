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
  Send,
  Share,
  Heart,
  Star,
  Shield,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Layout, PageMain } from "@/components/site/Layout";
import { Logo } from "@/components/site/Logo";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AMENITIES_MAP } from "@/data/amenities";
import { addInquiry, isPropertyPublished, getProperties } from "@/lib/store";
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
    amenities: ["wifi", "parking", "gym", "pool", "tv", "kitchen", "ac", "laundry"],
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
    amenities: ["wifi", "parking", "gym", "pool", "tv", "kitchen", "ac", "laundry"],
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
    title: "Aurora Suites | Gorgeous City Views 2BR APT w/ Pool & Gym",
    location: "Melbourne CBD",
    beds: 2,
    baths: 2,
    guests: 4,
    images: [bedroom, skyline, penthouse, living, kitchen, dining],
    description: `Wake up to stunning city views in this gorgeous two-bedroom apartment right in the heart of Melbourne's CBD. Floor-to-ceiling windows flood the space with natural light while showcasing the incredible Melbourne skyline.\n\nEach bedroom has been thoughtfully designed with premium bedding and ample storage. The two modern bathrooms feature rainfall showers and quality fixtures. The kitchen is fully equipped for preparing meals, and the living area is the perfect spot to unwind after a day exploring the city.\n\nResidents enjoy access to a heated pool, sauna, and well-equipped gym. The central location puts you steps away from Melbourne's best dining, shopping, and cultural attractions.`,
    amenities: ["wifi", "gym", "pool", "tv", "kitchen", "ac", "laundry"],
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
    amenities: ["wifi", "tv", "kitchen", "ac", "laundry"],
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
    amenities: ["wifi", "parking", "tv", "kitchen", "ac", "laundry"],
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
    amenities: ["wifi", "tv", "kitchen", "ac"],
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
  const storeProp = getProperties().find((p) => p.slug === slug);
  const baseProp = allProperties[slug] || {};

  let property = null;
  if (storeProp || allProperties[slug]) {
    property = { ...baseProp, ...storeProp };
    if (!property.images) property.images = [property.img];
    if (!property.description)
      property.description = "A beautiful property listed on Aurora Suites.";
    if (!property.amenities) property.amenities = [];
  }
  const [sent, setSent] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!property || !isPropertyPublished(slug)) {
    return (
      <Layout>
        <PageMain className="flex min-h-[60vh] items-center justify-center">
          <div className="container-luxe text-center">
            <h1 className="text-4xl font-bold">Property Not Found</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              This property doesn&rsquo;t exist or has been removed.
            </p>
            <Link to="/properties" className="btn-primary mt-8">
              <ArrowLeft size={18} /> Back to Properties
            </Link>
          </div>
        </PageMain>
      </Layout>
    );
  }

  const images = property.images;
  const otherProperties = (property.otherListings || [])
    .map((s) => ({
      slug: s,
      ...(allProperties[s] || {}),
      ...getProperties().find((p) => p.slug === s),
    }))
    .filter((p) => p.title && isPropertyPublished(p.slug));

  return (
    <Layout theme="light">
      <PageMain>
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
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-ink leading-tight">
                    {property.title}
                  </h1>
                </div>
                {/* <div className="shrink-0 flex gap-3 pt-2 md:pt-0">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-ink font-semibold hover:bg-ink/5 transition-colors">
                    <Share size={16} /> Share
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-ink font-semibold hover:bg-ink/5 transition-colors">
                    <Heart size={16} /> Save
                  </button>
                </div> */}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-ink/75 font-medium text-[0.95rem]">
                <span className="flex items-center gap-1.5 underline decoration-ink/30 underline-offset-4 cursor-pointer hover:text-ink transition-colors">
                  <MapPin size={16} className="text-copper" />
                  {property.location}
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Responsive Gallery */}
          <FadeIn delay={0.1}>
            {/* Mobile View: Main Image + Thumbnails */}
            <div className="md:hidden flex flex-col gap-3">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-sm">
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
                    className={`relative w-[22%] aspect-4/3 shrink-0 rounded-xl overflow-hidden snap-center transition-all ${
                      activeImage === i
                        ? "ring-2 ring-ink ring-offset-1"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop View: Masonry Grid */}
            <div className="hidden md:block relative group">
              <div className="grid md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2 gap-2 h-[60vh] rounded-2xl overflow-hidden">
                <div className="md:row-span-2 relative overflow-hidden group/item">
                  <img
                    src={images[0]}
                    alt="Main"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
                <div className="relative overflow-hidden group/item">
                  <img
                    src={images[1]}
                    alt="Gallery 1"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
                <div className="relative overflow-hidden group/item">
                  <img
                    src={images[2]}
                    alt="Gallery 2"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
                <div className="relative overflow-hidden group/item">
                  <img
                    src={images[3]}
                    alt="Gallery 3"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
                <div className="relative overflow-hidden group/item">
                  <img
                    src={images[4]}
                    alt="Gallery 4"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
              </div>
              <button className="absolute bottom-4 right-4 bg-white/95 px-4 py-2 rounded-lg text-sm font-semibold shadow-soft hover:scale-105 transition-transform flex items-center gap-2 border border-border z-10">
                Show all photos
              </button>
            </div>
          </FadeIn>

          <div className="section-gap grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            {/* Left Column - Content */}
            <div className="pb-10">
              {/* Host / Key Info */}
              <FadeIn delay={0.15}>
                <div className="flex items-center justify-between pb-8 border-b border-border">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Hosted by Aurora Suites</h2>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2 text-[0.95rem] text-ink/75">
                      <span>{property.guests} guests</span>
                      <span>·</span>
                      <span>{property.beds} bedrooms</span>
                      <span>·</span>
                      <span>{property.baths} baths</span>
                    </div>
                  </div>
                  <Logo className="h-14" />
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
                        Listed and coordinated by Aurora Suites — submit an inquiry and our team
                        will follow up personally.
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
                    {property.amenities.map((key) => {
                      const item = AMENITIES_MAP[key];
                      if (!item) return null;
                      const Icon = item.icon;
                      return (
                        <div key={key} className="flex items-center gap-4 text-ink/85">
                          <Icon size={24} strokeWidth={1.5} className="flex-none" />
                          <span className="text-[0.95rem]">{item.label}</span>
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

            {/* Right Column — Sticky Inquiry Widget */}
            <div>
              <FadeIn direction="left" delay={0.3}>
                <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] border border-border">
                  <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
                    <div>
                      <span className="text-2xl font-bold text-ink">${property.price || 250}</span>
                      <span className="text-muted-foreground ml-1">AUD / night</span>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      addInquiry({
                        type: "booking",
                        name: String(fd.get("name") || ""),
                        email: String(fd.get("email") || ""),
                        phone: String(fd.get("phone") || ""),
                        propertySlug: slug,
                        propertyTitle: property.title,
                        checkIn: String(fd.get("checkIn") || ""),
                        checkOut: String(fd.get("checkOut") || ""),
                        guests: String(fd.get("guests") || ""),
                        message: String(fd.get("message") || ""),
                      });
                      setSent(true);
                      toast.success("Stay inquiry received! We will contact you shortly.");
                      e.currentTarget.reset();
                    }}
                    className="space-y-4"
                  >
                    <input
                      name="name"
                      required
                      placeholder="Full name"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                      />
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="Phone"
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                      />
                    </div>
                    <div className="rounded-xl border border-ink/20 overflow-hidden divide-y divide-ink/20 focus-within:ring-2 focus-within:ring-ink transition-all">
                      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-ink/20">
                        <div className="p-3 transition-colors hover:bg-sand/30 cursor-text">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink/70">
                            Check-in
                          </label>
                          <input
                            name="checkIn"
                            type="date"
                            required
                            className="w-full bg-transparent outline-none text-[0.95rem] text-ink mt-0.5 cursor-pointer"
                          />
                        </div>
                        <div className="p-3 transition-colors hover:bg-sand/30 cursor-text">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink/70">
                            Check-out
                          </label>
                          <input
                            name="checkOut"
                            type="date"
                            required
                            className="w-full bg-transparent outline-none text-[0.95rem] text-ink mt-0.5 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="p-3 transition-colors hover:bg-sand/30 cursor-pointer">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-ink/70 mb-0.5">
                          Guests
                        </label>
                        <Select name="guests" defaultValue="1">
                          <SelectTrigger className="w-full bg-transparent border-0 h-auto p-0 shadow-none text-[0.95rem] text-ink focus:ring-0 rounded-none focus:ring-offset-0">
                            <SelectValue placeholder="Select guests" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: property.guests }).map((_, i) => (
                              <SelectItem key={i} value={String(i + 1)}>
                                {i + 1} guest{i > 0 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <textarea
                      name="message"
                      rows={2}
                      placeholder="Any special requests or questions?"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                    />

                    <button
                      className="w-full bg-copper hover:bg-[#A67E46] text-white py-3.5 rounded-xl font-bold text-base transition-colors"
                      type="submit"
                    >
                      {sent ? "Inquiry Sent ✓" : "Send Stay Inquiry"}
                    </button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Our team will follow up manually — no instant booking
                    </p>
                  </form>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-4 bg-sand p-4 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                        <Shield size={20} className="text-copper" />
                      </div>
                      <p className="text-sm font-medium text-ink/80 leading-snug">
                        Secure inquiry handled directly by the Aurora Suites team.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Other Listings */}
          {otherProperties.length > 0 && (
            <div className="mt-16 pt-16 border-t border-border">
              <FadeIn>
                <h2 className="text-2xl font-bold tracking-tight">More from Aurora Suites</h2>
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
                        </div>
                        <p className="text-[0.95rem] text-muted-foreground truncate min-w-0 w-full">
                          {p.title}
                        </p>
                        <p className="text-[0.95rem] mt-1 text-ink">
                          <span className="font-semibold">${p.price || 250}</span> AUD{" "}
                          <span className="font-normal text-muted-foreground">night</span>
                        </p>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}
        </div>
      </PageMain>
    </Layout>
  );
}
