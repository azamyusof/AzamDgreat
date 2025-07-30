module.exports = {
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      goto: jest.fn(),
      type: jest.fn(),
      click: jest.fn(),
      waitForSelector: jest.fn(),
      evaluate: jest.fn().mockResolvedValue({
        nama_penuh: 'Test User',
        no_ahli: '12345',
      }),
    }),
    close: jest.fn(),
  }),
};
