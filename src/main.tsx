import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/auth/AuthProvider";
import { NotificationProvider } from "./context/notification/NotificationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);
