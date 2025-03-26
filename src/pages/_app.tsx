import type { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';
import { config } from '../lib/wagmi';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  );
}

export default MyApp;
