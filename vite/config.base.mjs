import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    build: {
        rolldownOptions: {
            output: {
                codeSplitting: {    // manual code splitting to keep phaser as a separate asset (reduces reloading times)
                    groups: [
                        {name: 'phaser', test: /node_modules[\\/]phaser[\\/]/}
                    ]
                }
            }
        }
    },
    server: {
        port: 8080
    }
});
