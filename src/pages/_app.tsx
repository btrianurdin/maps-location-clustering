import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import type { AppProps } from "next/app";

import "leaflet/dist/leaflet.css";

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main style={poppins.style}>
      <Component {...pageProps} />
    </main>
  );
}
