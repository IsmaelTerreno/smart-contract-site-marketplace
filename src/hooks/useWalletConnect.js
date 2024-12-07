import { useDispatch } from "react-redux";
import {
  connectionSucceeded,
  connectRequested,
} from "../redux/features/user/usersSlice";
import { useEffect } from "react";

export const useWalletConnect = () => {
  const dispatch = useDispatch();
  const connectionRequest = () => {
    dispatch(connectRequested());
  };

  useEffect(() => {
    const isConnectedWallet = window.ethereum.isConnected();
    const isMetaMaskInstalled = window.ethereum.isMetaMask;

    if (isConnectedWallet && isMetaMaskInstalled) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            dispatch(
              connectionSucceeded({
                account: accounts[0],
              }),
            );
          } else {
            console.log("No accounts found");
          }
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
        });
    }
  }, [window.ethereum.isConnected, window.ethereum.isMetaMask]);
  return { connectionRequest };
};
