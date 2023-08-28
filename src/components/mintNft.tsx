import React, { useState, useEffect } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useSwitchNetwork,
} from "wagmi";
import nftContract from "../abi/nftContract.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MintNft: React.FC = () => {
  const [isempty, setEmpty] = useState(true);
  const [txinfo, setTxInfo] = useState({});
  const [tokenUri, setTokenUri] = useState<string | null>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state for error message

  const { config } = usePrepareContractWrite({
    address: "0x9359D0d8BA7521A2B84db19a528453C1ac89F152",
    abi: nftContract,
    functionName: "createToken",
    args: [tokenUri],
    onError(error) {
      console.log("Error", error);
      setEmpty(true);
    },
  });

  let { data, write, status } = useContractWrite(config);

  let { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  async function handleSubmission() {
    if (!tokenUri) {
      setErrorMessage("TokenUri Cannot be Empty");
      return;
    }
    setErrorMessage(null); // Clear error message
    const response = await write?.();
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, "Sucess");
      isSuccess = false;
      toast.success("NFT Created Successfully ", {
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
      setTxInfo({ data });
    }
  }, [isSuccess]);

  const handleChange = (event: any) => {
    setTokenUri(event.target.value);
    setErrorMessage(null);
  };

  return (
    <>
    
        {isempty && (
          <input
            style={{ height: 40 }}
            value={tokenUri ?? ""}
            onChange={handleChange}
          ></input>
        )}
      <button
        onClick={handleSubmission}
        disabled={isLoading}
        className={`loader-button ${isLoading ? "loading" : ""}`}
        style={{
          marginTop: "1em",
          color: "black",
          borderRadius: 16,
          backgroundColor: "white",
          height: 50,
          width: 100,
        }}
      >
        {isLoading ? "Please Wait" : "Mint"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ToastContainer
        // ... (ToastContainer options)
      />
    </>
  );
};

export default MintNft;
