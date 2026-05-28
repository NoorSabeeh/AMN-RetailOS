import { TeamCard } from "../components/TeamCard";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";

export function TeamPage() {
  const { data } = useWorkspace();
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold text-white">{t.teamRolesTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          {t.teamRolesDescription}
        </p>
      </section>
      <div className="grid gap-5 lg:grid-cols-2">
        {data.teamMembers.map((member) => (
          <TeamCard key={member.slug} member={member} />
        ))}
      </div>
    </div>
  );
}
