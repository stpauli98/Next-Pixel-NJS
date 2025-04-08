import * as React from 'react';
import { EmailTemplate } from '../../../src/components/EmailTemplate';
import { Resend } from 'resend';

// Koristimo API ključ iz .env fajla
// U produkciji, potrebno je postaviti pravi Resend API ključ u .env fajlu
const resendApiKey = process.env.RESEND_API_KEY;
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

    // Proveravamo da li imamo API ključ
    if (!resendApiKey) {
      console.log('Missing Resend API key. Email will not be sent.');
      // Simuliramo uspešno slanje emaila u development okruženju
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: { id: 'simulated-email-id' },
          dev: true,
          message: 'Email nije poslat jer nedostaje Resend API ključ. Proverite da li je RESEND_API_KEY postavljen u .env fajlu.'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { data, error } = await resend.emails.send({
      from: 'NextPixel <onboarding@resend.dev>',
      to: [process.env.RECIPIENT_EMAIL || 'pixelnext9@gmail.com'],
      subject: `Nova poruka od ${name}`,
      react: EmailTemplate({ 
        name,
        email,
        subject: `Nova poruka od ${name}`,
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
