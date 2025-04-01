/// <reference types="react-scripts" />

interface ImportMetaEnv {
    readonly VITE_BACK_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}