import "../../styles/globals.css";
import type { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createConfig,Chain, mainnet} from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';  // Assuming you only need polygonMumbai chain
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { avalancheChain } from "../components/customChains"; 
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { infuraProvider } from "wagmi/providers/infura";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
if (infuraId === undefined) {
  throw new Error("NEXT_PUBLIC_INFURA_ID is not defined in the environment.");
}

// interface Chain {
//   id: number;
//   name: string;
//   network: string;
//   nativeCurrency: {
//     decimals: number;
//     name: string;
//     symbol: string;
//   };
//   rpcUrls: {
//     default: string; // This should be of type string, not the full object
//   };
//   blockExplorers: {
//     default: {
//       name: string;
//       url: string;
//     };
//     snowtrace:{
//       name:string;
//       url:string;
//     }
//   };
//   testnet: boolean;
// }
//  const avalanche:Chain = {
//   id: 43_114,
//   name: "Avalanche",
//   network:"mainnet",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Avalanche",
//     symbol: "AVAX",
//   },
//   rpcUrls: {
//     default: "https://api.avax.network/ext/bc/C/rpc",
//   },
//   blockExplorers: {
//     default: { name: "SnowTrace", url: "https://snowtrace.io" },
//     snowtrace: { name: "SnowTrace", url: "https://snowtrace.io" },
//   },
//   testnet: false,
// };

const { webSocketPublicClient,publicClient,chains } = configureChains(
  [polygonMumbai,polygon,mainnet],
  [
    infuraProvider({ apiKey: infuraId }),
    jsonRpcProvider({
      rpc: (chain:any) => {
        if (chain.id !== avalancheChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ],
);
const config = createConfig(
  getDefaultConfig({
    publicClient,
    webSocketPublicClient,
    chains,
    appName: 'ConnectKit',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    autoConnect:true,
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
