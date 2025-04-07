import * as React from 'react';
import { EmailTemplate } from '../../../src/components/email-template';
import { Resend } from 'resend';

// Koristimo placeholder API ključ ako pravi ključ nije dostupan
// U produkciji, potrebno je postaviti pravi Resend API ključ u .env fajlu
const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY || 're_placeholder_key';
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, phone, message } = formData;
    
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Proveravamo da li koristimo placeholder ključ
    if (resendApiKey === 're_placeholder_key') {
      console.log('Using placeholder Resend API key. Email will not be sent in production.');
      // Simuliramo uspešno slanje emaila u development okruženju
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: { id: 'simulated-email-id' },
          dev: true,
          message: 'Email nije poslat jer se koristi placeholder API ključ. U produkciji, postavite pravi Resend API ključ.'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { data, error } = await resend.emails.send({
      from: 'NextPixel <onboarding@resend.dev>',
      to: [process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || 'delivered@resend.dev'],
      subject: `Nova poruka od ${name}`,
      react: EmailTemplate({ 
        firstName: name,
        email,
        phone,
        message 
      }) as React.ReactElement,
    });

    if (error) {
      console.error('Error sending email:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
