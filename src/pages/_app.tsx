import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'
import { config } from '@/config/wagmi'
import Navbar from '@/components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </WagmiConfig>
  )
}
