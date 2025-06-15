import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AMP Vending - Professional Workplace Vending Solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #4d4d4d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'Inter',
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: '#FD5A1E',
              borderRadius: '50%',
              marginRight: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#000000',
            }}
          >
            AMP
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#F5F5F5',
            }}
          >
            AMP Vending
          </div>
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#F5F5F5',
            textAlign: 'center',
            marginBottom: '24px',
            lineHeight: '1.1',
          }}
        >
          Professional Vending Solutions
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '32px',
            color: '#A5ACAF',
            textAlign: 'center',
            marginBottom: '40px',
            lineHeight: '1.2',
          }}
        >
          21.5" Touchscreen Technology • Contactless Payments • Central California
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {['Professional Installation', 'Complete Maintenance', '50+ Product Options'].map((feature) => (
            <div
              key={feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(253, 90, 30, 0.1)',
                padding: '16px 24px',
                borderRadius: '12px',
                border: '1px solid #FD5A1E',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  background: '#FD5A1E',
                  borderRadius: '50%',
                  marginRight: '12px',
                }}
              />
              <span
                style={{
                  color: '#F5F5F5',
                  fontSize: '20px',
                  fontWeight: '500',
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}