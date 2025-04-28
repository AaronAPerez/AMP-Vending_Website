import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('Test API hit with POST method');
  const body = await request.json().catch(() => ({}));
  console.log('Body:', body);
  
  return NextResponse.json({ success: true });
}

// Then test this endpoint with a simple fetch call from your browser console:

// javascript
fetch('/api/test', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ test: 'data' }),
}).then(res => res.json()).then(console.log).catch(console.error);
