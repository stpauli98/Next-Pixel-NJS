import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  subject,
  phone,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#3B82F6', fontSize: '24px', marginBottom: '16px' }}>
      New Contact Form Submission
    </h1>
    <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
      <p style={{ margin: '8px 0' }}><strong>Name:</strong> {name}</p>
      <p style={{ margin: '8px 0' }}><strong>Email:</strong> {email}</p>
      <p style={{ margin: '8px 0' }}><strong>Subject:</strong> {subject}</p>
      <p style={{ margin: '8px 0' }}><strong>Phone:</strong> {phone}</p>
      <div style={{ margin: '16px 0' }}>
        <p style={{ margin: '8px 0' }}><strong>Message:</strong></p>
        <p style={{ margin: '8px 0', whiteSpace: 'pre-wrap' }}>{message}</p>
      </div>
    </div>
    <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '24px', textAlign: 'center' }}>
      This email was sent from the NextPixel contact form.
    </p>
  </div>
);

export default EmailTemplate;
