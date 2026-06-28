import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

function Trusted() {
  const logos = [
    "OXFORD",
    "Belle",
    "RESORT GLOBAL",
    "CONQUEST",
    "RayWhite",
    "FORGE",
    "Elite",
    "DPM",
    "TMG",
  ];
  return (
    <section className="section-pad bg-sand">
      <div className="container-luxe">
        <FadeIn>
          <p className="text-center text-sm tracking-[0.3em] text-muted-foreground font-medium">
            — TRUSTED BY SOME OF THE BIGGEST NAMES IN REAL ESTATE —
          </p>
        </FadeIn>
        <StaggerContainer className="section-gap flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
          {logos.map((l) => (
            <StaggerItem key={l}>
              <span className="font-display text-2xl tracking-widest text-ink/60 hover:text-ink transition-colors cursor-default">
                {l}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
export default Trusted;
