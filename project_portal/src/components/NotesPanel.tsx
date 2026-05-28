export function NotesPanel({
  value,
  onChange,
  title = "Notes"
}: {
  value: string;
  onChange: (value: string) => void;
  title?: string;
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <label className="block text-sm font-semibold text-white" htmlFor={`notes-${title}`}>
        {title}
      </label>
      <textarea
        id={`notes-${title}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Add internal planning notes. Stored only in this browser."
        className="focus-ring mt-3 min-h-36 w-full resize-y rounded-md border border-white/10 bg-ink-950/80 p-3 text-sm text-slate-200 placeholder:text-slate-600"
      />
    </section>
  );
}
