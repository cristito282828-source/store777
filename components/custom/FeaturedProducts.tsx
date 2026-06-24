'use client';

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  category: string;
  categorySlug: string;
  imageSrc: string;
  description: string;
}

interface FeaturedCategory {
  name: string;
  slug: string;
}

interface FeaturedProductsProps {
  products: FeaturedProduct[];
  categories?: FeaturedCategory[];
  title?: string;
}

// Función para limpiar precio HTML
function formatPrice(price: string | undefined): string {
  if (!price) return 'Precio no disponible';

  const clean = price
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");

  return clean.trim();
}

export default function FeaturedProducts({ products, categories = [] }: FeaturedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Calcular cuántas cards se ven a la vez según el viewport
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(getVisibleCards());
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Detectar posición del scroll
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cards = Array.from(container.children) as HTMLElement[];

    if (cards.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    const normalizedIndex = closestIndex % products.length;
    setActiveIndex(normalizedIndex);

    if (closestIndex >= products.length && !container.dataset.isLooping) {
      container.dataset.isLooping = 'true';
      setTimeout(() => {
        const targetCard = cards[normalizedIndex];
        if (targetCard) {
          const scrollAmount = targetCard.getBoundingClientRect().left - containerRect.left + container.scrollLeft;
          container.style.scrollBehavior = 'auto';
          container.scrollLeft = scrollAmount;
          container.style.scrollBehavior = 'smooth';
        }
        delete container.dataset.isLooping;
      }, 100);
    }
  }, [products.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Navegar a un producto específico
  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = Array.from(container.children) as HTMLElement[];

    if (cards[index]) {
      const card = cards[index];
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const scrollAmount = cardRect.left - containerRect.left + container.scrollLeft;

      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Calcular páginas
  const totalPages = Math.ceil(products.length / visibleCards);
  const activePage = Math.floor(activeIndex / visibleCards);

  // Navegar a una página específica
  const scrollToPage = (pageIndex: number) => {
    const cardIndex = pageIndex * visibleCards;
    scrollToCard(Math.min(cardIndex, products.length - 1));
  };

  // Navegación infinita
  const scrollPrev = () => {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) {
      newIndex = products.length - 1;
    }
    scrollToCard(newIndex);
  };

  const scrollNext = () => {
    let newIndex = activeIndex + 1;
    if (newIndex >= products.length) {
      newIndex = 0;
    }
    scrollToCard(newIndex);
  };

  // Early return después de todos los hooks
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-[#0A0A0A] via-[#101828] to-[#0A0A0A] py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-6 items-center">

          {/* Slider con flechas - Izquierda */}
          <div className="lg:col-span-9 order-2 lg:order-1">
            <div className="relative flex items-center">

              {/* Botón izquierdo */}
              <button
                onClick={scrollPrev}
                className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center bg-[#00E5D1] rounded-full shadow-md shadow-[#00E5D1]/40 transition-all duration-300 hover:scale-110 hover:bg-white mr-3 z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5 text-black" />
              </button>

              {/* Scroll Container */}
              <div
                ref={scrollContainerRef}
                className="scroll-container flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar flex-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {[...products, ...products].map((product, index) => (
                  <div
                    key={`${product.slug}-${index}`}
                    className="snap-start shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                  >
                    <a
                      href={`/product/${product.slug}`}
                      className="group block"
                    >
                      {/* Card con fondo blanco - formato vertical tipo Instagram */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white rounded-sm">
                        <Image
                          src={product.imageSrc}
                          alt={`${product.name} - ${product.category}`}
                          fill
                          className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      {/* Nombre y precio debajo */}
                      <div className="mt-3 text-white">
                        <h3 className="font-moderat text-sm sm:text-base font-normal">
                          {product.name}
                        </h3>
                        <p className="font-moderat text-sm sm:text-base mt-1">
                          {product.price}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Botón derecho */}
              <button
                onClick={scrollNext}
                className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center bg-[#00E5D1] rounded-full shadow-md shadow-[#00E5D1]/40 transition-all duration-300 hover:scale-110 hover:bg-white ml-3 z-10"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5 text-black" />
              </button>

            </div>

            {/* Dots de navegación */}
            <div className="flex justify-center items-center gap-1 mt-6">
              {Array.from({ length: totalPages }).map((_, pageIndex) => {
                const isActive = activePage === pageIndex;
                return (
                  <button
                    key={pageIndex}
                    onClick={() => scrollToPage(pageIndex)}
                    className="flex items-center justify-center p-0 border-none bg-transparent cursor-pointer"
                    aria-label={`Ir a página ${pageIndex + 1}`}
                  >
                    <div
                      className={`h-0.5 transition-all duration-300 ${isActive ? 'w-8 bg-white' : 'w-4 bg-white/50'}`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Indicador de swipe solo en mobile */}
            <div className="block sm:hidden text-center mt-4 text-white/60 text-xs animate-pulse">
              ← Desliza para ver más →
            </div>
          </div>

          {/* Categorías - Derecha */}
          <div className="lg:col-span-3 order-1 lg:order-2 flex flex-col justify-center items-center lg:items-start h-full">
            <h2 className="font-moderat text-2xl md:text-3xl font-extrabold tracking-tight text-[#FAFAFA] uppercase mb-4 text-center lg:text-left">
              Categorías
            </h2>
            <p className="font-moderat text-sm leading-relaxed text-[#FAFAFA]/70 text-center lg:text-left mb-6">
              Explorá nuestro catálogo por marca.
            </p>
            <div className="flex flex-col gap-2 w-full">
              {categories.length > 0 ? (
                categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/tienda/categoria/${cat.slug}`}
                    className="group flex items-center justify-between w-full px-4 py-3 bg-[#101828] border border-[#00E5D1]/30 hover:border-[#00E5D1] hover:bg-[#00E5D1]/10 transition-all duration-300"
                  >
                    <span className="font-moderat text-sm font-bold uppercase tracking-[0.1em] text-[#FAFAFA] group-hover:text-[#00E5D1] transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-[#00E5D1] text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                ))
              ) : (
                <Link
                  href="/tienda/categoria"
                  className="inline-flex items-center justify-center font-moderat bg-[#D32F2F] text-white text-sm tracking-[0.15em] uppercase font-medium px-8 py-3 hover:bg-[#8B0000] transition-all duration-300"
                >
                  Ver Todas las Categorías
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -webkit-overflow-scrolling: touch;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-container {
            scroll-behavior: auto !important;
          }

          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

        @media (max-width: 640px) {
          .scroll-container {
            scroll-padding: 0;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
}
