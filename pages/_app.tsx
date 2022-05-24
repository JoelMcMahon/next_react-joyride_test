import "../styles/globals.css";
import type { AppProps } from "next/app";
import ToolTipContextProvider from "../context/ToolTipContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToolTipContextProvider>
      <Component {...pageProps} />
    </ToolTipContextProvider>
  );
}

export default MyApp;
