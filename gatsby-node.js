'use strict';

require('source-map-support').install();

require('tsconfig-paths').register({
  baseUrl: './',
  paths: {
    '@src/*': ['src/*'],
    '@test/*': ['test/*'],
  },
});

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
    noImplicitAny: false,
    types: ['node'],
  },
});

const { resolve } = require('path');

const config = require('./gatsby-node-impl');

exports.onCreatePage = config.onCreatePage;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@src': resolve(__dirname, 'src/'),
        '@test': resolve(__dirname, 'test/'),
      },
    },
  });
};
