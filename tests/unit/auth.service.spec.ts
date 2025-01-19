import { test, expect, request } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test.describe('AuthService API Tests', () => {
  let apiContext: any;

  // Before all tests, create a request context
  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: 'https://u9rgdmyi6i.execute-api.ap-south-1.amazonaws.com', // Replace with your API base URL
    });
  });

  // Dispose of the request context after all tests
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Login API - Successful Login', async () => {
    const response = await apiContext.post('/v1/login', {
      data: { email: 'arun@gmail.com', password: '123456' },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();

    // Assertions
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.accessToken).toBeTruthy();
    expect(responseBody.data.user).toEqual({
      _id: '678ab533d0627b7887c6e84f',
      createdOn: "2025-01-17T19:53:19.791Z",
      email: 'arun@gmail.com',
      age: 45,
    });
  });

  test('Login API - Invalid Credentials', async () => {
    const response = await apiContext.post('/v1/login', {
      data: { email: 'wrong@example.com', password: 'wrongpassword' },
    });

    expect(response.status()).toBe(400); // Unauthorized
    const responseBody = await response.json();

    // Assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBe('Bad credentials');
  });

  test('Register API', async () => {
    let email = 'test@example.com' + uuidv4();
    const response = await apiContext.post('/v1/register', {
      data: { email: email, age: 30, password: 'password123' },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();

    // Assertions
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.email).toBe(email);
    expect(responseBody.data.age).toBe(30);
  });

  test('Get Self API', async () => {
    // First, log in to get the token
    const loginResponse = await apiContext.post('/v1/login', {
      data: { email: 'arun@gmail.com', password: '123456' },
    });

    const loginBody = await loginResponse.json();
    const token = loginBody.data.accessToken;

    const selfResponse = await apiContext.get('/v1/self', {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(selfResponse.ok()).toBeTruthy();
    const selfBody = await selfResponse.json();

    // Assertions
    expect(selfBody.success).toBe(true);
    expect(selfBody.data.email).toBe('arun@gmail.com');
  });
});
