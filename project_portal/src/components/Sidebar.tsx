import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";
import { useWorkspace } from "../context/WorkspaceContext";

export function Sidebar() {
  const { t } = useI18n();
  const { currentUser } = useWorkspace();
  const viewerMode = currentUser.role === "viewer";
  const navItems = [
    { to: "/", label: t.overview },
    { to: "/roadmap", label: t.roadmap },
    { to: "/backend-b1-blocker", label: t.b1Blocker },
    { to: "/health", label: t.health },
    { to: "/github-readiness", label: t.github }
  ];
  const internalNavItems = [
    { to: "/team-execution", label: t.execution },
    { to: "/team", label: t.team },
    { to: "/tasks", label: t.tasks },
    { to: "/phase-t1", label: t.phaseT1 },
    { to: "/docs", label: t.docs },
    { to: "/updates", label: t.updates },
    { to: "/blockers", label: t.blockers },
    { to: "/decisions", label: t.decisions },
    { to: "/audit", label: t.audit }
  ];
  const items = viewerMode ? navItems : [...navItems.slice(0, 2), ...internalNavItems, ...navItems.slice(2)];

  return (
    <aside className="border-b border-white/10 bg-ink-950/95 p-3 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:p-4">
      <div className="panel border-amn-cyan/20 bg-amn-cyan/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amn-cyan">{t.internalPortal}</p>
        <h1 className="mt-2 text-lg font-semibold text-white lg:text-xl">{t.portalName}</h1>
        <p className="mt-2 text-xs leading-5 text-slate-300 lg:text-sm lg:leading-6">{t.portalBoundary}</p>
      </div>

      <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:mt-6 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `focus-ring whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition lg:block ${
                isActive ? "bg-amn-cyan text-ink-950" : "bg-white/[0.03] text-slate-300 hover:bg-white/10 hover:text-white"
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
