import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Create a debug function to help with debugging
const debug = (message: string) => {
  console.log(`[DEBUG] ${message}`);
};

// Log when the app starts rendering
debug("Starting application render");

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found!");
  }
  
  const root = createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
  
  debug("Application rendered successfully");
} catch (error) {
  console.error("Error rendering application:", error);
}