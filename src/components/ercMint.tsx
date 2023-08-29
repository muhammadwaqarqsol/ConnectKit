import React, { useState, useEffect } from "react";
import {
  ToastContainer,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  usetransferErc20,
  useReadbalanceErc20,
} from "./web3";
import {useWaitForTransaction} from "wagmi";
export const ERC20: React.FC = () => {
  const [userBal, setUserBal] = useState("");
  const [sendAmount, setSendAmount] = useState(0);
  const [receiver, setReceiver] = useState<string>("");
  const [addressToCheck, setAddressToCheck] = useState("");

  let { write: minting, data: transferData } = usetransferErc20({
    address: receiver,
    number: sendAmount,
  });

  let { data: balance, isSuccess: resultofbalance } = useReadbalanceErc20({
    address: receiver,
  });

  let { isLoading: waitforMint, isSuccess: tokenminted } =
    useWaitForTransaction({
      hash: transferData?.hash,
    });

  async function mintToken() {
    console.log("check");
    await minting?.();
  }

  function GetBalance() {
    setUserBal(balance as string);
  }

  function changeSendAmount(e: any) {
    setSendAmount(e.target.value);
  }

  function changeReceiver(e: any) {
    setReceiver(e.target.value);
  }

  function changeAddressToCheck(e: any) {
    setAddressToCheck(e.target.value);
  }

  useEffect(() => {
    if (tokenminted) {
      toast.info("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log("Minted ERC20 data", transferData);
  }, [tokenminted]);

  useEffect(() => {
    if (resultofbalance) {
      console.log("Your erc20 balance", balance);
    }
  }, [resultofbalance]);

  return (
    <>
      <div>
        <h1 style={{ color: "Blue" }}>Send ERC20</h1>
        <>
          <input
            type="number"
            value={sendAmount}
            onChange={changeSendAmount}
            placeholder="Enter amount"
          />
          <br />
          <input
            type="text"
            value={receiver}
            onChange={changeReceiver}
            placeholder="Enter recipient"
          />
          <br />
          <button onClick={mintToken}>Send</button>
        </>
      </div>
      <div>
        <h1>Check Balance</h1>
        <input
          type="text"
          onChange={changeAddressToCheck}
          placeholder="Enter address to check"
        />
        <br />
        <button onClick={GetBalance}>Check Balance</button>
        {userBal && (
          <p>
            Balance of {receiver}: {userBal}
          </p>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};
