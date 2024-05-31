import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [amazonShares, setAmazonShares] = useState(undefined);
  const [teslaShares, setTeslaShares] = useState(undefined);
  const [nvidiaShares, setNvidiaShares] = useState(undefined);
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (account) => {
    if (account && account.length > 0) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getshares = async (stockId) => {
    if (atm) {
      const shares = (await atm.getShares(stockId)).toNumber();
      if (stockId === 0) setAmazonShares(shares);
      else if (stockId === 1) setTeslaShares(shares);
      else if (stockId === 2) setNvidiaShares(shares);
    }
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const buyShares = async (stockId) => {
    if (atm) {
      let value = prompt("Enter the amount to spend :");
      let tx = await atm.buyShares(stockId, value);
      await tx.wait();
      getBalance();
      getshares(stockId);
    }
  };

  const setbalance = async () => {
    if (atm) {
      let value = prompt("Enter the amount to add to balance:");
      let tx = await atm.setBalance(value);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    if (amazonShares === undefined) {
      getshares(0);
    }

    if (teslaShares === undefined) {
      getshares(1);
    }

    if (nvidiaShares === undefined) {
      getshares(2);
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>Amazon Shares Owned: {amazonShares}</p>
        <p>Tesla Shares Owned: {teslaShares}</p>
        <p>Nvidia Shares Owned: {nvidiaShares}</p>
        <button onClick={setbalance}>Set Balance</button>
        <button onClick={() => buyShares(0)}>Buy Amazon Shares</button>
        <button onClick={() => buyShares(1)}>Buy Tesla Shares</button>
        <button onClick={() => buyShares(2)}>Buy Nvidia Shares</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Stock Market Exchange</h1>
      <p>Amazon Stock Price: 160usd</p>
      <p>Tesla Stock Price: 300usd</p>
      <p>Nvidia Stock Price: 890usd</p>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
        p{
          color:red;
          width:300px;
          margin:0 auto;
        }
        h1{
          color:green;
        }
      `}</style>
    </main>
  );
}
