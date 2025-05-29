import { ImageResponse } from 'next/og';
import React from 'react';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const width = parseInt(searchParams.get('width') || '400');
  const height = parseInt(searchParams.get('height') || '320');

  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#4d4d4d',
          color: '#A5ACAF',
          fontSize: '24px',
          fontWeight: 'bold',
        },
      },
      React.createElement(
        'svg',
        {
          width: 100,
          height: 100,
          viewBox: '0 0 100 100',
          fill: 'none',
        },
        React.createElement('rect', {
          width: 100,
          height: 100,
          rx: 8,
          fill: '#000000',
        }),
        React.createElement('path', {
          d: 'M25 35h50v30H25V35z',
          stroke: '#A5ACAF',
          strokeWidth: 2,
        }),
        React.createElement('circle', {
          cx: 35,
          cy: 45,
          r: 3,
          fill: '#FD5A1E',
        }),
        React.createElement('path', {
          d: 'M30 55l15-10 10 8 15-12',
          stroke: '#FD5A1E',
          strokeWidth: 2,
        })
      ),
      React.createElement(
        'div',
        { style: { marginTop: '20px' } },
        'No Image'
      )
    ),
    {
      width: width,
      height: height,
    }
  );
}
