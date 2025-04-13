import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom, #4F46E5, #2563EB)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          textAlign: 'center',
          borderRadius: 16,
        }}
      >
        <div 
          style={{ 
            fontSize: 72, 
            fontWeight: 'bold', 
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <span style={{ color: '#10B981' }}>Next</span>
          <span>Pixel</span>
        </div>
        <p style={{ 
          fontSize: 32, 
          margin: 0, 
          marginBottom: 24,
          maxWidth: '80%',
          textAlign: 'center',
          lineHeight: 1.4
        }}>
          Digitalna agencija za web i softverska rješenja
        </p>
        <div style={{ 
          display: 'flex', 
          gap: 16, 
          marginTop: 32 
        }}>
          <div style={{ 
            padding: '12px 24px', 
            background: '#10B981', 
            borderRadius: 12,
            fontSize: 24,
            fontWeight: 'bold'
          }}>
            Web Dizajn
          </div>
          <div style={{ 
            padding: '12px 24px', 
            background: '#3B82F6', 
            borderRadius: 12,
            fontSize: 24,
            fontWeight: 'bold'
          }}>
            Razvoj Softvera
          </div>
          <div style={{ 
            padding: '12px 24px', 
            background: '#8B5CF6', 
            borderRadius: 12,
            fontSize: 24,
            fontWeight: 'bold'
          }}>
            Digitalni Marketing
          </div>
        </div>
      </div>
    ),
    size
  );
}
