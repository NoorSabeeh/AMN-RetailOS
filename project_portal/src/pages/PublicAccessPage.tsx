import { useState } from "react";
import { isSupabaseConfigured } from "../config/env";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";

export function PublicAccessPage() {
  const { signIn, loading } = useWorkspace();
  const { language, setLanguage, t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = async () => {
    if (signingIn) return;
    setSigningIn(true);
    setAuthMessage("");
    const error = await signIn(email.trim(), password);
    setSigningIn(false);
    setPassword("");
    setAuthMessage(error ?? t.signInSuccess);
  };

  return (
    <div className="min-h-screen bg-ink-950 px-4 py-12 sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amn-cyan">{t.internalPortal}</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{t.portalName}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">{t.publicPortalDescription}</p>
          <p className="mt-2 text-sm text-slate-400">{t.publicPortalSignInHelp}</p>
          <p className="mt-2 text-sm text-slate-400">{t.assignedAccountsOnly}</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-lg font-semibold text-white">{t.signInTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-white">{t.email}</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                autoComplete="username"
                placeholder="Assigned email"
                className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-white">{t.password}</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200"
              />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={signingIn || loading || !isSupabaseConfigured}
              onClick={() => void handleSignIn()}
              className="focus-ring rounded-md bg-amn-cyan px-4 py-2 text-sm font-semibold text-ink-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {signingIn ? t.signingIn : t.signInTitle}
            </button>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value === "ar" ? "ar" : "en")}
              className="focus-ring rounded-md border border-white/10 bg-ink-950 px-3 py-2 text-sm text-slate-200"
              aria-label={t.language}
            >
              <option value="en">English</option>
              <option value="ar">{"\u0627\u0644\u0639\u0631\u0628\u064a\u0629"}</option>
            </select>
          </div>
          {authMessage ? <p className="mt-3 text-sm text-rose-100">{authMessage}</p> : null}
        </div>

        <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-100">{t.connectionStatus}</h2>
          <ul className="mt-3 space-y-2 text-sm text-amber-50/90">
            <li>{t.unauthenticatedGateNote}</li>
            <li>
              {t.supabase}: {isSupabaseConfigured ? t.connected : t.notConfigured}
            </li>
            <li>{t.publicSignupDisabled}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


