import { GoogleAuth } from 'google-auth-library';

async function getAccessToken(): Promise<string> {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const accessTokenResponse = await client.getAccessToken();
  if (!accessTokenResponse || !accessTokenResponse.token) {
    throw new Error('Failed to obtain access token');
  }
  return accessTokenResponse.token;
}

async function testGoogleAuth() {
  try {
    console.log('Testing Google Service Account authentication...');
    const token = await getAccessToken();
    console.log('✅ Authentication successful!');
    const tokenStr = typeof token === 'string' ? token : JSON.stringify(token);
    console.log('Token preview:', tokenStr.substring(0, 20) + '...');
  } catch (error) {
    console.error('❌ Authentication failed:', error);
  }
}

testGoogleAuth();