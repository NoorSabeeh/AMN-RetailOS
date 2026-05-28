import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  safeMessage: string;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    safeMessage: ""
  };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      safeMessage: sanitizeMessage(error)
    };
  }

  componentDidCatch() {
    // Intentionally avoid rendering stack traces in the UI.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink-950 px-5 py-10">
          <section className="w-full max-w-xl rounded-lg border border-rose-300/25 bg-rose-300/10 p-6 text-rose-50">
            <h1 className="text-2xl font-semibold text-white">Command Center failed to load</h1>
            <p className="mt-3 text-sm leading-6 text-rose-100">
              A runtime issue prevented the portal from loading safely. Refresh the page and try again.
            </p>
            {this.state.safeMessage ? <p className="mt-3 text-xs text-rose-200">{this.state.safeMessage}</p> : null}
          </section>
        </div>
      );
    }

    return this.props.children;
  }
}

function sanitizeMessage(error: unknown) {
  if (!(error instanceof Error) || !error.message) return "";
  const normalized = error.message.replace(/[A-Za-z]:\\[^ ]+/g, "[path]").replace(/file:\/\/\S+/g, "[path]").trim();
  if (!normalized) return "";
  return normalized.length > 180 ? `${normalized.slice(0, 177)}...` : normalized;
}
