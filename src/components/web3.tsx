import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import ABI from '../abi/erc20Contract.json';
import nftContract from "../abi/nftContract.json";
import {erc20Contract_address,nftContract_address} from "../utils/constants";


export function useNFTMint({
    tokenUri}: { tokenUri: string | null }
) {
    const {config} = usePrepareContractWrite({
        address: nftContract_address,
        abi: nftContract,
        functionName: "createToken",
        args: [tokenUri]
    });

    const nftmint=useContractWrite(config);
    return nftmint
}


export function usetransferErc20({
    address,number}: { address: string | null,number:Number}
) {
    const {config} = usePrepareContractWrite({
        address: erc20Contract_address,
        abi: ABI,
        functionName: "mint",
        args: [address,number]
    });

    const erc20mint=useContractWrite(config);
    return erc20mint;
}

export function useReadbalanceErc20({
    address}: { address: string | null}
) {
    const erc20balance = useContractRead({
        address: erc20Contract_address,
        abi: ABI,
        functionName: "balanceOf",
        args: [address]
    });

    return erc20balance;
}
