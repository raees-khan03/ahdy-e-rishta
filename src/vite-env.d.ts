/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_USE_MOCK_API?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_WHATSAPP_MESSAGE?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_ANALYTICS_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
