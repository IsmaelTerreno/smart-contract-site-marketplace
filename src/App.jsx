import React from "react";
import { useWalletConnect } from "./hooks/useWalletConnect";
import { useMarketplaceContract } from "./hooks/useMarketplaceContract";

const App = () => {
  const { connectionRequest, isConnectedWallet, account } = useWalletConnect();
  const { contractAddress, itemsForSale } = useMarketplaceContract();
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
          {contractAddress && <p>Contract: {contractAddress}</p>}
          {itemsForSale && itemsForSale.length > 0 && (
            <div>
              <h2 className="text-amber-800 text-center text-3xl pt-4">
                Items for sale
              </h2>
              <div>
                {itemsForSale.map((item) => (
                  <div key={item.listingId} className="bg-gray-200 p-4">
                    <p>Token: {item.tokenAddress}</p>
                    <p>Amount: {item.amount}</p>
                    <p>Price: {item.price}</p>
                    <p>Seller: {item.sellerAddress}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
