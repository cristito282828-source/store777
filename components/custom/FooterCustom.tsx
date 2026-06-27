'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { newsletterSchema } from '@/lib/validations/forms';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación con Zod
    const result = newsletterSchema.safeParse({ email });

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || 'Error de validación';
      toast.error(errorMessage);
      return;
    }

    setIsSubmitting(true);

    // TODO: Integrar con servicio de email marketing
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('¡Gracias por suscribirte!');
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 flex-none">
                <Image
                  src="/logo-777.jpeg"
                  alt="Store 777"
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="text-2xl font-black tracking-wider uppercase">
                <span className="text-[#00E5D1]">STORE</span>
                <span className="text-white"> 777</span>
              </div>
            </div>
            <p className="text-[#FAFAFA]/70 mb-6 leading-relaxed">
              Calzado y streetwear con actitud. Estilo único para skaters y coleccionistas.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/store777"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAFA]/60 hover:text-[#D32F2F] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/store777"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAFA]/60 hover:text-[#00E5D1] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Menú Inferior */}
          <div>
            <h4 className="text-lg mb-6 font-bold uppercase tracking-wider text-[#FAFAFA]">Menú inferior</h4>
            <ul className="space-y-3">
              <li><Link href="/search" className="text-[#FAFAFA]/60 hover:text-[#00E5D1] transition-colors duration-200">Búsqueda</Link></li>
              <li><Link href="/terminos-del-servicio" className="text-[#FAFAFA]/60 hover:text-[#00E5D1] transition-colors duration-200">Términos del servicio</Link></li>
              <li><Link href="/search" className="text-[#FAFAFA]/60 hover:text-[#00E5D1] transition-colors duration-200">Catálogo</Link></li>
            </ul>
          </div>

          {/* Nuestras Políticas */}
          <div>
            <h4 className="text-lg mb-6 font-bold uppercase tracking-wider text-[#FAFAFA]">Nuestras Políticas</h4>
            <ul className="space-y-3">
              <li><Link href="/politica-proteccion-datos" className="text-[#FAFAFA]/60 hover:text-[#00E5D1] transition-colors duration-200">Política de protección de datos</Link></li>
              <li><Link href="/politica-reembolso" className="text-[#FAFAFA]/60 hover:text-[#00E5D1] transition-colors duration-200">Política de Reembolso</Link></li>
              <li><Link href="/politica-envios" className="text-[#FAFAFA]/60 hover:text-[#00E5D1] transition-colors duration-200">Política de Envíos</Link></li>
              <li><Link href="/terminos-y-condiciones" className="text-[#FAFAFA]/60 hover:text-[#00E5D1] transition-colors duration-200">Términos y Condiciones</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-6 font-bold uppercase tracking-wider text-[#FAFAFA]">Contacto</h4>
            <p className="text-[#FAFAFA]/60 mb-6">
              ¿Consultas? Escribinos por WhatsApp y te respondemos a la brevedad.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/573232182386?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-[#25D366] hover:bg-[#1ebe5b] transition-colors mb-6"
            >
              <Phone className="h-5 w-5 text-white" />
              <span className="font-bold text-white">+57 323 218 2386</span>
            </a>

            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <p className="text-[#FAFAFA]/60 text-sm mb-2">Suscribite al newsletter:</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Su e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-[#101828] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5D1] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#00E5D1] text-black font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '...' : 'Suscribir'}
                </button>
              </div>
            </form>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-[#FAFAFA]/60 flex-shrink-0" />
              <a
                href="mailto:hello@example.com"
                className="text-[#FAFAFA]/60 hover:text-[#00E5D1] transition-colors duration-200"
              >
                hello@example.com
              </a>
            </div>
          </div>
        </div>

        <hr className="border-[#FAFAFA]/10 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-[#FAFAFA]/40 text-sm">
              © {new Date().getFullYear()} STORE 777. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <span className="text-[#FAFAFA]/40 text-sm">Argentina 🇦🇷</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}