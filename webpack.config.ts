import * as path from 'path';
import { Configuration } from 'webpack';
const NodemonPlugin = require('nodemon-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';
const mode = isDevMode ? 'development' : 'production';

const config: Configuration = {
  mode,
  target: 'node',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [new NodemonPlugin()],
};

export default config;
