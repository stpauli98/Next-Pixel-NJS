"use client";

import React, { useState, useEffect } from 'react';
import { useTranslate } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TermsPage: React.FC = () => {
  const { t } = useTranslate();
  const [mounted, setMounted] = useState(false);

  // Rešava problem hidratacije
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-nextpixel-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {!mounted ? 'Terms of Service' : 
              (typeof t('legal:terms.title') === 'string' ? t('legal:terms.title') as string : 'Terms of Service')
            }
          </h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '1. Acceptance of Terms' : 
                  (typeof t('legal:terms.acceptance.title') === 'string' ? t('legal:terms.acceptance.title') as string : '1. Acceptance of Terms')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.' : 
                  (typeof t('legal:terms.acceptance.content') === 'string' ? t('legal:terms.acceptance.content') as string : 'By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '2. Description of Services' : 
                  (typeof t('legal:terms.services.title') === 'string' ? t('legal:terms.services.title') as string : '2. Description of Services')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'NextPixel provides web design, development, e-commerce solutions, SEO optimization, and other digital services as described on our website. We reserve the right to modify, suspend, or discontinue any part of our services at any time.' : 
                  (typeof t('legal:terms.services.content') === 'string' ? t('legal:terms.services.content') as string : 'NextPixel provides web design, development, e-commerce solutions, SEO optimization, and other digital services as described on our website. We reserve the right to modify, suspend, or discontinue any part of our services at any time.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '3. Intellectual Property Rights' : 
                  (typeof t('legal:terms.intellectual.title') === 'string' ? t('legal:terms.intellectual.title') as string : '3. Intellectual Property Rights')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'All content, designs, code, and materials created by NextPixel are protected by intellectual property laws. Upon full payment, clients receive a license to use the deliverables as specified in their service agreement.' : 
                  (typeof t('legal:terms.intellectual.content') === 'string' ? t('legal:terms.intellectual.content') as string : 'All content, designs, code, and materials created by NextPixel are protected by intellectual property laws. Upon full payment, clients receive a license to use the deliverables as specified in their service agreement.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '4. Payment Terms' : 
                  (typeof t('legal:terms.payment.title') === 'string' ? t('legal:terms.payment.title') as string : '4. Payment Terms')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'Payment terms are specified in individual service agreements. Invoices are due upon receipt unless otherwise stated. We reserve the right to suspend services for non-payment.' : 
                  (typeof t('legal:terms.payment.content') === 'string' ? t('legal:terms.payment.content') as string : 'Payment terms are specified in individual service agreements. Invoices are due upon receipt unless otherwise stated. We reserve the right to suspend services for non-payment.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '5. Limitation of Liability' : 
                  (typeof t('legal:terms.liability.title') === 'string' ? t('legal:terms.liability.title') as string : '5. Limitation of Liability')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'NextPixel shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.' : 
                  (typeof t('legal:terms.liability.content') === 'string' ? t('legal:terms.liability.content') as string : 'NextPixel shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '6. Governing Law' : 
                  (typeof t('legal:terms.law.title') === 'string' ? t('legal:terms.law.title') as string : '6. Governing Law')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'These Terms shall be governed by and construed in accordance with the laws of Bosnia and Herzegovina, without regard to its conflict of law provisions.' : 
                  (typeof t('legal:terms.law.content') === 'string' ? t('legal:terms.law.content') as string : 'These Terms shall be governed by and construed in accordance with the laws of Bosnia and Herzegovina, without regard to its conflict of law provisions.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '7. Changes to Terms' : 
                  (typeof t('legal:terms.changes.title') === 'string' ? t('legal:terms.changes.title') as string : '7. Changes to Terms')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We reserve the right to modify these Terms at any time. We will notify clients of any significant changes. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.' : 
                  (typeof t('legal:terms.changes.content') === 'string' ? t('legal:terms.changes.content') as string : 'We reserve the right to modify these Terms at any time. We will notify clients of any significant changes. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.')
                }
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/" className="px-6 py-3 bg-nextpixel-blue text-white font-medium rounded-md hover:bg-nextpixel-blue/90 transition-colors inline-block">
              {!mounted ? 'Back to Home' : 
                (typeof t('common:backToHome') === 'string' ? t('common:backToHome') as string : 'Back to Home')
              }
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
