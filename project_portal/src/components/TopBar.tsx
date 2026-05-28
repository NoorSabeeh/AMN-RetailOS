import { localUsers, useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { permissionSummary } from "../services/access";
import { useState } from "react";

export function TopBar() {
  const { adapter, currentUser, setLocalUser, refresh, lastSave, signIn, signOut } = useWorkspace();
  const { language, setLanguage, t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-ink-950/70 px-5 py-4 backdrop-blur">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">AMN TEAM</p>
        <p className="mt-1 text-sm text-slate-300">{t.phaseBanner}</p>
        <p className="mt-1 max-w-3xl text-xs text-slate-500">{permissionSummary(currentUser)}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-amn-cyan/30 bg-amn-cyan/10 px-3 py-1.5 font-semibold text-amn-cyan">
          {t.sync}: {adapter.mode === "supabase" ? t.supabase : t.localFallback}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-slate-300">
          Retail/Grocery + Basic Wholesale
        </span>
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value === "ar" ? "ar" : "en")}
          className="focus-ring rounded-md border border-white/10 bg-ink-950 px-3 py-1.5 text-slate-200"
          aria-label={t.language}
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
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
        ) : (
          <>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Assigned email"
              className="focus-ring w-36 rounded-md border border-white/10 bg-ink-950 px-3 py-1.5 text-slate-200"
            />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Password"
              className="focus-ring w-32 rounded-md border border-white/10 bg-ink-950 px-3 py-1.5 text-slate-200"
            />
            <button
              onClick={async () => {
                const error = await signIn(email, password);
                setAuthMessage(error ?? "Signed in.");
                setPassword("");
              }}
              className="focus-ring rounded-md border border-white/10 px-3 py-1.5 font-semibold text-slate-200"
            >
              Sign in
            </button>
            <button onClick={() => void signOut()} className="focus-ring rounded-md border border-white/10 px-3 py-1.5 font-semibold text-slate-200">
              Sign out
            </button>
          </>
        )}
        <button onClick={() => void refresh()} className="focus-ring rounded-md border border-white/10 px-3 py-1.5 font-semibold text-slate-200">
          {t.refresh}
        </button>
        {lastSave ? <span className="text-slate-500">Saved {new Date(lastSave).toLocaleTimeString()}</span> : null}
        {authMessage ? <span className="text-slate-500">{authMessage}</span> : null}
      </div>
    </header>
  );
}
