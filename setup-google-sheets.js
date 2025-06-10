#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Google Sheets API Setup Guide');
console.log('=================================\n');

console.log('Follow these steps to set up Google Sheets API authentication:\n');

console.log('1. 📋 Go to Google Cloud Console:');
console.log('   https://console.cloud.google.com\n');

console.log('2. 🆕 Create a new project or select an existing one\n');

console.log('3. 📊 Enable the Google Sheets API:');
console.log('   - Go to "APIs & Services" > "Library"');
console.log('   - Search for "Google Sheets API"');
console.log('   - Click "Enable"\n');

console.log('4. 🔑 Create a Service Account:');
console.log('   - Go to "IAM & Admin" > "Service Accounts"');
console.log('   - Click "Create Service Account"');
console.log('   - Give it a name (e.g., "appointment-form")');
console.log('   - Click "Create and Continue"\n');

console.log('5. 📁 Download the JSON key file:');
console.log('   - Click on your newly created service account');
console.log('   - Go to "Keys" tab');
console.log('   - Click "Add Key" > "Create new key"');
console.log('   - Choose "JSON" and download the file\n');

console.log('6. 📄 Create your Google Sheet:');
console.log('   - Create a new Google Sheet');
console.log('   - Copy the Sheet ID from the URL');
console.log('   - Share the sheet with your service account email (from the JSON file)\n');

console.log('7. ⚙️ Set up environment variables:');
console.log('   - Create a .env.local file in your project root');
console.log('   - Copy the template from .env.local.example');
console.log('   - Fill in the values from your downloaded JSON file\n');

console.log('8. 🔄 Restart your development server\n');

console.log('Environment variables you need:');
console.log('- GOOGLE_CLIENT_EMAIL (from client_email in JSON)');
console.log('- GOOGLE_PRIVATE_KEY (from private_key in JSON)');
console.log('- GOOGLE_SHEET_ID (from your Google Sheet URL)');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('\n✅ .env.local file found');
} else {
  console.log('\n❌ .env.local file not found. Please create it using .env.local.example as a template');
}
