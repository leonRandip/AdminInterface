import "@mantine/core/styles.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Layout from "./Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ fontFamily: "Inter, sans-serif" }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
