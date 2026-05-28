import { useState } from "react";
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
    return true;
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = safePath;
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textArea);
    return copied;
  }
}

export function DocsLinkList({ docs }: { docs: DocLink[] }) {
  const { t } = useI18n();
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopy = async (path: string) => {
    const ok = await copyRepoPath(path);
    setCopyMessage(ok ? t.copySuccess : t.copyFailed);
  };

  return (
    <div className="space-y-3">
      {copyMessage ? <p className="text-sm text-slate-300">{copyMessage}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {docs.map((doc) => (
          <article key={doc.path} className="panel p-4">
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
              <span className="chip text-slate-400">{doc.category}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{doc.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <code className="break-all rounded-md bg-ink-950 px-2 py-1 text-xs text-amn-cyan">{doc.path}</code>
              <button type="button" onClick={() => void handleCopy(doc.path)} className="focus-ring rounded-md border border-white/10 px-2 py-1 text-xs font-semibold text-slate-200 hover:border-amn-cyan/60">
                {t.copyPath}
              </button>
              {githubUrl(doc.path) ? (
                <a href={githubUrl(doc.path)} target="_blank" rel="noreferrer" className="focus-ring rounded-md border border-white/10 px-2 py-1 text-xs font-semibold text-slate-200 hover:border-amn-cyan/60">
                  {t.openOnGithub}
                </a>
              ) : (
                <span className="text-xs text-slate-500">{t.setRepoBaseUrl}</span>
              )}
              {rawUrl(doc.path) ? (
                <a href={rawUrl(doc.path)} target="_blank" rel="noreferrer" className="focus-ring rounded-md border border-white/10 px-2 py-1 text-xs font-semibold text-slate-200 hover:border-amn-cyan/60">
                  {t.openRaw}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
