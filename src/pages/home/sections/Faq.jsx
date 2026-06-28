import { useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import skyline from "@/assets/skyline.jpg";
import { faqs } from "../home";

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative isolate overflow-hidden bg-ink section-pad text-sand-soft">
      <img
        src={skyline}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-12"
      />
      <div className="absolute inset-0 bg-ink/90" />
      <div className="container-luxe relative max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center">
            <span className="eyebrow text-copper-soft!">FAQ</span>
            <h2 className="mt-4 text-white tracking-tight">
              Frequently Asked <span className="italic-script text-copper-soft!">Questions</span>
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="section-gap space-y-3" staggerDelay={0.06}>
          {faqs.map((f, i) => (
            <StaggerItem key={f.q}>
              <motion.div layout className="overflow-hidden rounded-xl bg-sand-soft text-ink">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold transition-colors hover:text-copper"
                >
                  {f.q}
                  <span className="text-copper flex-none">
                    {open === i ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-base text-muted-foreground leading-relaxed">
                    {f.a}
                  </div>
                </motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
export default Faq;
