const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv")
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

dotenv.config()
app.use(bodyParser.json())
app.use(cors())

const config = require("./src/conf/config");

// Initialize Clerk with your API key
ClerkExpressWithAuth({
    apiKey: config.clerkApiKey,
  });

module.exports = app;