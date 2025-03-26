import { createConfig, configureChains } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
}); 