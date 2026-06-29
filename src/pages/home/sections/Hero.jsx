import { useState } from "react";
import hero from "@/assets/hero-apartment.jpg";
import { FadeIn } from "@/components/animations";
import { ArrowRight, HomeIcon, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import dining from "@/assets/dining.jpg";
import skyline from "@/assets/skyline.jpg";
import kitchen from "@/assets/kitchen.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { addInquiry } from "@/lib/store";
import { toast } from "sonner";

function Hero() {
  const [tab, setTab] = useState("home");
  const [isSwitching, setIsSwitching] = useState(false);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const handleTabChange = (newTab) => {
    if (tab === newTab || isSwitching) return;
    setTab(newTab);
    setIsSwitching(true);
    setTimeout(() => {
      setIsSwitching(false);
    }, 500);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setIsSubmitting(true);

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || "https://api-sinablendz6014.maktechgroup.tech";
      
      if (tab === "home") {
        const payload = {
          name: String(fd.get("name") || ""),
          propertyAddress: String(fd.get("address") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
        };

        const res = await fetch(`${baseUrl}/api/inquiries/homeowner`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to submit homeowner inquiry");
      } else {
        const payload = {
          name: String(fd.get("name") || ""),
          lookingFor: String(fd.get("message") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          checkIn: String(fd.get("checkIn") || ""),
        };

        const checkOutValue = fd.get("checkOut");
        if (checkOutValue) {
          payload.checkOut = String(checkOutValue);
        }

        const res = await fetch(`${baseUrl}/api/inquiries/guest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to submit guest inquiry");
      }

      // Keep local store update if still needed by the app
      addInquiry({
        type: tab === "home" ? "homeowner" : "guest",
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        phone: String(fd.get("phone") || ""),
        address: tab === "home" ? String(fd.get("address") || "") : undefined,
        message: tab === "guest" ? String(fd.get("message") || "") : undefined,
        checkIn: tab === "guest" ? String(fd.get("checkIn") || "") : undefined,
        checkOut: tab === "guest" ? String(fd.get("checkOut") || "") : undefined,
      });

      setSent(true);
      toast.success("Inquiry received! Our team will contact you shortly.");
      form.reset();
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-ink min-h-[95vh] flex flex-col justify-center">
      <img
        src={hero}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/40 to-sand" />

      <div className="container-luxe hero-inner relative w-full">
        <div className="grid items-center gap-8 xl:grid-cols-[1.1fr_1fr] xl:gap-12">
          {/* Left content */}
          <div>
            <FadeIn>
              <span className="eyebrow text-copper-soft! text-sm!">Welcome to Aurora Suites</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl leading-[1.1]">
                Curated Short-Stay{" "}
                <span className="italic-script text-copper-soft! block mt-1 text-5xl md:text-7xl tracking-normal">
                  Properties in Melbourne.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-lg text-lg text-sand-soft/75 leading-relaxed">
                We partner with homeowners, showcase premium properties, and connect guests with the
                right stay — with every inquiry handled personally by our team.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-4">
                <Link to="/properties" className="btn-primary py-2.5">
                  Browse Properties <ArrowRight className="size-4 md:size-[18px]" />
                </Link>
                <Link to="/contact" className="btn-outline">
                  List Your Property
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right image grid */}
          <FadeIn delay={0.3} direction="left" className="hidden xl:block">
            <div className="grid grid-cols-2 gap-3">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                src={dining}
                alt="Dining"
                className="aspect-3/4 w-full rounded-2xl object-cover shadow-luxe"
              />
              <div className="space-y-3 pt-8">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  src={kitchen}
                  alt="Kitchen"
                  className="aspect-square w-full rounded-2xl object-cover shadow-luxe"
                />
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  src={skyline}
                  alt="Skyline"
                  className="aspect-4/3 w-full rounded-2xl object-cover shadow-luxe"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Estimation form */}
        <FadeIn delay={0.4}>
          <div className="mt-8 lg:mt-12 rounded-2xl bg-white/95 p-2 shadow-luxe backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-1 rounded-xl">
              <button
                onClick={() => handleTabChange("home")}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base font-semibold transition cursor-pointer ${
                  tab === "home"
                    ? "bg-sand text-ink shadow-soft"
                    : "text-muted-foreground hover:text-ink"
                }`}
              >
                <HomeIcon size={18} className="text-copper shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="hidden sm:inline">I am a </span>
                  <span className="capitalize sm:normal-case">homeowner</span>
                </span>
              </button>
              <button
                onClick={() => handleTabChange("guest")}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base font-semibold transition cursor-pointer ${
                  tab === "guest"
                    ? "bg-sand text-ink shadow-soft"
                    : "text-muted-foreground hover:text-ink"
                }`}
              >
                <KeyRound size={18} className="text-copper shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="hidden sm:inline">I am a </span>
                  <span className="capitalize sm:normal-case">guest</span>
                </span>
              </button>
            </div>
            <motion.div layout className="mt-2 rounded-xl bg-sand p-6 overflow-hidden">
              <AnimatePresence mode="wait">
                {isSwitching ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="h-6 w-3/4 max-w-sm bg-black/5 rounded-md animate-pulse mb-5" />
                    <div
                      className={`grid gap-3 sm:grid-cols-2 ${
                        tab === "home"
                          ? "lg:grid-cols-4 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]"
                          : "max-w-3xl mx-auto w-full"
                      }`}
                    >
                      <div className="h-[52px] bg-black/5 rounded-xl animate-pulse" />
                      <div className="h-[52px] bg-black/5 rounded-xl animate-pulse" />
                      <div className="h-[52px] bg-black/5 rounded-xl animate-pulse" />
                      <div className="h-[52px] bg-black/5 rounded-xl animate-pulse" />
                      {tab === "guest" && (
                        <>
                          <div className="h-[52px] bg-black/5 rounded-xl animate-pulse" />
                          <div className="h-[52px] bg-black/5 rounded-xl animate-pulse" />
                        </>
                      )}
                      <div
                        className={`h-[52px] bg-black/10 rounded-xl animate-pulse ${
                          tab === "home"
                            ? "sm:col-span-2 lg:col-span-4 xl:col-span-1"
                            : "sm:col-span-2"
                        }`}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mb-5 text-base text-muted-foreground text-center">
                      {tab === "home" ? (
                        <>
                          <span className="italic-script text-lg!">
                            Own a property in Melbourne?
                          </span>{" "}
                          Tell us about your home and our team will reach out to discuss listing it
                          with Aurora Suites.
                        </>
                      ) : (
                        <>
                          <span className="italic-script text-lg!">Looking for a short stay?</span>{" "}
                          Share your details and we&rsquo;ll help you find the right property.
                        </>
                      )}
                    </p>
                    <form
                      className={`grid gap-3 sm:grid-cols-2 ${
                        tab === "home"
                          ? "lg:grid-cols-4 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]"
                          : "max-w-3xl mx-auto w-full"
                      }`}
                      onSubmit={handleInquirySubmit}
                    >
                      <input
                        name="name"
                        required
                        className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                        placeholder="Full Name"
                      />

                      {tab === "home" ? (
                        <input
                          key="address-input"
                          name="address"
                          required
                          className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                          placeholder="Property Address"
                        />
                      ) : (
                        <input
                          key="message-input"
                          name="message"
                          className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                          placeholder="What are you looking for?"
                        />
                      )}

                      <input
                        name="email"
                        type="email"
                        required
                        className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                        placeholder="Email Address"
                      />
                      <input
                        name="phone"
                        type="tel"
                        required
                        className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                        placeholder="Phone Number"
                      />

                      {tab === "guest" && (
                        <>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none uppercase tracking-wider font-semibold">
                              In
                            </span>
                            <input
                              name="checkIn"
                              type="date"
                              min={todayStr}
                              value={checkInDate}
                              onChange={(e) => setCheckInDate(e.target.value)}
                              className="w-full rounded-xl border border-border bg-white pl-11 pr-4 py-3.5 text-base focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 text-ink"
                              required
                            />
                          </div>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none uppercase tracking-wider font-semibold">
                              Out
                            </span>
                            <input
                              name="checkOut"
                              type="date"
                              min={checkInDate || todayStr}
                              className="w-full rounded-xl border border-border bg-white pl-12 pr-4 py-3.5 text-base focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 text-ink"
                            />
                          </div>
                        </>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn-primary whitespace-nowrap cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                          tab === "home"
                            ? "sm:col-span-2 lg:col-span-4 xl:col-span-1"
                            : "sm:col-span-2"
                        }`}
                      >
                        {isSubmitting
                          ? "Sending..."
                          : sent
                            ? "Inquiry Sent ✓"
                            : tab === "home"
                              ? "List My Property"
                              : "Send Inquiry"}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Hero;
