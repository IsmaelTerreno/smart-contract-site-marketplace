import { useDispatch, useSelector } from "react-redux";
import {
  contractConnected,
  contractSelector,
} from "../redux/features/user/marketplacesSlice";
import { useEffect } from "react";
import { isConnectedWalletSelector } from "../redux/features/user/usersSlice";

export const useMarketplaceContract = () => {
  const dispatch = useDispatch();
  const contract = useSelector(contractSelector);
  const isConnectedWallet = useSelector(isConnectedWalletSelector);
  useEffect(() => {
    if (isConnectedWallet) {
      const marketplaceContractInstance = null;
      if (marketplaceContractInstance) {
        dispatch(contractConnected({ contract: marketplaceContractInstance }));
      }
    }
  }, [isConnectedWallet, dispatch]);
  return { contract };
};
