/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly SUPER_TODO_API_URL: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}