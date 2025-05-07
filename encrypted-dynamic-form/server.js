const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Constants
const SECRET = 'internsNeverGuess';
const SALT = 'SALT1234';

// Key generation using SHA256
const key = crypto.createHash('sha256').update(SECRET).digest();

// Function to encrypt a field
function encryptField(plaintext) {
  const iv = crypto.randomBytes(16); // 16 bytes IV
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  const encrypted = Buffer.concat([
    cipher.update(SALT + plaintext, 'utf8'),
    cipher.final()
  ]);

  return {
    data: encrypted.toString('base64'),
    iv: iv.toString('base64')
  };
}

// Form fields including one decoy field (invalid format)
const fields = [
  'name:text',
  'email:text',
  'dob:date',
  'location:text',
  'junkdata123' // Decoy field that does not follow label:type format
];

// Function to return encrypted fields
function getEncryptedFields() {
  return fields.map(field => encryptField(field));
}

// API endpoint to get encrypted form structure
app.get('/api/form', (req, res) => {
  const encryptedFields = getEncryptedFields();
  res.json(encryptedFields);
});

// API endpoint to receive submitted form data
app.post('/api/submit', (req, res) => {
  console.log('Received Form Submission:');
  console.log(req.body);

  res.status(200).json({ message: 'Form submitted successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
