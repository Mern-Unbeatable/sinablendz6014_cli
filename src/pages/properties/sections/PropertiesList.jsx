import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bath, BedDouble, Users, MapPin, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";


function getPaginationRange(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }
  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export default function PropertiesList() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const res = await fetch(`${baseUrl}/api/properties?page=${currentPage}&limit=${itemsPerPage}`);
        const result = await res.json();
        
        if (result.success && result.data) {
          setItems(result.data);
          setTotalPages(
            result.totalPages || 
            result.pagination?.totalPages || 
            (result.total ? Math.ceil(result.total / itemsPerPage) : 1)
          );
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [currentPage]);
  return (
    <Section className="bg-sand">
      <div className="container-luxe">
        <FadeIn>
          <SectionHeader
            eyebrow="Showcase"
            title="A curated portfolio across"
            script="Melbourne"
            description="Every property in our portfolio is professionally photographed and listed for guests to browse. Click any listing to view details and submit a stay inquiry."
          />
        </FadeIn>

        {loading ? (
          <div className="flex justify-center items-center section-gap py-20">
            <Loader2 className="animate-spin text-copper" size={48} />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 section-gap py-10">
            Failed to load properties.
          </div>
        ) : (
        <StaggerContainer
          className="section-gap grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {items.map((p) => (
            <StaggerItem key={p.slug || p.title}>
              <Link to={`/properties/${p.slug}`}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-2xl bg-ink text-sand-soft shadow-soft transition-shadow hover:shadow-luxe"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-4 py-1.5 text-sm tracking-widest text-sand-soft backdrop-blur-sm font-medium">
                      <MapPin size={13} className="text-copper" />
                      {p.location}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-sand-soft/60">
                      <span className="flex items-center gap-1.5">
                        <Users size={14} className="text-copper" /> {p.guests} Guests
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BedDouble size={14} className="text-copper" /> {p.beds} Bed
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bath size={14} className="text-copper" /> {p.baths} Bath
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-sm text-copper font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      View Details <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
        )}

        {totalPages > 1 && !loading && !error && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-5 py-2.5 rounded-full border-2 border-ink text-ink font-semibold text-sm transition-all hover:bg-ink hover:text-sand-soft disabled:opacity-50 disabled:pointer-events-none"
            >
              Previous
            </button>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              {getPaginationRange(currentPage, totalPages).map((pageNumber, i) => (
                pageNumber === "..." ? (
                  <span key={`dots-${i}`} className="px-2 text-ink/70">...</span>
                ) : (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`min-w-[40px] h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      currentPage === pageNumber
                        ? "bg-ink text-sand-soft"
                        : "text-ink hover:bg-ink/10"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              ))}
            </div>
            <div className="sm:hidden text-sm font-medium text-ink/70">
              Page {currentPage} of {totalPages}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-5 py-2.5 rounded-full border-2 border-ink text-ink font-semibold text-sm transition-all hover:bg-ink hover:text-sand-soft disabled:opacity-50 disabled:pointer-events-none"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
