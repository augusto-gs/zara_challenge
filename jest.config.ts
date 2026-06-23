import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(scss|sass|css)$': '<rootDir>/src/mocks/styleMock.ts',
  },
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};

export default config;
