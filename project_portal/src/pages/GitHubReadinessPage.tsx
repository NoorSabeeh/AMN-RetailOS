import { useI18n } from "../i18n/I18nProvider";

export function GitHubReadinessPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold text-white">{t.githubReadinessTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          {t.githubReadinessDescription}
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <CommandCard title={t.runLocally} commands={["cd project_portal", "npm install", "npm run dev"]} />
        <CommandCard title={t.build} commands={["cd project_portal", "npm run build"]} />
        <CommandCard title={t.previewProductionBuild} commands={["cd project_portal", "npm run preview"]} />
        <CommandCard title={t.pushToGithub} commands={["git add project_portal README.md CODEX_STATUS.md TASKS.md", "git commit -m \"Upgrade internal command center\"", "git push"]} />
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h3 className="text-xl font-semibold text-white">{t.optionalGithubPagesLater}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          The app uses relative build assets and hash-based routing, which is friendly for static hosting under a repository
          subpath. Deployment is intentionally not automated here.
        </p>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h3 className="text-xl font-semibold text-white">{t.supabaseSetupLater}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Use `project_portal/.env.example` as a template and keep real values in `.env` only. Accounts are manually created in
          Supabase Auth; this portal does not expose public signup and does not store passwords in code.
        </p>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h3 className="text-xl font-semibold text-white">{t.boundaries}</h3>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          {[
            "No AMN RetailOS product backend runtime",
            "Supabase Auth only for this internal portal when configured",
            "No cloud services except optional Supabase portal sync",
            "No external APIs except Supabase via env configuration",
            "No secrets or credentials",
            "No POS/cashier product screens",
            "No delayed product modes implemented"
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amn-cyan" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function CommandCard({ title, commands }: { title: string; commands: string[] }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <pre className="mt-4 overflow-x-auto rounded-md bg-ink-950 p-4 text-sm text-amn-cyan">
        <code>{commands.join("\n")}</code>
      </pre>
    </article>
  );
}
