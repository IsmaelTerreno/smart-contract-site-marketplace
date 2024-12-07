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
    const isWeb3Eth = window.ethereum;
    const isMetaMaskInstalled = window.ethereum.isMetaMask;

    if (isWeb3Eth && isMetaMaskInstalled) {
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
  }, [dispatch]);
  return { connectionRequest };
};
