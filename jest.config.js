const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Raíz de tu proyecto Next.js
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Mock de CSS y similares
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

module.exports = createJestConfig(customJestConfig);
