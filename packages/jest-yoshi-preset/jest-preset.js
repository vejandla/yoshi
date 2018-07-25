const { envs } = require('./constants');

module.exports = {
  globalSetup: require.resolve('jest-environment-yoshi-puppeteer/globalSetup'),
  globalTeardown: require.resolve(
    'jest-environment-yoshi-puppeteer/globalTeardown',
  ),
  projects: [
    ...[
      {
        displayName: 'component',
        testEnvironment: 'jsdom',
        testURL: 'http://localhost',
        testMatch: ['<rootDir>/src/**/*.spec.*'],
        moduleNameMapper: {
          '^.+\\.(css|scss)$': require.resolve('identity-obj-proxy'),
          '\\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|otf|eot|wav|mp3)$': require.resolve(
            './transforms/file.js',
          ),
        },
      },
      {
        displayName: 'server',
        testEnvironment: require.resolve('jest-environment-yoshi-bootstrap'),
        testMatch: ['<rootDir>/test/it/**/*.spec.*'],
      },
      {
        displayName: 'e2e',
        testEnvironment: require.resolve('jest-environment-yoshi-puppeteer'),
        testMatch: ['<rootDir>/test/e2e/**/*.e2e.*'],
      },
    ]
      .filter(({ displayName }) => {
        if (envs) {
          return envs.includes(displayName);
        }

        return true;
      })
      .map(project => {
        return {
          ...project,

          transform: {
            '^.+\\.(js)$': require.resolve('babel-jest'),
            '^.+\\.tsx?$': require.resolve('ts-jest'),
          },

          moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
        };
      }),
    // workaround for https://github.com/facebook/jest/issues/5866
    {
      displayName: 'dummy',
      testMatch: ['dummy'],
    },
  ],
};
