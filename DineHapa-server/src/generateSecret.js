const crypto = require('crypto');

// Generate a secure random string
const secret = crypto.randomBytes(64).toString('hex');
console.log('Generated Secret:', secret);