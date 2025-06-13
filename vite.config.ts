import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
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
        server: config,
        preview: config,
        build: {
            minify: true
        }
    }
})
