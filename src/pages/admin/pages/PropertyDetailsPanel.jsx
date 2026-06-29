import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Users,
  BedDouble,
  Bath,
  Loader2,
  Star,
  Shield,
  ChevronRight,
  ChevronLeft,
  X,
  Inbox,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { AMENITIES_MAP } from "@/data/amenities";

export default function PropertyDetailsPanel({ slug, onBack }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/api/admin/properties/slug/${slug}`);
        const data = await res.json();

        if (data.success && data.data) {
          setProperty(data.data);
        } else {
          setError(data.message || "Property not found");
        }
      } catch (err) {
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-copper" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold text-ink">Property Not Found</h1>
        <p className="text-muted-foreground">{error}</p>
        <button onClick={onBack} className="mt-4 flex items-center gap-2 text-ink hover:underline">
          <ArrowLeft size={16} /> Back to Properties
        </button>
      </div>
    );
  }

  const isLive = property.status === "published" || property.status === "LIVE";
  const images =
    property.images?.length > 0 ? property.images : [property.thumbnail].filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 pb-10">
      {/* Top Header */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors mb-4 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Properties
        </button>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-ink leading-tight">
                {property.title}
              </h1>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  isLive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-muted-foreground"
                }`}
              >
                {isLive ? "● Live" : "○ Draft"}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-ink/75 font-medium text-[0.95rem]">
              <span className="flex items-center gap-1.5 cursor-pointer hover:text-ink transition-colors">
                <MapPin size={16} className="text-copper" />
                {property.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <div className="mb-10">
        {images.length > 1 ? (
          <>
            {/* Mobile View: Main Image + Thumbnails */}
            <div className="md:hidden flex flex-col gap-3">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={images[activeImage]?.url || images[activeImage]}
                  alt={`Property Image ${activeImage + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  key={activeImage}
                />
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold shadow-soft flex items-center gap-2 border border-border z-10">
                  {activeImage + 1} / {images.length}
                </div>
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
                      src={img?.url || img}
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
                        src={img?.url || img}
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
          </>
        ) : (
          <div className="relative aspect-video md:aspect-21/9 w-full rounded-2xl overflow-hidden shadow-sm bg-sand">
            {images[0] && (
              <img
                src={images[0]?.url || images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        {/* Left Column - Content */}
        <div className="pb-10">
          {/* Host / Key Info */}
          <div className="flex items-center justify-between pb-8 border-b border-border">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Admin Preview</h2>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2 text-[0.95rem] text-ink/75">
                <span>{property.guests} guests</span>
                <span>·</span>
                <span>{property.beds} bedrooms</span>
                <span>·</span>
                <span>{property.baths} baths</span>
                {property.sizeSqm && (
                  <>
                    <span>·</span>
                    <span>{property.sizeSqm} sqm</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Highlights */}
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
              <Shield className="text-ink mt-0.5" size={26} strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-lg">Professionally managed</h3>
                <p className="text-muted-foreground text-[0.95rem] mt-0.5">
                  Listed and coordinated securely through your dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="py-8 border-b border-border">
            <div className="space-y-4 text-[0.95rem] text-ink/80 leading-relaxed whitespace-pre-wrap">
              {property.description || "No description provided."}
            </div>
          </div>

          {/* Amenities */}
          <div className="pt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6">What this place offers</h2>
            {property.amenities && property.amenities.length > 0 ? (
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {property.amenities.map((key) => {
                  const item = AMENITIES_MAP[key];
                  const Icon = item?.icon || ChevronRight;
                  return (
                    <div key={key} className="flex items-center gap-4 text-ink/85">
                      <Icon size={24} strokeWidth={1.5} className="flex-none" />
                      <span className="text-[0.95rem]">{item?.label || key}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No amenities listed.</p>
            )}
          </div>
        </div>

        {/* Right Column — Sticky Info Widget */}
        <div>
          <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] border border-border">
            <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
              <div>
                <span className="text-2xl font-bold text-ink">
                  ${property.pricePerNight || property.price}
                </span>
                <span className="text-muted-foreground ml-1">AUD / night</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Users size={16} /> Max Guests
                </span>
                <span className="font-medium">{property.guests}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <BedDouble size={16} /> Bedrooms
                </span>
                <span className="font-medium">{property.beds}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Bath size={16} /> Bathrooms
                </span>
                <span className="font-medium">{property.baths}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Inbox size={16} /> Inquiries
                </span>
                <span className="font-medium">{property.stayInquiryCount || 0}</span>
              </div>
            </div>

            <div className="rounded-xl bg-sand p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                System Metadata
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created At</span>
                  <span className="text-right text-ink/80 font-medium">
                    {new Date(property.createdAt || Date.now()).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated At</span>
                  <span className="text-right text-ink/80 font-medium">
                    {new Date(
                      property.updatedAt || property.createdAt || Date.now(),
                    ).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-4 bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Shield size={20} className="text-emerald-600" />
                </div>
                <p className="text-sm font-medium leading-snug">
                  This property is securely managed in your admin dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              src={images[activeImage]?.url || images[activeImage]}
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
  );
}
