import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Loader2,
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
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Layout, PageMain } from "@/components/site/Layout";
import { Logo } from "@/components/site/Logo";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AMENITIES_MAP } from "@/data/amenities";
import { addInquiry } from "@/lib/store";

export default function PropertyDetailsPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");

  const todayString = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const res = await fetch(`${baseUrl}/api/properties/${slug}`);
        const result = await res.json();

        if (result.success && result.data) {
          setProperty(result.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch property details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <PageMain className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="animate-spin text-copper" size={48} />
        </PageMain>
      </Layout>
    );
  }

  if (error || !property) {
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

  const images =
    property.images?.length > 0 ? property.images : [property.thumbnail].filter(Boolean);
  const otherProperties = property.relatedProperties || [];

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

            {/* Desktop View: Dynamic Masonry Grid */}
            <div className="hidden md:block relative group">
              <div
                className={`grid gap-2 h-[60vh] rounded-2xl overflow-hidden ${
                  images.length === 1
                    ? "md:grid-cols-1"
                    : images.length === 2
                    ? "md:grid-cols-2"
                    : images.length === 3
                    ? "md:grid-cols-[2fr_1fr] md:grid-rows-2"
                    : "md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2"
                }`}
              >
                {images.slice(0, 5).map((img, i) => {
                  let itemClass = "relative overflow-hidden group/item cursor-pointer ";
                  if (images.length >= 3 && i === 0) itemClass += "md:row-span-2 ";
                  if (images.length === 4 && i === 3) itemClass += "md:col-span-2 ";

                  return (
                    <div
                      key={i}
                      className={itemClass}
                      onClick={() => {
                        setActiveImage(i);
                        setLightboxOpen(true);
                      }}
                    >
                      <img
                        src={img}
                        alt={`Gallery ${i}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>
                  );
                })}
              </div>
              {images.length > 5 && (
                <button
                  onClick={() => {
                    setActiveImage(0);
                    setLightboxOpen(true);
                  }}
                  className="absolute bottom-4 right-4 bg-white/95 px-4 py-2 rounded-lg text-sm font-semibold shadow-soft hover:scale-105 transition-transform flex items-center gap-2 border border-border z-10"
                >
                  Show all {images.length} photos
                </button>
              )}
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
                <div className="pt-8">
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
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const fd = new FormData(form);
                      setIsSubmitting(true);

                      try {
                        const baseUrl = import.meta.env.VITE_BASE_URL;
                        const payload = {
                          name: String(fd.get("name") || ""),
                          email: String(fd.get("email") || ""),
                          phone: String(fd.get("phone") || ""),
                          checkIn: String(fd.get("checkIn") || ""),
                          guestCount: parseInt(String(fd.get("guests") || "1"), 10),
                        };

                        const checkOutValue = fd.get("checkOut");
                        if (checkOutValue) {
                          payload.checkOut = String(checkOutValue);
                        }

                        const messageValue = fd.get("message");
                        if (messageValue) {
                          payload.message = String(messageValue);
                        }

                        const res = await fetch(`${baseUrl}/api/inquiries/stay/${slug}`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                        });

                        if (!res.ok) throw new Error("Failed to submit stay inquiry");

                        addInquiry({
                          type: "booking",
                          name: payload.name,
                          email: payload.email,
                          phone: payload.phone,
                          propertySlug: slug,
                          propertyTitle: property.title,
                          checkIn: payload.checkIn,
                          checkOut: payload.checkOut,
                          guests: String(payload.guestCount),
                          message: payload.message,
                        });

                        setSent(true);
                        toast.success("Stay inquiry received! We will contact you shortly.");
                        form.reset();
                        setTimeout(() => setSent(false), 4000);
                      } catch (error) {
                        console.error(error);
                        toast.error("Something went wrong. Please try again later.");
                      } finally {
                        setIsSubmitting(false);
                      }
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
                            min={todayString}
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
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
                            min={checkInDate || todayString}
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
                      className="w-full bg-copper hover:bg-[#A67E46] text-white py-3.5 rounded-xl font-bold text-base transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : sent ? "Inquiry Sent ✓" : "Send Stay Inquiry"}
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
            <div className="mt-8 pt-8 border-t border-border">
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
                          src={p.thumbnail}
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
          {/* Lightbox Modal */}
          {lightboxOpen && (
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-sm">
              <button
                className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setLightboxOpen(false)}
              >
                <X size={32} />
              </button>

              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
                onClick={() => setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1))}
              >
                <ChevronLeft size={48} strokeWidth={1.5} />
              </button>

              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
                onClick={() => setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1))}
              >
                <ChevronRight size={48} strokeWidth={1.5} />
              </button>

              <div className="w-full max-w-5xl px-4 md:px-12 max-h-screen">
                <img
                  src={images[activeImage]}
                  alt={`Property Image ${activeImage + 1}`}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-medium">
                  {activeImage + 1} / {images.length}
                </div>
              </div>
            </div>
          )}
        </div>
      </PageMain>
    </Layout>
  );
}
