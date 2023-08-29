import "../../styles/globals.css";
import type { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createConfig,Chain, mainnet} from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';  // Assuming you only need polygonMumbai chain
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { bsc ,avalanche} from "../components/customChains"; 
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { infuraProvider } from "wagmi/providers/infura";
import { WalletConnectConnector } from '@wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { LedgerConnector } from '@wagmi/connectors/ledger';
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
if (infuraId === undefined) {
  throw new Error("NEXT_PUBLIC_INFURA_ID is not defined in the environment.");
}

const supportedChains: Chain[] = [polygonMumbai,bsc, avalanche]; // Add more chains if needed

const { webSocketPublicClient, publicClient, chains } = configureChains(
  supportedChains,
  [
    infuraProvider({ apiKey: infuraId }),
    jsonRpcProvider({
      rpc: (chain) => {
        const supportedChain = supportedChains.find(supported => supported.id === chain.id);
        if (supportedChain) {
          const { http, webSocket } = chain.rpcUrls.default;
          return { http: http[0], webSocket: webSocket ? webSocket[0] : undefined };
        }
        return null;
      },
    }),
  ]
);


const config = createConfig(
  getDefaultConfig({
    publicClient,
    webSocketPublicClient,
    chains,
    appName: 'ConnectKit',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    autoConnect:true,
    infuraId:infuraId,
    connectors:[
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
      new WalletConnectConnector({
        chains,
        options:{
          projectId:process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
        }
      }),
      new LedgerConnector({
        chains,
        options:{
          projectId:process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
        }
      })
    ]
  })
);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider debugMode>
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
