import type { AppProps } from 'next/app';
import { WagmiConfig, createConfig } from 'wagmi';
import '../styles/globals.css';

const wagmiConfig = createConfig({
  // Add your wagmi configuration here
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
