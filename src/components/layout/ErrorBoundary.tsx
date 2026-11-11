import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** Route-level error boundary. Catches render errors so the shell stays usable. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error("[error-boundary]", error, info.componentStack);
    }
    // Hook a monitoring service here later.
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-red-100 text-red-700">
          <AlertOctagon className="size-6" aria-hidden="true" />
        </span>
        <h1 className="font-heading text-3xl font-semibold text-maroon-800">
          Something went wrong
        </h1>
        <p className="max-w-md font-sans text-sm leading-7 text-muted-foreground">
          An unexpected error occurred while showing this page. Reloading usually fixes it. If it
          keeps happening, message the office and a consultant will help.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Button onClick={this.handleReload}>Reload page</Button>
          <Button variant="outline" asChild>
            <a href="/">Back to home</a>
          </Button>
        </div>
      </div>
    );
  }
}
