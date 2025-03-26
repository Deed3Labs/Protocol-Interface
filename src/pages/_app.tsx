"use client";

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createConfig, WagmiProvider, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/theme-provider'
import Layout from '@/components/Layout'
import { injected } from 'wagmi/connectors'

const queryClient = new QueryClient()

const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
