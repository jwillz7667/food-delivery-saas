// controllers.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User.model');

describe('Auth Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      role: 'customer',
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty('id');
  });

  // Additional test cases...
});
