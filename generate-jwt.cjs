require('dotenv').config();

const jwt = require('jsonwebtoken');

const payload = {
  userId: 123,
  username: 'john_doe',
  role: 'admin'
};

const secretKey = process.env.JWT_SECRET || 'my-secret-key';

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log('JWT:', token);