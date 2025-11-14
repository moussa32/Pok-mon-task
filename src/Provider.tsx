import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router";
import { queryClient } from "./config/react-query";
import { BackgroundProvider } from "./context/BackgroundContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <BackgroundProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </BackgroundProvider>
    </BrowserRouter>
  );
};

export default Provider;
