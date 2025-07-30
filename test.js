const api = require('./api.js');

// Mocking the request and response objects
const mockRequest = (query) => ({
  query,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};


// Test case
test('API should fetch and return data correctly', async () => {
  const req = mockRequest({ mykad: '1234567890' });
  const res = mockResponse();
  await api(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    nama_penuh: 'Test User',
    no_ahli: '12345',
  });
});
