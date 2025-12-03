import React from "react";
import { Warning, ArrowClockwise } from "phosphor-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <div className="mb-4 rounded-full bg-red-100 p-4 text-red-500">
            <Warning size={48} weight="fill" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Something went wrong
          </h1>
          <p className="mb-6 max-w-md text-gray-500">
            We're sorry, but an unexpected error occurred in the application.
          </p>
          <div className="rounded-lg bg-gray-200 p-4 mb-6 text-left text-xs text-gray-700 font-mono w-full max-w-lg overflow-auto">
            {this.state.error?.toString()}
          </div>
          <button
            onClick={this.handleReload}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            <ArrowClockwise size={20} weight="bold" /> Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
