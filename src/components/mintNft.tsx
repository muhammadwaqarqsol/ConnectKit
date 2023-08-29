import React, { useState, useEffect } from "react";
import {
  useWaitForTransaction,
} from "wagmi";
import {useNFTMint} from "./web3"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Network from "./useNetwork"

const MintNft: React.FC = () => {
    
  const [tokenUri, setTokenUri] = useState<string | null>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state for error message

    let {write,data}=useNFTMint({tokenUri});

    let { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    });
  
    async function handleSubmission() {
    if (!tokenUri) {
      setErrorMessage("TokenUri Cannot be Empty");
      return;
    }
    setErrorMessage(null); // Clear error message
    await write?.();
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, "Sucess");
      isSuccess = false;
      toast.success("NFT Created Successfully ",{
        position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      console.log(data, "Data");
      // setTxInfo({ data });
    }
  }, [isSuccess]);

  const handleChange = (event: any) => {
    setTokenUri(event.target.value);
    setErrorMessage(null);
  };

  return (
    <>
        { (
          <input
            style={{ height: 40 }}
            placeholder="Input uri"
            id="message"
            name="message"
            value={tokenUri ?? ""}
            onChange={handleChange}
          ></input>
        )}
          <button
          onClick={() => { handleSubmission(); setTokenUri(""); }}
          disabled={isLoading}
          className={`loader-button ${isLoading ? "loading" : ""}`}
          style={{
          marginTop: "1em",
          color: "black",
          borderRadius: 16,
          backgroundColor: "white",
          height: 50,
          width: 100,
          }}>
        {isLoading ? "Please Wait" : "Mint"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {/* <div>Transaction: {JSON.stringify(data)}</div> */}
       <ToastContainer
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover={false}
         theme="light"
      />
      {/* <Network /> */}
     
    </>
  );
};

export default MintNft;
