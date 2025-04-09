"use client";

import React, { useState, useEffect } from 'react';
import { useTranslate } from '../../src/context/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PrivacyPolicyPage: React.FC = () => {
  const { t, language } = useTranslate();
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
              (typeof t('privacy.title') === 'string' ? t('privacy.title') as string : 'Privacy Policy')
            }
          </h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '1. Information We Collect' : 
                  (typeof t('privacy.collect.title') === 'string' ? t('privacy.collect.title') as string : '1. Information We Collect')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We collect personal information that you voluntarily provide to us when you express interest in obtaining information about our services, when you participate in activities on our website, or otherwise when you contact us. The personal information we collect may include names, email addresses, phone numbers, and other information you choose to provide.' : 
                  (typeof t('privacy.collect.content') === 'string' ? t('privacy.collect.content') as string : 'We collect personal information that you voluntarily provide to us when you express interest in obtaining information about our services, when you participate in activities on our website, or otherwise when you contact us. The personal information we collect may include names, email addresses, phone numbers, and other information you choose to provide.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '2. How We Use Your Information' : 
                  (typeof t('privacy.use.title') === 'string' ? t('privacy.use.title') as string : '2. How We Use Your Information')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We use the information we collect to provide, maintain, and improve our services. This includes using the data to communicate with you, respond to your inquiries, and send you information about our services. We may also use your information to comply with legal obligations and resolve disputes.' : 
                  (typeof t('privacy.use.content') === 'string' ? t('privacy.use.content') as string : 'We use the information we collect to provide, maintain, and improve our services. This includes using the data to communicate with you, respond to your inquiries, and send you information about our services. We may also use your information to comply with legal obligations and resolve disputes.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '3. Information Sharing and Disclosure' : 
                  (typeof t('privacy.sharing.title') === 'string' ? t('privacy.sharing.title') as string : '3. Information Sharing and Disclosure')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.' : 
                  (typeof t('privacy.sharing.content') === 'string' ? t('privacy.sharing.content') as string : 'We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '4. Data Security' : 
                  (typeof t('privacy.security.title') === 'string' ? t('privacy.security.title') as string : '4. Data Security')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.' : 
                  (typeof t('privacy.security.content') === 'string' ? t('privacy.security.content') as string : 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '5. Cookies and Tracking Technologies' : 
                  (typeof t('privacy.cookies.title') === 'string' ? t('privacy.cookies.title') as string : '5. Cookies and Tracking Technologies')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We may use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.' : 
                  (typeof t('privacy.cookies.content') === 'string' ? t('privacy.cookies.content') as string : 'We may use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '6. Your Rights' : 
                  (typeof t('privacy.rights.title') === 'string' ? t('privacy.rights.title') as string : '6. Your Rights')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us using the information provided below.' : 
                  (typeof t('privacy.rights.content') === 'string' ? t('privacy.rights.content') as string : 'Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us using the information provided below.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '7. Changes to This Privacy Policy' : 
                  (typeof t('privacy.changes.title') === 'string' ? t('privacy.changes.title') as string : '7. Changes to This Privacy Policy')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.' : 
                  (typeof t('privacy.changes.content') === 'string' ? t('privacy.changes.content') as string : 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.')
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {!mounted ? '8. Contact Us' : 
                  (typeof t('privacy.contact.title') === 'string' ? t('privacy.contact.title') as string : '8. Contact Us')
                }
              </h2>
              <p className="text-nextpixel-gray">
                {!mounted ? 'If you have any questions about this Privacy Policy, please contact us at pixelnext9@gmail.com.' : 
                  (typeof t('privacy.contact.content') === 'string' ? t('privacy.contact.content') as string : 'If you have any questions about this Privacy Policy, please contact us at pixelnext9@gmail.com.')
                }
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/" className="px-6 py-3 bg-nextpixel-blue text-white font-medium rounded-md hover:bg-nextpixel-blue/90 transition-colors inline-block">
              {!mounted ? 'Back to Home' : 
                (typeof t('common.backToHome') === 'string' ? t('common.backToHome') as string : 'Back to Home')
              }
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
