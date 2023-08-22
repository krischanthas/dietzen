import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            fontFamily: "Open Sans, sans serif",
            spacing: {
              xs: "1rem",
              sm: "1.2rem",
              md: "1.8rem",
              lg: "2.2rem",
              xl: "2.8rem",
            },
            colorScheme: "light",
          }}
        >
          <Head>
            <title>Dietzen</title>
          </Head>
          <Component {...pageProps} />
        </MantineProvider>
      </SessionProvider>
    </>
  );
}
