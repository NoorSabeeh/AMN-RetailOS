import { DocsLinkList } from "../components/DocsLinkList";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";

export function DocsHubPage() {
  const { data } = useWorkspace();
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold text-white">{t.docs}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          {t.docsHubDescription}
        </p>
      </section>
      <DocsLinkList docs={data.docsLinks} />
    </div>
  );
}
