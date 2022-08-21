declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            readonly NODE_ENV: 'production' | 'development'
            readonly PORT: number
            readonly HOSTNAME: string
            readonly CLIENT_BASE_URL: string
        }
    }

    interface Error {
        code?: number
    }
}

export {}
