import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './config.base.mjs';

export default mergeConfig(baseConfig, defineConfig({
    build: {
        assetsInlineLimit: 0,           // avoids that referenced assets (pictures) are inlined as base64 URLs, as Phaser does not support them!
        chunkSizeWarningLimit: 1500,    // increase chunk size warning limit from 500 KiB to 1500 as phaser is pretty big
    }
}));
