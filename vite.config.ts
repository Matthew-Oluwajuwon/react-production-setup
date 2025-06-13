/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv, type ServerOptions } from 'vite'

type EnvMode = 'development' | 'production' | 'test'

interface AppEnv {
    PORT: string
    VITE_ENV: EnvMode
    BACKEND_PROXY: string
}

const validateEnv = (envMode: EnvMode, env: AppEnv) => {
    const requiredVars: (keyof AppEnv)[] = ['PORT', 'VITE_ENV']

    for (const key of requiredVars) {
        if (!env[key]) {
            throw new Error(`Missing environment variable: ${key} in mode ${envMode}`)
        }
    }
}

const normalizePort = (port: string): number => {
    const parsedPort = parseInt(port, 10)
    if (isNaN(parsedPort)) {
        throw new Error(`Invalid port number: ${port}`)
    }
    return parsedPort >= 0 ? parsedPort : 3000 // Ensure port is non-negative
}

export default defineConfig(({ mode }) => {
    const envMode = mode as EnvMode
    const env = loadEnv(envMode, process.cwd(), '') as unknown as AppEnv

    validateEnv(envMode, env)

    const port = normalizePort(env.PORT)

    const config: ServerOptions = {
        port,
        open: true,
        proxy: {
            '/api': {
                target: env.BACKEND_PROXY,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }

    return {
        plugins: [react(), tailwindcss()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/setupTests.ts',
            css: true,
            include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            exclude: ['node_modules', 'dist', 'build'],
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html'],
                include: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
                exclude: [
                    'coverage',
                    'dist',
                    'build',
                    'src/**/*.d.ts',
                    'src/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
                    'src/**/*.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
                ],
                thresholds: {
                    statements: 40,
                    branches: 40,
                    functions: 40,
                    lines: 40
                }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        server: config,
        preview: config,
        build: {
            minify: true,
            rollupOptions: {
                external: [/.*\.(test|spec)\.(ts|tsx)$/, /.*\.(test|spec)\.(js|jsx)$/, /.*\.(test|spec)\.(mjs|cjs)$/, /.*\.(test|spec)\.(mts|cts)$/]
            }
        }
    }
})
