declare global {
  // Add type support for NodeJS process.env
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_SITE_URL: string;
      // Add other env variables as needed
    }
  }

  // Add type support for custom window properties if needed
  interface Window {
    // Add custom window properties here
  }
}

export {};
