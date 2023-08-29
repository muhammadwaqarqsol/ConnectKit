import Head from "next/head";
import { useState,useEffect } from "react";
import { Web3NetworkSwitch, useWeb3Modal } from '@web3modal/react'
import { ConnectKitButton, ConnectKitProvider } from 'connectkit';import _ from "lodash";
import {
  useDisconnect,
  useNetwork,
  useAccount,
} from "wagmi";
import Image from "next/image";
import MintNft from "../components/mintNft";
import { ERC20 } from "../components/ercMint";

export default function Home() {

  const { disconnect } = useDisconnect();
  const {open} = useWeb3Modal();
  const {chain} =useNetwork();
  const [getaddress, setAddress] =useState("");
  const [getalert, setAlert] =useState("");

  const { isConnected } = useAccount({
    onConnect({ address }) {
        setAddress(address ?? "");
    },
    onDisconnect() {
        setAddress("");
        setAlert("Disconnected");
    }
});

  

  useEffect(()=>{
    if (chain !==undefined && !_.isEmpty(getaddress)){
      setAlert(`${chain.name} :: ${getaddress}`)
    }
  },[getaddress,chain])
 

  function handleDiconnect(){
    disconnect();
    setAddress("");
  }
  return (
    <>
      <Head>
        <title>Web3Modal</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          marginTop: "2em",
          marginRight: "2em",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "1em",
    
        }}
      >

      <ConnectKitButton showBalance/> 
      </div>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="/gateway.jpg"
          style={{
            border: "1px solid grey",
            marginTop: "3em",
            borderRadius: "1em",
          }}
          width={400}
          height={400}
          alt="gateway"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "2em",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{display:"flex",alignContent:"center",alignItems:"center"}}>Web3Modal</h1>
            <MintNft />
            <ERC20 />
          </div>
        </div>
      </main>
    </>
  );
}
