/// <reference types="vite/client" />


// env.d.ts
interface ImportMetaEnv {
    readonly VUE_APP_API_URL: string;
    // Add more environment variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}