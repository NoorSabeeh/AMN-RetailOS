import { useRef, useState } from "react";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import type { TeamUpdate } from "../types/portal";

const emptyForm = {
  id: "",
  date: new Date().toISOString().slice(0, 10),
  title: "",
  memberSlug: "noor",
  phase: "phase-t1",
  done: "",
  blocked: "",
  next: "",
  notes: "",
  tags: ""
};

export function UpdatesPage() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { data, currentUser, upsertUpdate, deleteUpdate, saveData } = useWorkspace();
  const { t } = useI18n();
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const selectedMember = data.teamMembers.find((member) => member.slug === form.memberSlug) ?? data.teamMembers[0];
  const editable = currentUser.role === "admin" || (currentUser.role === "member" && currentUser.slug === form.memberSlug);

  const save = async () => {
    if (!form.title.trim()) {
      setMessage("Title is required.");
      return;
    }
    const timestamp = new Date().toISOString();
    await upsertUpdate({
      id: form.id || crypto.randomUUID(),
      date: form.date,
      title: form.title,
      role: selectedMember.role,
      memberSlug: selectedMember.slug,
      phase: form.phase,
      done: form.done,
      blocked: form.blocked,
      next: form.next,
      notes: form.notes,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      updatedAt: timestamp,
      updatedBy: currentUser.slug
    });
    setForm(emptyForm);
    setMessage("Update saved.");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data.updates, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `amn-retailos-updates-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      if (!Array.isArray(parsed) || !parsed.every(isTeamUpdate)) {
        setMessage("Import failed: JSON must be an array of valid update records.");
        return;
      }
      await saveData({ ...data, updates: parsed }, "updates_imported", "member_updates", "bulk", `Imported ${parsed.length} updates`);
      setMessage(`Imported ${parsed.length} update${parsed.length === 1 ? "" : "s"}.`);
    } catch {
      setMessage("Import failed: choose a valid JSON export file.");
    }
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold text-white">{t.updates}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          {t.updatesDescription}
        </p>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Date" value={form.date} onChange={(date) => setForm({ ...form, date })} type="date" />
          <Field label={t.updateTitle} value={form.title} onChange={(title) => setForm({ ...form, title })} />
          <label className="block">
            <span className="text-sm font-semibold text-white">{t.member}</span>
            <select value={form.memberSlug} onChange={(event) => setForm({ ...form, memberSlug: event.target.value })} className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200">
              {data.teamMembers.map((member) => (
                <option key={member.slug} value={member.slug}>
                  {member.name} - {member.role}
                </option>
              ))}
            </select>
          </label>
          <Field label={t.phase} value={form.phase} onChange={(phase) => setForm({ ...form, phase })} />
          <Field label={t.tags} value={form.tags} onChange={(tags) => setForm({ ...form, tags })} />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Area label={t.done} value={form.done} onChange={(done) => setForm({ ...form, done })} />
          <Area label={t.blocked} value={form.blocked} onChange={(blocked) => setForm({ ...form, blocked })} />
          <Area label={t.next} value={form.next} onChange={(next) => setForm({ ...form, next })} />
          <Area label={t.notes} value={form.notes} onChange={(notes) => setForm({ ...form, notes })} />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button disabled={!editable} onClick={() => void save()} className="focus-ring rounded-md bg-amn-cyan px-4 py-2 text-sm font-semibold text-ink-950 disabled:opacity-50">
            {t.saveUpdate}
          </button>
          <button onClick={exportJson} className="focus-ring rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white">
            {t.exportJson}
          </button>
          <button onClick={() => fileRef.current?.click()} className="focus-ring rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white">
            {t.importJson}
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void importJson(file);
            event.currentTarget.value = "";
          }} />
        </div>
        {message ? <p className="mt-3 text-sm text-slate-300">{message}</p> : null}
      </section>

      <section className="space-y-4">
        {data.updates.map((update) => (
          <article key={update.id} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{update.title}</h3>
                <p className="mt-1 text-sm text-amn-cyan">{update.role} - {update.phase}</p>
              </div>
              <p className="text-sm text-slate-400">{update.date}</p>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <UpdateBlock title={t.done} value={update.done} />
              <UpdateBlock title={t.blocked} value={update.blocked} />
              <UpdateBlock title={t.next} value={update.next} />
              <UpdateBlock title={t.notes} value={update.notes} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  setForm({
                    id: update.id,
                    date: update.date,
                    title: update.title,
                    memberSlug: update.memberSlug ?? "noor",
                    phase: update.phase,
                    done: update.done,
                    blocked: update.blocked,
                    next: update.next,
                    notes: update.notes,
                    tags: update.tags.join(", ")
                  })
                }
                className="focus-ring rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-white"
              >
                {t.edit}
              </button>
              <button onClick={() => void deleteUpdate(update.id)} className="focus-ring rounded-md border border-rose-300/30 px-3 py-1.5 text-xs font-semibold text-rose-100">
                {t.delete}
              </button>
              <span className="text-xs text-slate-500">Last updated {new Date(update.updatedAt).toLocaleString()}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function isTeamUpdate(value: unknown): value is TeamUpdate {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return ["id", "date", "title", "role", "phase", "done", "blocked", "next", "notes", "updatedAt"].every((key) => typeof item[key] === "string") && Array.isArray(item.tags);
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200" />
    </label>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 min-h-28 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200" />
    </label>
  );
}

function UpdateBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-md bg-ink-950/60 p-3">
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</h4>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">{value || "No entry."}</p>
    </div>
  );
}
