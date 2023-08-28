export const avalancheChain = {
    id: 43_114,
    name: "Avalanche",
    network:"Avalanche Mainnet",
    nativeCurrency: {
      decimals: 18,
      name: "Avalanche",
      symbol: "AVAX",
    },
    rpcUrls: {
      default: "https://api.avax.network/ext/bc/C/rpc",
    },
    blockExplorers: {
      default: { name: "SnowTrace", url: "https://snowtrace.io" },
      snowtrace: { name: "SnowTrace", url: "https://snowtrace.io" },
    },
    testnet: false,
  };