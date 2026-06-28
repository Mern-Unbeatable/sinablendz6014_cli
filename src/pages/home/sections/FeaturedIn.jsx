import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

function FeaturedIn() {
  const areas = [
    "Southbank",
    "Carlton",
    "St Kilda",
    "Richmond",
    "Docklands",
    "South Yarra",
    "Melbourne CBD",
  ];
  return (
    <section className="section-pad bg-sand-soft">
      <div className="container-luxe">
        <FadeIn>
          <p className="text-center text-sm tracking-[0.3em] text-muted-foreground font-medium">
            — PROPERTIES ACROSS MELBOURNE —
          </p>
        </FadeIn>
        <StaggerContainer className="section-gap flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-ink/55">
          {areas.map((l) => (
            <StaggerItem key={l}>
              <span className="font-display text-xl tracking-wide hover:text-ink transition-colors cursor-default">
                {l}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
export default FeaturedIn;
