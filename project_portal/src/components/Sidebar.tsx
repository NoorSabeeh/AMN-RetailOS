import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

export function Sidebar() {
  const { t } = useI18n();
  const navItems = [
    { to: "/", label: t.overview },
    { to: "/roadmap", label: t.roadmap },
    { to: "/team-execution", label: t.execution },
    { to: "/team", label: t.team },
    { to: "/tasks", label: t.tasks },
    { to: "/phase-t1", label: t.phaseT1 },
    { to: "/backend-b1-blocker", label: t.b1Blocker },
    { to: "/docs", label: t.docs },
    { to: "/updates", label: t.updates },
    { to: "/blockers", label: t.blockers },
    { to: "/decisions", label: t.decisions },
    { to: "/audit", label: t.audit },
    { to: "/health", label: t.health },
    { to: "/github-readiness", label: t.github }
  ];

  return (
    <aside className="border-r border-white/10 bg-ink-950/95 p-4 lg:sticky lg:top-0 lg:h-screen">
      <div className="rounded-lg border border-amn-cyan/20 bg-amn-cyan/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amn-cyan">{t.internalPortal}</p>
        <h1 className="mt-2 text-xl font-semibold text-white">{t.portalName}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">{t.portalBoundary}</p>
      </div>

      <nav className="mt-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `focus-ring block rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive ? "bg-amn-cyan text-ink-950" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
