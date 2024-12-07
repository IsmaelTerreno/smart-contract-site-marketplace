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

export const useWalletConnect = () => {
  const dispatch = useDispatch();
  const isConnectedWallet = useSelector(isConnectedWalletSelector);
  const account = useSelector(accountAddressSelector);
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
