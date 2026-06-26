'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
  {
    id: '1',
    src: '/banner-forza-cali (1).png',
    alt: 'Banner Forza Cali',
  },
  {
    id: '2',
    src: '/banner-forza.png',
    alt: 'Banner Forza',
  },
  {
    id: '3',
    src: '/banner-forza3.png',
    alt: 'Banner Forza 3',
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
          <div key={slide.id} className="relative h-[70vh] min-h-[520px] overflow-hidden">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={slide.id === '1'}
            />
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
