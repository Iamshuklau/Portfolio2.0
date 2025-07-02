const fs = require('fs');
const path = require('path');

console.log('🚀 Portfolio Contact Form Setup\n');

// Check if .env exists
const envPath = '.env';
const templatePath = 'env-template';

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(templatePath)) {
    // Copy template to .env
    fs.copyFileSync(templatePath, envPath);
    console.log('✅ Created .env file from template');
    console.log('📝 Please edit .env file and add your Resend API key\n');
  } else {
    console.log('❌ env-template file not found');
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Check if dependencies are installed
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed\n');
  } catch (error) {
    console.log('❌ Failed to install dependencies');
    console.log('Please run: npm install\n');
  }
}

// Read .env file and check if API key is set
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasApiKey = envContent.includes('RESEND_API_KEY=') && !envContent.includes('your_resend_api_key_here');
  
  if (hasApiKey) {
    console.log('✅ Resend API key is configured');
    console.log('🎉 Setup complete! You can now run:\n');
    console.log('   npm start    - Start the server');
    console.log('   npm run dev  - Start in development mode\n');
  } else {
    console.log('⚠️  Please update your .env file with your Resend API key:');
    console.log('   1. Go to https://resend.com/api-keys');
    console.log('   2. Create a new API key');
    console.log('   3. Replace "your_resend_api_key_here" in .env file');
    console.log('   4. Run this script again or start the server\n');
  }
} catch (error) {
  console.log('❌ Error reading .env file:', error.message);
}

console.log('📚 For detailed instructions, see EMAIL_SETUP.md'); 