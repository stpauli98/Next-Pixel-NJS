"use client";

import React, { useState, useEffect } from 'react';
import { useTranslate } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PrivacyPolicy: React.FC = () => {
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
            {!mounted ? 'Privacy Policy' : 
              (typeof t('legal:privacy.title') === 'string' ? t('legal:privacy.title') as string : 'Privacy Policy')
            }
          </h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '1. Information We Collect' : 
                  (typeof t('legal:privacy.collect.title') === 'string' ? t('legal:privacy.collect.title') as string : '1. Information We Collect')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We collect personal information that you voluntarily provide to us when you express interest in obtaining information about our services, when you participate in activities on our website, or otherwise when you contact us. The personal information we collect may include names, email addresses, phone numbers, and other information you choose to provide.' : 
                  (typeof t('legal:privacy.collect.content') === 'string' ? t('legal:privacy.collect.content') as string : 'We collect personal information that you voluntarily provide to us when you express interest in obtaining information about our services, when you participate in activities on our website, or otherwise when you contact us. The personal information we collect may include names, email addresses, phone numbers, and other information you choose to provide.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '2. How We Use Your Information' : 
                  (typeof t('legal:privacy.use.title') === 'string' ? t('legal:privacy.use.title') as string : '2. How We Use Your Information')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We use the information we collect to provide, maintain, and improve our services. This includes using the data to communicate with you, respond to your inquiries, and send you information about our services. We may also use your information to comply with legal obligations and resolve disputes.' : 
                  (typeof t('legal:privacy.use.content') === 'string' ? t('legal:privacy.use.content') as string : 'We use the information we collect to provide, maintain, and improve our services. This includes using the data to communicate with you, respond to your inquiries, and send you information about our services. We may also use your information to comply with legal obligations and resolve disputes.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '3. Information Sharing and Disclosure' : 
                  (typeof t('legal:privacy.sharing.title') === 'string' ? t('legal:privacy.sharing.title') as string : '3. Information Sharing and Disclosure')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We do not share your personal information with third parties except as described in this Privacy Policy. We may share your information with service providers who perform services on our behalf, when required by law, or in connection with a merger, acquisition, or sale of all or a portion of our assets.' : 
                  (typeof t('legal:privacy.sharing.content') === 'string' ? t('legal:privacy.sharing.content') as string : 'We do not share your personal information with third parties except as described in this Privacy Policy. We may share your information with service providers who perform services on our behalf, when required by law, or in connection with a merger, acquisition, or sale of all or a portion of our assets.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '4. Data Security' : 
                  (typeof t('legal:privacy.security.title') === 'string' ? t('legal:privacy.security.title') as string : '4. Data Security')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure.' : 
                  (typeof t('legal:privacy.security.content') === 'string' ? t('legal:privacy.security.content') as string : 'We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '5. Cookies and Tracking Technologies' : 
                  (typeof t('legal:privacy.cookies.title') === 'string' ? t('legal:privacy.cookies.title') as string : '5. Cookies and Tracking Technologies')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We may use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.' : 
                  (typeof t('legal:privacy.cookies.content') === 'string' ? t('legal:privacy.cookies.content') as string : 'We may use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '6. Your Rights' : 
                  (typeof t('legal:privacy.rights.title') === 'string' ? t('legal:privacy.rights.title') as string : '6. Your Rights')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us using the information provided below.' : 
                  (typeof t('legal:privacy.rights.content') === 'string' ? t('legal:privacy.rights.content') as string : 'Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us using the information provided below.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '7. Changes to This Privacy Policy' : 
                  (typeof t('legal:privacy.changes.title') === 'string' ? t('legal:privacy.changes.title') as string : '7. Changes to This Privacy Policy')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.' : 
                  (typeof t('legal:privacy.changes.content') === 'string' ? t('legal:privacy.changes.content') as string : 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '8. Contact Us' : 
                  (typeof t('legal:privacy.contact.title') === 'string' ? t('legal:privacy.contact.title') as string : '8. Contact Us')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'If you have any questions about this Privacy Policy, please contact us at pixelnext9@gmail.com.' : 
                  (typeof t('legal:privacy.contact.content') === 'string' ? t('legal:privacy.contact.content') as string : 'If you have any questions about this Privacy Policy, please contact us at pixelnext9@gmail.com.')
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

export default PrivacyPolicy;
