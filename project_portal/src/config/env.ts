export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL?.trim() ?? "",
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "",
  repoBaseUrl: import.meta.env.VITE_REPO_BASE_URL?.trim() ?? "",
  repoRawBaseUrl: import.meta.env.VITE_REPO_RAW_BASE_URL?.trim() ?? "",
  repoBranch: import.meta.env.VITE_REPO_BRANCH?.trim() || "main"
};

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey);
export const isRepoConfigured = Boolean(env.repoBaseUrl);
