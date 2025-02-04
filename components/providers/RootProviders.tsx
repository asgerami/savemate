"use client";

import { ThemeProvider } from "next-themes";
import React, { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function RootProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Only apply the ThemeProvider after mounting */}
      {mounted ? (
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      ) : (
        // Render children without ThemeProvider until mounted
        children
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default RootProviders;