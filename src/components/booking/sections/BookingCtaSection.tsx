"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { StarButton } from '@/components/ui/star-button';
import { usePathname } from 'next/navigation';

const BookingCtaSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('booking');
  const { t: tHero } = useClientTranslation('bookingHero');
  const pathname = usePathname();
  const mounted = isHydrated && isReady;

  const getLangFromPath = (): string => {
    const segments = pathname?.split('/') || [];
    for (const seg of segments) {
      if (['sr', 'en', 'de'].includes(seg)) return seg;
    }
    return 'de';
  };

  const currentLang = getLangFromPath();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'booking',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const labels: Record<string, Record<string, string>> = {
    de: {
      title: 'Bereit für Ihr Buchungssystem?',
      subtitle: 'Lassen Sie uns gemeinsam Ihre perfekte Buchungslösung entwickeln. Kostenlose Erstberatung!',
      name: 'Ihr Name',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer (optional)',
      message: 'Erzählen Sie uns von Ihrem Projekt',
      send: 'Nachricht senden',
      sending: 'Wird gesendet...',
      success: 'Vielen Dank! Wir melden uns innerhalb von 24 Stunden.',
      error: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
    },
    en: {
      title: 'Ready for Your Booking System?',
      subtitle: 'Let us develop your perfect booking solution together. Free initial consultation!',
      name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone Number (optional)',
      message: 'Tell us about your project',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Thank you! We will get back to you within 24 hours.',
      error: 'Error sending. Please try again.',
    },
    sr: {
      title: 'Spremni za vaš booking sistem?',
      subtitle: 'Razvijmo zajedno vaše savršeno booking rješenje. Besplatna početna konsultacija!',
      name: 'Vaše ime',
      email: 'Email adresa',
      phone: 'Telefon (opcionalno)',
      message: 'Recite nam o vašem projektu',
      send: 'Pošalji poruku',
      sending: 'Šalje se...',
      success: 'Hvala! Javit ćemo vam se u roku od 24 sata.',
      error: 'Greška pri slanju. Pokušajte ponovo.',
    },
  };

  const l = labels[currentLang] || labels.de;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `[Booking Inquiry]\n\n${formData.message}`,
        }),
      });

      if (res.ok) {
        setSent(true);
        setFormData({ name: '', email: '', phone: '', message: '', interest: 'booking' });
      } else {
        setError(l.error);
      }
    } catch {
      setError(l.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-nextpixel-dark to-nextpixel-blue">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {l.title}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {l.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {sent ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">&#10003;</div>
              <p className="text-xl text-nextpixel-dark font-medium">{l.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="booking-name" className="block text-sm font-medium text-gray-700 mb-1">
                    {l.name} *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nextpixel-blue focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 mb-1">
                    {l.email} *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nextpixel-blue focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {l.phone}
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nextpixel-blue focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="booking-message" className="block text-sm font-medium text-gray-700 mb-1">
                  {l.message} *
                </label>
                <textarea
                  id="booking-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nextpixel-blue focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="text-center">
                <StarButton type="submit" disabled={sending}>
                  {sending ? l.sending : l.send}
                </StarButton>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCtaSection;
