import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
