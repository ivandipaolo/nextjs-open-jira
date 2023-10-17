import type { AppProps } from "next/app"

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"

import { EntriesProvider } from "../context/entries"
import { darkTheme, lightTheme } from "../themes"
import { UIProvider } from "../context/ui"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  )
}
