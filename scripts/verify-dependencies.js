/**
 * Run this script to verify all dependencies are installed:
 * scripts/verify-dependencies.js
 */

/*
const fs = require('fs');
const path = require('path');

function verifyDependencies() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredDeps = [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
  ];
  
  const requiredProdDeps = [
    'bcryptjs',
    'jsonwebtoken',
  ];
  
  const requiredTypeDeps = [
    '@types/bcryptjs',
    '@types/jsonwebtoken',
  ];
  
  const devDeps = packageJson.devDependencies || {};
  const prodDeps = packageJson.dependencies || {};
  
  console.log('🔍 Checking dependencies...\n');
  
  let allGood = true;
  
  // Check dev dependencies
  requiredDeps.forEach(dep => {
    if (devDeps[dep]) {
      console.log(`✅ ${dep}: ${devDeps[dep]}`);
    } else {
      console.log(`❌ Missing: ${dep}`);
      allGood = false;
    }
  });
  
  // Check production dependencies
  requiredProdDeps.forEach(dep => {
    if (prodDeps[dep]) {
      console.log(`✅ ${dep}: ${prodDeps[dep]}`);
    } else {
      console.log(`❌ Missing: ${dep}`);
      allGood = false;
    }
  });
  
  // Check type dependencies
  requiredTypeDeps.forEach(dep => {
    if (devDeps[dep]) {
      console.log(`✅ ${dep}: ${devDeps[dep]}`);
    } else {
      console.log(`❌ Missing: ${dep}`);
      allGood = false;
    }
  });
  
  if (allGood) {
    console.log('\n🎉 All dependencies are properly installed!');
  } else {
    console.log('\n📦 Install missing dependencies with:');
    console.log('npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser');
    console.log('npm install bcryptjs jsonwebtoken');
    console.log('npm install --save-dev @types/bcryptjs @types/jsonwebtoken');
  }
}

verifyDependencies();
*/