import { useMemo, useState } from "react";
import { DocsLinkList } from "../components/DocsLinkList";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";

export function DocsHubPage() {
  const { data } = useWorkspace();
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    return Array.from(new Set(data.docsLinks.map((doc) => doc.category))).filter(Boolean);
  }, [data.docsLinks]);

  const visibleDocs = useMemo(() => {
    return data.docsLinks.filter((doc) => {
      const byCategory = category === "all" || doc.category === category;
      const needle = search.toLowerCase();
      const bySearch = !needle || doc.title.toLowerCase().includes(needle) || doc.path.toLowerCase().includes(needle) || doc.description.toLowerCase().includes(needle);
      return byCategory && bySearch;
    });
  }, [data.docsLinks, category, search]);

  const teamDocsByGroup = useMemo(() => {
    const teamDocs = data.docsLinks.filter((doc) => doc.path.startsWith("team/"));
    const groups = [
      { key: "Noor", match: (path: string) => path === "team/NOOR_WORK_PACKAGE.md" },
      { key: "Ali", match: (path: string) => path === "team/ALI_WORK_PACKAGE.md" },
      { key: "Mohammed", match: (path: string) => path === "team/MOHAMMED_WORK_PACKAGE.md" },
      { key: "Murtadha", match: (path: string) => path === "team/MURTADHA_WORK_PACKAGE.md" },
      {
        key: "Shared Templates",
        match: (path: string) =>
          path === "team/README.md" ||
          path === "team/HANDOFF_TEMPLATE.md" ||
          path === "team/TELEGRAM_UPDATE_TEMPLATE.md" ||
          path === "team/FILE_SUBMISSION_RULES.md" ||
          path === "team/AI_PROMPT_GUIDE.md" ||
          path === "team/PHASE_B1_TEAM_PLAN.md"
      }
    ] as const;

    return groups
      .map((group) => ({
        name: group.key,
        docs: teamDocs.filter((doc) => group.match(doc.path))
      }))
      .filter((group) => group.docs.length > 0);
  }, [data.docsLinks]);

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <h2 className="text-3xl font-semibold text-white">{t.docs}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{t.docsHubDescription}</p>
      </section>

      <section className="panel p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-white">{t.search}</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.searchDocs} className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-white">{t.category}</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200">
              <option value="all">{t.allCategories}</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {teamDocsByGroup.length > 0 ? (
        <section className="panel p-5">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Team Docs / Team Work Packages</h3>
            <p className="text-sm text-slate-400">Read your work package first, then use the Telegram update template.</p>
          </div>
          <div className="mt-5 space-y-6">
            {teamDocsByGroup.map((group) => (
              <div key={group.name} className="space-y-3">
                <h4 className="text-sm font-semibold tracking-wide text-slate-300">{group.name}</h4>
                <DocsLinkList docs={group.docs} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {visibleDocs.length === 0 ? <section className="panel p-5 text-sm text-slate-400">{t.emptyDocsState}</section> : <DocsLinkList docs={visibleDocs} />}
    </div>
  );
}
