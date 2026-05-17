import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// manages API request handling, loading states, refetching, deduplication
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // detects bad patters
  // warns about deprecated features
  // intentionally double-runs things in development
  // does not affect production builds
  //
  // QueryClientProvider wraps the app and provides the query client to all components
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
