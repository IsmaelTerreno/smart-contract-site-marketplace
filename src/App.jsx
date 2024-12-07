import React from "react";
import { useWalletConnect } from "./hooks/useWalletConnect";

const App = () => {
  const { connectionRequest, isConnectedWallet, account } = useWalletConnect();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-amber-800 text-center text-5xl pb-4">
        Crypto Marketplace
      </h1>
      {!isConnectedWallet && (
        <button
          onClick={connectionRequest}
          className="px-6 py-3 mt-4 text-md font-bold text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ease-in-out duration-300"
        >
          Connect wallet
        </button>
      )}
      {isConnectedWallet && (
        <div className="mt-4 text-center">
          <p className="text-center">Connected wallet</p>
          <p>Account: {account}</p>
        </div>
      )}
    </div>
  );
};

export default App;
