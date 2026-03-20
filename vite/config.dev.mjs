import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './config.base.mjs';

export default mergeConfig(baseConfig, defineConfig({}));
