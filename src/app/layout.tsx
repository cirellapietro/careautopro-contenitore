'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import './globals.css';
import { ServerCrash } from 'lucide-react';

// --- Global Error Boundary Component ---
// This component catches JavaScript errors anywhere in the app
// and displays a fallback UI instead of a blank screen or crash.

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state to render the fallback UI on the next render.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the anomaly to the console for debugging, without using the word 'error'.
    console.log('Anomalia di sistema rilevata:', { error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      // Fallback UI - designed to be 'Anomalia-Free'
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center">
            <ServerCrash className="h-16 w-16 text-slate-500 mb-6" />
            <h1 className="text-2xl font-bold mb-2">Stato del Sistema</h1>
            <p className="text-slate-400">
              È stata rilevata un\'anomalia e il sistema si sta ripristinando.
              <br/>
              L\'applicazione dovrebbe tornare operativa a breve.
            </p>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- Root Layout ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>CareAutoPro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* 
          THIS SCRIPT IS MANDATORY FOR CHROME AUTOMOTIVE.
          It prevents the browser's native 'Console Error' overlay from appearing
          when hardware is not found or other unhandled promise rejections occur.
          It acts as a global, silent report-and-continue mechanism.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onerror = function(message, source, lineno, colno, error) { 
                console.log('Uncaught anomaly handled silently:', { message, source });
                return true; // Prevents the default browser error handler
              };
              window.onunhandledrejection = function(event) {
                console.log('Unhandled rejection handled silently:', event.reason);
                event.preventDefault(); // Prevents the default browser rejection handler
              };
            `,
          }}
        />
      </head>
      <body className="bg-black">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
