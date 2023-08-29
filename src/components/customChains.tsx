import { Chain } from "wagmi";

export const bsc: Chain = {
  id: 56,
  name: "Binance Smart Chain Mainnet",
  network: "binance-smart-chain-mainnet", // Modified network name
  nativeCurrency: {
    name: "Binance Chain Native Token",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ["https://bsc-dataseed4.binance.org"] }, // Corrected the array syntax
    default: { http: ["https://bsc-dataseed4.binance.org"] }, // Corrected the array syntax
  },
  blockExplorers: {
    default: { name: "Bscscan", url: "https://bscscan.com" },
  },
  testnet: false,
};
export const avalanche: Chain = {
  id: 43114,
  name: "Avalanche",
  network: "mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    public: { http: ["https://api.avax.network/ext/bc/C/rpc"] }, 
    default: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    snowtrace: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};


