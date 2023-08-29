import { useNetwork, useSwitchNetwork } from 'wagmi'
 
function Network() {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork({
        chainId: 80001,
      })
 
    const network = useSwitchNetwork()
  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}
 
        <button
          disabled={!switchNetwork}
          onClick={() => switchNetwork?.()}
        >Change Network
        </button>
 
      <div>{error && error.message}</div>
    </>
  )
}
export default Network;