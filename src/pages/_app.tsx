import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'
import { config } from '@/config/wagmi'
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false,
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </WagmiConfig>
  )
}
