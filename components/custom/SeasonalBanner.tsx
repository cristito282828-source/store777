'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
  {
    id: '1',
    bg: 'bg-gradient-to-br from-[#0A0A0A] to-[#1e5a2a]',
    accent: 'text-[#00E5D1]',
    title: 'Lorem ipsum dolor sit amet',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    buttonText: 'Ver colección',
    href: '/search',
  },
  {
    id: '2',
    bg: 'bg-gradient-to-br from-[#0A0A0A] via-[#101828] to-[#0A0A0A]',
    accent: 'text-[#D32F2F]',
    title: 'Nulla facilisi etiam dignissim',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    buttonText: 'Explorar ahora',
    href: '/search',
  },
  {
    id: '3',
    bg: 'bg-gradient-to-br from-[#0A0A0A] to-[#009688]',
    accent: 'text-[#00E5D1]',
    title: 'Suspendisse potenti in faucibus',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    buttonText: 'Ver más',
    href: '/search',
  },
];

export default function SeasonalBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: true,
    dotsClass: 'slick-dots seasonal-dots',
  };

  return (
    <section id="seasonal" className="relative text-white">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`relative h-[70vh] min-h-[520px] overflow-hidden ${slide.bg}`}
          >
            <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
              <div className="max-w-3xl">
                <p className={`text-sm uppercase tracking-[0.35em] ${slide.accent} mb-4`}>
                  Lo último en tendencias
                </p>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                  {slide.title}
                </h2>
                <p className="mx-auto max-w-2xl text-lg leading-8 text-white/85 mb-8">
                  {slide.description}
                </p>
                <a
                  href={slide.href}
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-colors duration-300 hover:bg-gray-100"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .seasonal-dots {
          position: absolute;
          bottom: 1.5rem;
          left: 0;
          right: 0;
          display: flex !important;
          justify-content: center;
          gap: 0.75rem;
          margin: 0;
          padding: 0;
          z-index: 20;
        }
        .seasonal-dots li {
          margin: 0;
        }
        .seasonal-dots li button {
          width: 3rem;
          height: 0.375rem;
          padding: 0;
          background: rgba(255, 255, 255, 0.35);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .seasonal-dots li.slick-active button {
          width: 5rem;
          background: #ffffff;
        }
        .seasonal-dots li button:before {
          display: none;
        }
        .slick-prev:before,
        .slick-next:before {
          color: white !important;
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
}
