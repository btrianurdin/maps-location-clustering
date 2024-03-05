import { useRef } from "react";
import { Poppins } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

import "@/styles/globals.css";

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          gcTime: 5 * 60 * 1000,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient.current}>
      <main style={poppins.style}>
        <Component {...pageProps} />
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
