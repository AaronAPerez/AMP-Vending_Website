// app/api/admin/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('amp-admin-token');

    if (token && token.value === 'authenticated') {
      return NextResponse.json({
        user: {
          email: process.env.ADMIN_EMAIL,
          role: 'admin',
          name: 'AMP Vending Administrator'
        }
      });
    }

    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}