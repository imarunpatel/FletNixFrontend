import { test, expect, request } from '@playwright/test';

test.describe('MediaService API Tests', () => {
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

  test('Fetch Media', async () => {
    const loginResponse = await apiContext.post('/v1/login', {
        data: { email: 'arun@gmail.com', password: '123456' },
      });
  
      const loginBody = await loginResponse.json();
      const token = loginBody.data.accessToken;
  
    const response = await apiContext.get('/v1/media', {
    headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();

    // Assertions
    expect(responseBody.success).toBe(true);
  });
});
