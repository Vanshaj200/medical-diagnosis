require('dotenv').config();

const config = {
    mongoUri: process.env.MONGODB_URI,
    clerkApiKey: process.env.CLERK_API_KEY,
    resendApiKey: process.env.RESEND_API_KEY,
    port: process.env.PORT || 8000,
};

// Simple validation
const requiredKeys = ['mongoUri', 'clerkApiKey', 'resendApiKey'];
const missingKeys = requiredKeys.filter(key => !config[key]);

if (missingKeys.length > 0) {
    console.error(`Missing required environment variables: ${missingKeys.join(', ')}`);
    // Ideally, throw an error or exit, but for now just logging
}

module.exports = config;
