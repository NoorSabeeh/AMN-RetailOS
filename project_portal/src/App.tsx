import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { BackendB1BlockerPage } from "./pages/BackendB1BlockerPage";
import { AuditPage } from "./pages/AuditPage";
import { BlockersPage } from "./pages/BlockersPage";
import { DecisionsPage } from "./pages/DecisionsPage";
import { DocsHubPage } from "./pages/DocsHubPage";
import { GitHubReadinessPage } from "./pages/GitHubReadinessPage";
import { MemberPage } from "./pages/MemberPage";
import { OverviewPage } from "./pages/OverviewPage";
import { PhaseT1Page } from "./pages/PhaseT1Page";
import { RoadmapPage } from "./pages/RoadmapPage";
import { SetupHealthPage } from "./pages/SetupHealthPage";
import { TasksPage } from "./pages/TasksPage";
import { TeamExecutionPage } from "./pages/TeamExecutionPage";
import { TeamPage } from "./pages/TeamPage";
import { UpdatesPage } from "./pages/UpdatesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team-execution" element={<TeamExecutionPage />} />
        <Route path="/team/:slug" element={<MemberPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/phase-t1" element={<PhaseT1Page />} />
        <Route path="/backend-b1-blocker" element={<BackendB1BlockerPage />} />
        <Route path="/docs" element={<DocsHubPage />} />
        <Route path="/updates" element={<UpdatesPage />} />
        <Route path="/blockers" element={<BlockersPage />} />
        <Route path="/decisions" element={<DecisionsPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/health" element={<SetupHealthPage />} />
        <Route path="/github-readiness" element={<GitHubReadinessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
