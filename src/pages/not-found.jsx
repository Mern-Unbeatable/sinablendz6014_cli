import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout, Section } from "@/components/site/Layout";
import { FadeIn } from "@/components/animations";

export default function NotFoundPage() {
  return (
    <Layout>
      <Section className="flex min-h-[70vh] items-center justify-center bg-sand-soft">
        <div className="container-luxe">
          <FadeIn>
            <div className="mx-auto max-w-md text-center">
              <div className="font-display text-8xl italic text-copper">404</div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight">Page Not Found</h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
              </p>
              <Link to="/" className="btn-primary mt-8">
                <ArrowLeft size={18} /> Go Home
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>
    </Layout>
  );
}
