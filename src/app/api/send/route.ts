import * as React from 'react';
import { EmailTemplate } from '@/components/EmailTemplate';
import { Resend } from 'resend';
import { logWarn, logError, logInfo } from '@/utils/logger';
import { 
  validateContactForm, 
  contactFormRateLimiter, 
  getClientIp, 
  createApiResponse,
  type ContactFormData 
} from '@/lib/validation';
import type { ContactFormInput } from '@/types/common';

// Koristimo API ključ iz .env fajla
// U produkciji, potrebno je postaviti pravi Resend API ključ u .env fajlu
const resendApiKey = process.env.RESEND_API_KEY;

// Inicijalizujemo Resend samo ako imamo API ključ
// Inače ćemo koristiti mock implementaciju
let resend: Resend | null = null;
if (resendApiKey) {
  resend = new Resend(resendApiKey);
}

export async function POST(request: Request) {
  const startTime = Date.now();
  const clientIp = getClientIp(request);
  
  try {
    // Rate limiting check
    if (!contactFormRateLimiter.isAllowed(clientIp)) {
      const remaining = contactFormRateLimiter.getRemaining(clientIp);
      logWarn('Rate limit exceeded for contact form', {
        component: 'EmailAPI',
        clientIp,
        remaining,
        method: 'POST'
      });
      
      return createApiResponse(
        'Rate limit exceeded. Please try again later.',
        429,
        `Too many requests. ${remaining} requests remaining.`
      );
    }

    // Parse request body with size limit
    let formData: ContactFormInput;
    try {
      const requestText = await request.text();
      if (requestText.length > 10000) { // 10KB limit
        return createApiResponse(
          'Request body too large',
          413,
          'Request size exceeds maximum allowed limit'
        );
      }
      formData = JSON.parse(requestText);
    } catch (parseError) {
      logError('Failed to parse request body', parseError, {
        component: 'EmailAPI',
        clientIp,
        contentType: request.headers.get('content-type')
      });
      
      return createApiResponse(
        'Invalid JSON format',
        400,
        'Request body must be valid JSON'
      );
    }

    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      logWarn('Form validation failed', {
        component: 'EmailAPI',
        clientIp,
        errors: validation.errors,
        receivedFields: Object.keys(formData || {})
      });
      
      return createApiResponse(
        {
          message: 'Validation failed',
          errors: validation.errors
        },
        400,
        'Please correct the form errors and try again'
      );
    }

    const cleanData = validation.data as ContactFormData;

    // Proveravamo da li imamo inicijalizovan Resend objekat
    if (!resend) {
      logWarn('Nedostaje Resend API ključ - email neće biti poslat', {
        component: 'EmailAPI',
        environment: process.env.NODE_ENV,
        hasApiKey: !!resendApiKey,
        clientIp,
        processingTime: Date.now() - startTime
      });
      
      // Simuliramo uspešno slanje emaila u development okruženju
      return createApiResponse(
        { 
          id: 'simulated-email-id',
          dev: true,
          sender: cleanData.name,
          email: cleanData.email
        },
        200,
        'Email nije poslat jer nedostaje Resend API ključ. Proverite da li je RESEND_API_KEY postavljen u .env fajlu.'
      );
    }
    
    // Validate recipient email
    const recipientEmail = process.env.RECIPIENT_EMAIL;
    if (!recipientEmail) {
      logError('RECIPIENT_EMAIL environment variable nije postavljena', new Error('Missing RECIPIENT_EMAIL'), {
        component: 'EmailAPI',
        clientIp,
        hasResendKey: !!resendApiKey
      });
      
      return createApiResponse(
        'Email configuration error',
        500,
        'Server configuration error. Please try again later.'
      );
    }
    
    // Log pre slanja
    logInfo('Pokušavam slanje email-a', {
      component: 'EmailAPI',
      senderName: cleanData.name,
      senderEmail: cleanData.email,
      hasPhone: !!cleanData.phone,
      messageLength: cleanData.message.length,
      clientIp,
      processingTime: Date.now() - startTime
    });
    
    // TypeScript zahteva da proverimo da li je resend definisan, iako smo to već uradili iznad
    const { data, error } = await resend!.emails.send({
      from: 'Poruka od musterije | NextPixel <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `Nova poruka od ${cleanData.name}`,
      react: EmailTemplate({ 
        name: cleanData.name,
        email: cleanData.email,
        subject: `Nova poruka od ${cleanData.name}`,
        phone: cleanData.phone || '',
        message: cleanData.message
      }) as React.ReactElement,
    });

    if (error) {
      logError('Greška pri slanju email-a', error, {
        component: 'EmailAPI',
        recipientEmail,
        hasResendKey: !!resendApiKey,
        senderEmail: cleanData.email,
        clientIp,
        processingTime: Date.now() - startTime
      });
      
      return createApiResponse(
        'Failed to send email',
        500,
        'There was an error sending your message. Please try again later.'
      );
    }

    // Log uspešno slanje
    logInfo('Email uspešno poslat', {
      component: 'EmailAPI',
      emailId: data?.id,
      senderEmail: cleanData.email,
      recipientEmail,
      clientIp,
      processingTime: Date.now() - startTime
    });

    return createApiResponse(
      { 
        id: data?.id,
        sender: cleanData.name,
        email: cleanData.email,
        timestamp: new Date().toISOString()
      },
      200,
      'Your message has been sent successfully. We will get back to you soon!'
    );
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    logError('Greška u API ruti za slanje email-a', error, {
      component: 'EmailAPI',
      method: 'POST',
      url: '/api/send',
      clientIp,
      processingTime,
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer')
    });
    
    return createApiResponse(
      'Internal server error',
      500,
      'An unexpected error occurred. Please try again later.'
    );
  }
}
