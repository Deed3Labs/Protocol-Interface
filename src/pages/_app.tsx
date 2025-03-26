import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import { ConnectKitProvider } from 'connectkit'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from '@/components/Layout'

const queryClient = new QueryClient()

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})

const config = createConfig({
  publicClient,
  autoConnect: true,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}
