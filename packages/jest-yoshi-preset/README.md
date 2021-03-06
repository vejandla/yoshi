## 🤹 Jest yoshi preset

> Jest setup for Yoshi based projects

### Introduction

This preset configures Jest with 3 different environments ([learn more](https://jestjs.io/docs/en/configuration#testenvironment-string)). Each environment sets up its own globals and is configured to run for every file that matches a certain glob pattern ([learn more](https://github.com/isaacs/node-glob)).

### Usage

Install by running:

```bash
npm install --save-dev jest-yoshi-preset puppeteer jest
```

Add the following to your Jest config:

```json
{
    "preset": "jest-yoshi-preset"
}
```

### Environments

#### JSDOM environment

Sets up a standard [JSDOM](https://github.com/jsdom/jsdom) environment for component tests.

It's configured for every file under `<rootDir>/src/**/*.spec.js`.

#### Server environment

An environment for testing your server (API) code. It starts up a different instance of your server ([wix-ng-bootstarp based](https://github.com/wix-platform/wix-node-platform)) for every test file.

The wrapper that controls your server ([learn more](https://github.com/wix-platform/wix-node-platform/tree/master/bootstrap/wix-bootstrap-testkit)) is available as `global.app`.

If you're using RPC calls, you can use the pre-configured RPC wrapper ([learn more](https://github.com/wix-platform/wix-node-platform/tree/master/rpc/wix-json-rpc-client)) that's available as `global.rpcServer`.

Runs for every test file matching `<rootDir>/test/it/**/*.spec.js`.

#### Puppeteer environment

An environment that pre-configures [Puppeteer](https://github.com/GoogleChrome/puppeteer) for running your E2E tests.

It creates a global Browser instance ([learn more](https://github.com/GoogleChrome/puppeteer/blob/v1.5.0/docs/api.md#class-browser)) for every test file that's available as `global.browser`.

Runs for every file that matches `<rootDir>/test/e2e/**/*.e2e.js`.

### Configuration

This preset looks for a `jest-yoshi.config.js` file at the root of your project. The exported object is used to configure different parts of the preset.

```js
module.exports = {
  bootstrap: {
    emit: async (emitter, { rpcServer }) => {
      await emitter
        .fn('scripts_domain', 'static.parastorage.com')
        .fn(
          'static_url',
          'com.wixpress.autogenerated-fullstack',
          'http://localhost:3200/',
        )
        .fn(
          'service_url',
          'com.wixpress.npm.node-workshop-scala-app',
          rpcServer.getUrl(),
        )
        .emit();
    },
  },
  puppeteer: {
    headless: true,
  },
};
```
