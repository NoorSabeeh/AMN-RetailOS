import { env, isRepoConfigured, isSupabaseConfigured } from "../config/env";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";

export function SetupHealthPage() {
  const { adapter, currentUser, error, lastSave, realtimeStatus } = useWorkspace();
  const { t } = useI18n();
  const signedIn = currentUser.authMode === "supabase";

  const checks = [
    ["Repository visibility risk", "Public GitHub Pages deployment requires strict auth gate"],
    ["Supabase configured", isSupabaseConfigured ? "Yes" : "No"],
    ["Current user signed in", signedIn ? "Yes" : "No"],
    ["Role detected", currentUser.roleLabel],
    ["Detected member_slug", currentUser.slug],
    ["Sync mode", adapter.mode === "supabase" ? "Supabase tables" : "Local fallback"],
    ["Repo base URL configured", isRepoConfigured ? "Yes" : "No"],
    ["Raw repo URL configured", env.repoRawBaseUrl ? "Yes" : "No"],
    ["Realtime status", adapter.mode === "supabase" ? realtimeStatus : "disabled in local fallback"],
    ["Last successful save", lastSave ? new Date(lastSave).toLocaleString() : "No save this session"],
    ["Backend B1 status", "Blocked"]
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold text-white">{t.setupHealthTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          {t.setupHealthDescription}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {checks.map(([label, value]) => (
          <article key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-semibold text-white">{value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-5">
        <h3 className="font-semibold text-amber-100">{t.environmentWarnings}</h3>
        <ul className="mt-3 space-y-2 text-sm text-amber-50/90">
          {!isSupabaseConfigured ? <li>Supabase sync is not active. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a local .env file.</li> : null}
          {!isRepoConfigured ? <li>GitHub document open actions need VITE_REPO_BASE_URL.</li> : null}
          <li>This repository is public. Unauthenticated visitors must remain on the public access gate page only.</li>
          <li>Deployment uses GitHub Secrets for Supabase environment values. Keep `.env.local` local-only.</li>
          <li>Never use or expose Supabase service_role keys in frontend code.</li>
          <li>Run and review `supabase/001_command_center_schema.sql` before live shared use.</li>
          <li>RLS must remain enabled; member writes are scoped by `member_slug` and viewer writes are denied.</li>
          <li>Do not commit real keys, .env, passwords, or private credentials.</li>
          <li>Public signup is not exposed in this UI; accounts must be created manually in Supabase Auth.</li>
          <li>Backend B1 remains blocked and is not marked complete.</li>
        </ul>
        {error ? <p className="mt-3 text-sm text-rose-100">Last error: {error}</p> : null}
      </section>
    </div>
  );
}
