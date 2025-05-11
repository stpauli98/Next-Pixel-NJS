"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLocationDot } from 'react-icons/fa6';
import { Icon } from '../../utils/icons';
import { useTranslate } from '../../context/LanguageContext';

const ContactSection: React.FC = () => {
  const { t, language } = useTranslate();
  const [mounted, setMounted] = useState(false);

  // Rešava problem hidratacije
  useEffect(() => {
    setMounted(true);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Resetiranje forme nakon uspješnog slanja
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        setSubmitSuccess(true);
        console.log('Form submitted successfully:', data);
      } else {
        setSubmitError(data.error || 'Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovo.');
        console.error('Form submission error:', data);
      }
    } catch (error) {
      setSubmitError('Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovo.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Definišemo tipove za kontakt informacije
  interface ContactInfoItem {
    icon: typeof FaEnvelope | typeof FaPhone | typeof FaLocationDot;
    titleKey: string;
    info?: string;
    infoKey?: string;
    link: string;
  }

  const contactInfo: ContactInfoItem[] = [
    {
      icon: FaEnvelope,
      titleKey: 'contact.info.email',
      info: 'pixelnext9@gmail.com',
      link: 'mailto:pixelnext9@gmail.com'
    },
    {
      icon: FaPhone,
      titleKey: 'contact.info.phone',
      info: '+387 66 603 900',
      link: 'tel:+38766603900'
    },
    {
      icon: FaLocationDot,
      titleKey: 'contact.info.address',
      infoKey: 'contact.info.addressDetails',
      link: 'https://maps.google.com/?q=Gradiska'
    }
  ];

  return (
    <section id="contact" className="section bg-nextpixel-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {!mounted ? (
              <>
                <span className="text-nextpixel-turquoise">Contact</span> Us
              </>
            ) : typeof t('contact.title') === 'string' && (t('contact.title') as string).includes('Kontakt') ? (
              <>
                {(t('contact.title') as string).split('Kontakt')[0]}
                <span className="text-nextpixel-turquoise">Kontakt</span>
                {(t('contact.title') as string).split('Kontakt')[1]}
              </>
            ) : typeof t('contact.title') === 'string' && (t('contact.title') as string).includes('Contact') ? (
              <>
                {(t('contact.title') as string).split('Contact')[0]}
                <span className="text-nextpixel-turquoise">Contact</span>
                {(t('contact.title') as string).split('Contact')[1]}
              </>
            ) : (
              typeof t('contact.title') === 'string' ? t('contact.title') as string : <><span className="text-nextpixel-turquoise">Contact</span> Us</>
            )}
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-1 bg-nextpixel-turquoise mx-auto mb-6"
          ></motion.div>
              <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-nextpixel-gray max-w-3xl mx-auto"
          >
            {typeof t('contact.subtitle') === 'string' ? t('contact.subtitle') as string : ''}
          </motion.p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                {typeof t('contact.sendMessage') === 'string' ? t('contact.sendMessage') as string : 'Send us a message'}
              </h3>
              
              {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {typeof submitError === 'string' ? submitError : 'An error occurred'}
                </div>
              )}
              
              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  {typeof t('contact.successMessage') === 'string' ? t('contact.successMessage') as string : 'Your message has been sent successfully!'}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  <div className="w-full">
                    <label htmlFor="name" className="block text-nextpixel-gray mb-2 font-medium">
                      {typeof t('contact.name') === 'string' ? t('contact.name') as string : 'Name'} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nextpixel-blue transition-all duration-200"
                      placeholder={typeof t('contact.namePlaceholder') === 'string' ? t('contact.namePlaceholder') as string : 'Your name'}
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="email" className="block text-nextpixel-gray mb-2 font-medium">
                      {typeof t('contact.email') === 'string' ? t('contact.email') as string : 'Email'} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nextpixel-blue transition-all duration-200"
                      placeholder={typeof t('contact.emailPlaceholder') === 'string' ? t('contact.emailPlaceholder') as string : 'Your email'}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-nextpixel-gray mb-2 font-medium">
                    {typeof t('contact.phone') === 'string' ? t('contact.phone') as string : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nextpixel-blue transition-all duration-200"
                    placeholder={typeof t('contact.phonePlaceholder') === 'string' ? t('contact.phonePlaceholder') as string : 'Your phone number'}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-nextpixel-gray mb-2 font-medium">
                    {typeof t('contact.subject') === 'string' ? t('contact.subject') as string : 'Subject'} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nextpixel-blue transition-all duration-200"
                    placeholder={typeof t('contact.subjectPlaceholder') === 'string' ? t('contact.subjectPlaceholder') as string : 'Subject of your message'}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-nextpixel-gray mb-2 font-medium">
                    {typeof t('contact.message') === 'string' ? t('contact.message') as string : 'Message'} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nextpixel-blue transition-all duration-200"
                    placeholder={typeof t('contact.messagePlaceholder') === 'string' ? t('contact.messagePlaceholder') as string : 'Your message'}
                  ></textarea>
                </div>
                
                <div className="flex justify-center">
                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-nextpixel-blue text-white font-medium rounded-md hover:bg-nextpixel-blue/90 transition-colors flex items-center justify-center disabled:opacity-70 w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {typeof t('contact.sending') === 'string' ? t('contact.sending') as string : 'Sending...'}
                      </>
                    ) : (
                      typeof t('contact.send') === 'string' ? t('contact.send') as string : 'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-6">
                {typeof t('contact.info.title') === 'string' ? t('contact.info.title') as string : 'Contact Information'}
              </h3>
              
              <div className="space-y-6 flex-grow">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start"
                  >
                    <div className="bg-nextpixel-blue/10 p-3 rounded-full mb-3 sm:mb-0 sm:mr-4 flex-shrink-0">
                      <Icon icon={item.icon} size={20} className="text-nextpixel-blue" aria-hidden={true} />
                    </div>
                    <div className="text-center sm:text-left">
                       <h4 className="font-bold text-gray-800">
                         {!mounted ? 
                           (index === 0 ? 'Email' : index === 1 ? 'Phone' : 'Address') :
                           (typeof t(item.titleKey || '') === 'string' ? t(item.titleKey || '') as string : (index === 0 ? 'Email' : index === 1 ? 'Phone' : 'Address'))
                         }
                       </h4>
                       <a 
                         href={item.link} 
                         className="text-nextpixel-gray hover:text-nextpixel-blue transition-colors block"
                       >
                         {!mounted ? 
                           (item.info || (index === 2 ? 'Gradiška, Bosnia and Herzegovina' : '')) :
                           (index === 2 && 'infoKey' in item ? 
                             (typeof t(item.infoKey || '') === 'string' ? t(item.infoKey || '') as string : 'Gradiška, Bosnia and Herzegovina') :
                             item.info)
                         }
                       </a>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <h4 className="font-bold mb-4 text-gray-800">
                  {!mounted ? 'Working Hours' : 
                    (typeof t('contact.workingHours.title') === 'string' ? t('contact.workingHours.title') as string : 'Working Hours')
                  }
                </h4>
                <p className="text-nextpixel-gray mb-2">
                  {!mounted ? 'Monday - Friday: 9:00 - 17:00' : 
                    (typeof t('contact.workingHours.weekdays') === 'string' ? t('contact.workingHours.weekdays') as string : 'Monday - Friday: 9:00 - 17:00')
                  }
                </p>
                <p className="text-nextpixel-gray">
                  {!mounted ? 'Saturday - Sunday: Closed' : 
                    (typeof t('contact.workingHours.weekend') === 'string' ? t('contact.workingHours.weekend') as string : 'Saturday - Sunday: Closed')
                  }
                </p>
              </div>
              
              <div className="mt-8 text-center">
                <h4 className="font-bold mb-4 text-gray-800">
                  {typeof t('contact.followUs') === 'string' ? t('contact.followUs') as string : 'Follow Us'}
                </h4>
                <div className="flex space-x-5 justify-center">
                  <a href="https://www.instagram.com/pixelnext9" className="text-nextpixel-gray hover:text-nextpixel-blue transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com" className="text-nextpixel-gray hover:text-nextpixel-blue transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
