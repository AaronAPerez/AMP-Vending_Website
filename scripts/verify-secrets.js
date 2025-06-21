// scripts/verify-secrets.js
function verifySecrets() {
  const required = ['NEXTAUTH_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'];
  const missing = [];
  const weak = [];

  required.forEach(key => {
    const value = process.env[key];
    
    if (!value) {
      missing.push(key);
    } else if (key === 'NEXTAUTH_SECRET' && value.length < 32) {
      weak.push(`${key} (too short: ${value.length} characters)`);
    }
  });

  console.log('🔍 Environment Variables Check:');
  console.log('==============================');
  
  if (missing.length === 0 && weak.length === 0) {
    console.log('✅ All secrets are properly configured!');
    console.log(`📏 NEXTAUTH_SECRET length: ${process.env.NEXTAUTH_SECRET?.length} characters`);
  } else {
    if (missing.length > 0) {
      console.log('❌ Missing variables:', missing.join(', '));
    }
    if (weak.length > 0) {
      console.log('⚠️  Weak secrets:', weak.join(', '));
    }
  }
}

verifySecrets();