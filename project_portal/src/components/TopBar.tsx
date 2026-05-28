import { localUsers, useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { permissionSummary } from "../services/access";

export function TopBar() {
  const { adapter, currentUser, setLocalUser, refresh, lastSave, signOut } = useWorkspace();
  const { language, setLanguage, t } = useI18n();
  const isSupabaseSignedIn = adapter.mode === "supabase" && currentUser.authMode === "supabase";
  const roleTone =
    currentUser.role === "admin"
      ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
      : currentUser.role === "member"
        ? "border-sky-300/30 bg-sky-300/10 text-sky-100"
        : "border-white/20 bg-white/10 text-slate-200";

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-ink-950/70 px-4 py-3 backdrop-blur sm:px-5 sm:py-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">AMN TEAM</p>
        <p className="mt-1 text-xs text-slate-300 sm:text-sm">{t.phaseBanner}</p>
        <p className="mt-1 max-w-3xl text-[11px] text-slate-500 sm:text-xs">{permissionSummary(currentUser)}</p>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
        <span className="chip border-amn-cyan/30 bg-amn-cyan/10 text-amn-cyan">
          {t.sync}: {adapter.mode === "supabase" ? t.supabase : t.localFallback}
        </span>
        <span className={`chip ${roleTone}`}>{currentUser.roleLabel}</span>
        <span className="chip bg-white/[0.04] text-slate-300">Retail/Grocery + Basic Wholesale</span>
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value === "ar" ? "ar" : "en")}
          className="focus-ring rounded-md border border-white/10 bg-ink-950 px-3 py-1.5 text-slate-200"
          aria-label={t.language}
        >
          <option value="en">English</option>
          <option value="ar">{"\u0627\u0644\u0639\u0631\u0628\u064a\u0629"}</option>
        </select>
        {adapter.mode === "local" ? (
          <select
            value={currentUser.slug}
            onChange={(event) => setLocalUser(event.target.value)}
            className="focus-ring rounded-md border border-white/10 bg-ink-950 px-3 py-1.5 text-slate-200"
            aria-label={t.role}
          >
            {localUsers.map((user) => (
              <option key={user.slug} value={user.slug}>
                {user.name} - {user.roleLabel}
              </option>
            ))}
          </select>
        ) : isSupabaseSignedIn ? (
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-300">{currentUser.name}</span>
            <button onClick={() => void signOut()} className="focus-ring rounded-md border border-white/10 px-3 py-1.5 font-semibold text-slate-200">
              {t.signOut}
            </button>
          </div>
        ) : (
          <span className="text-slate-500">{t.assignedAccountsOnly}</span>
        )}
        <button onClick={() => void refresh()} className="focus-ring rounded-md border border-white/10 px-3 py-1.5 font-semibold text-slate-200">
          {t.refresh}
        </button>
        {lastSave ? (
          <span className="text-slate-500">
            {t.lastSave}: {new Date(lastSave).toLocaleTimeString()}
          </span>
        ) : null}
      </div>
    </header>
  );
}
