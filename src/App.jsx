import React from "react";
import { useWalletConnect } from "./hooks/useWalletConnect";

const App = () => {
  const { connectionRequest, isConnectedWallet, account } = useWalletConnect();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-amber-800 text-center">Wallet Connect</h1>
      {!isConnectedWallet && (
        <button
          onClick={connectionRequest}
          className="px-4 py-2 mt-4 text-sm font-semibold leading-normal text-gray-500 transition duration-300 ease-in-out border border-transparent rounded hover:text-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          Connect wallet
        </button>
      )}
      {isConnectedWallet && (
        <div className="mt-4 text-center">
          <p>Connected wallet</p>
          <p>Account: {account}</p>
        </div>
      )}
    </div>
  );
};

export default App;
