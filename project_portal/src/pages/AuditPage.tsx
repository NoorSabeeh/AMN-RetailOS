import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";

export function AuditPage() {
  const { data } = useWorkspace();
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold text-white">{t.auditTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          {t.auditDescription}
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h3 className="font-semibold text-white">{t.notifications}</h3>
          <div className="mt-4 space-y-3">
            {data.notifications.map((notification) => (
              <article key={notification.id} className="rounded-md bg-ink-950/60 p-3">
                <h4 className="font-semibold text-white">{notification.title}</h4>
                <p className="mt-1 text-sm text-slate-300">{notification.message}</p>
                <p className="mt-2 text-xs text-slate-500">{notification.kind} - {new Date(notification.createdAt).toLocaleString()}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h3 className="font-semibold text-white">{t.auditEvents}</h3>
          <div className="mt-4 space-y-3">
            {data.auditEvents.map((event) => (
              <article key={event.id} className="rounded-md bg-ink-950/60 p-3">
                <h4 className="font-semibold text-white">{event.action}</h4>
                <p className="mt-1 text-sm text-slate-300">{event.summary}</p>
                <p className="mt-2 text-xs text-slate-500">{event.actor} - {event.entityType}/{event.entityId} - {new Date(event.timestamp).toLocaleString()}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
