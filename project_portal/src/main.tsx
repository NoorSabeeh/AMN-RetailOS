import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { WorkspaceProvider } from "./context/WorkspaceContext";
import { I18nProvider } from "./i18n/I18nProvider";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <I18nProvider>
        <WorkspaceProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </WorkspaceProvider>
      </I18nProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
