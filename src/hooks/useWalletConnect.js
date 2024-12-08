import { useDispatch, useSelector } from "react-redux";
import {
  accountAddressSelector,
  connectionSucceeded,
  connectRequested,
  errorOnAccountsFetched,
  isConnectedWalletSelector,
  noAccountsFounded,
} from "../redux/features/user/usersSlice";
import { useEffect } from "react";
import { loadWeb3App } from "../lib/web3-utils/client";

export const useWalletConnect = () => {
  const dispatch = useDispatch();
  const isConnectedWallet = useSelector(isConnectedWalletSelector);
  const account = useSelector(accountAddressSelector);
  const connectionRequest = () => {
    dispatch(connectRequested());
    const onWeb3AccountsLoaded = (accounts) => {
      console.log("onWeb3AccountsLoaded", accounts);
      dispatch(connectionSucceeded({ accountAddress: accounts[0] }));
    };
    loadWeb3App(onWeb3AccountsLoaded)
      .then((result) => {
        console.info("Web3 loaded successfully");
        //window.location.reload();
        //state.isConnectedWallet = true;
      })
      .catch((error) => console.error("Error loading Web3:", error));
  };
  useEffect(() => {
    const isWeb3Eth = window.ethereum;
    const isMetaMaskInstalled = window.ethereum && window.ethereum.isMetaMask;

    if (isWeb3Eth && isMetaMaskInstalled) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            dispatch(
              connectionSucceeded({
                accountAddress: accounts[0],
              }),
            );
          } else {
            dispatch(noAccountsFounded());
          }
        })
        .catch((error) => {
          dispatch(
            errorOnAccountsFetched({
              message: "Error fetching accounts: ",
              error,
            }),
          );
        });
    }
  }, [dispatch]);
  return { connectionRequest, isConnectedWallet, account };
};
