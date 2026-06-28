import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/animations";
import { reviews } from "../home";

function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="section-pad bg-sand">
      <div className="container-luxe">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Testimonials</span>
            <h2 className="mt-4 tracking-tight">
              What Our Property Owners <span className="italic-script">Say</span>
            </h2>
          </div>
        </FadeIn>

        <div className="section-gap grid gap-6 md:grid-cols-3">
          {visible.map((r, i) => (
            <ScaleIn key={r.name + page} delay={i * 0.1}>
              <article className="rounded-2xl bg-white p-7 shadow-soft h-full flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-copper/20 text-base font-bold text-copper">
                    {r.name[0]}
                  </span>
                  <div>
                    <p className="text-base font-semibold">{r.name}</p>
                    <div className="flex gap-0.5 text-copper">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                  &ldquo;{r.text}&rdquo;
                </p>
              </article>
            </ScaleIn>
          ))}
        </div>

        {totalPages > 1 && (
          <FadeIn delay={0.2}>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink/60 transition hover:border-copper hover:text-copper disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    page === i ? "w-8 bg-copper" : "w-2.5 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink/60 transition hover:border-copper hover:text-copper disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
export default Testimonials;
