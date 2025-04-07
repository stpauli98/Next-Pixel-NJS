import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  email: string;
  phone?: string;
  message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  email,
  phone,
  message,
}) => (
  <div>
    <h1>Nova poruka sa web sajta</h1>
    <p>Primili ste novu poruku od: <strong>{firstName}</strong></p>
    
    <h2>Detalji kontakta:</h2>
    <ul>
      <li><strong>Ime:</strong> {firstName}</li>
      <li><strong>Email:</strong> {email}</li>
      {phone && <li><strong>Telefon:</strong> {phone}</li>}
    </ul>
    
    <h2>Poruka:</h2>
    <div style={{ 
      padding: '15px',
      backgroundColor: '#f5f5f5',
      borderRadius: '5px',
      marginTop: '10px',
      marginBottom: '20px' 
    }}>
      <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
    </div>
    
    <hr style={{ 
      borderTop: '1px solid #ccc',
      margin: '20px 0' 
    }} />
    
    <p style={{ 
      fontSize: '12px',
      color: '#666' 
    }}>
      Ova poruka je automatski poslata sa NextPixel web sajta.
    </p>
  </div>
);
