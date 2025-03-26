import type { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';
import { config } from '../lib/wagmi';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
