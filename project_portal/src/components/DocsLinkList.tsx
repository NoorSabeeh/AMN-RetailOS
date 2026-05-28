import type { DocLink } from "../types/portal";
import { env } from "../config/env";
import { useI18n } from "../i18n/I18nProvider";

function githubUrl(path: string) {
  return env.repoBaseUrl ? `${env.repoBaseUrl.replace(/\/$/, "")}/blob/${env.repoBranch}/${path}` : "";
}

function rawUrl(path: string) {
  return env.repoRawBaseUrl ? `${env.repoRawBaseUrl.replace(/\/$/, "")}/${path}` : "";
}

async function copyRepoPath(path: string) {
  const safePath = path.replaceAll("\\", "/").replace(/^\/+/, "");
  try {
    await navigator.clipboard.writeText(safePath);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = safePath;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

export function DocsLinkList({ docs }: { docs: DocLink[] }) {
  const { t } = useI18n();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {docs.map((doc) => (
        <article
          key={doc.path}
          className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-white">
              {githubUrl(doc.path) ? (
                <a href={githubUrl(doc.path)} target="_blank" rel="noreferrer" className="hover:text-amn-cyan">
                  {doc.title}
                </a>
              ) : (
                doc.title
              )}
            </h3>
            <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-400">{doc.category}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400">{doc.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <code className="break-all rounded-md bg-ink-950 px-2 py-1 text-xs text-amn-cyan">{doc.path}</code>
            <button
              type="button"
              onClick={() => void copyRepoPath(doc.path)}
              className="focus-ring rounded-md border border-white/10 px-2 py-1 text-xs font-semibold text-slate-200 hover:border-amn-cyan/60"
            >
              {t.copyPath}
            </button>
            {githubUrl(doc.path) ? (
              <a
                href={githubUrl(doc.path)}
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-md border border-white/10 px-2 py-1 text-xs font-semibold text-slate-200 hover:border-amn-cyan/60"
              >
                {t.openOnGithub}
              </a>
            ) : (
              <span className="text-xs text-slate-500">{t.setRepoBaseUrl}</span>
            )}
            {rawUrl(doc.path) ? (
              <a
                href={rawUrl(doc.path)}
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-md border border-white/10 px-2 py-1 text-xs font-semibold text-slate-200 hover:border-amn-cyan/60"
              >
                {t.openRaw}
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
