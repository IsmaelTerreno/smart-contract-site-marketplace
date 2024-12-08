import { useDispatch, useSelector } from "react-redux";
import {
  contractConnected,
  contractSelector,
} from "../redux/features/user/marketplacesSlice";
import { useEffect } from "react";
import { isConnectedWalletSelector } from "../redux/features/user/usersSlice";
import {
  loadSmartContracts,
  MARKETPLACE_CONTRACT_ADDRESS,
  marketplaceContractInstance,
} from "../lib/web3-utils/client";

export const useMarketplaceContract = () => {
  const dispatch = useDispatch();
  const contract = useSelector(contractSelector);
  const isConnectedWallet = useSelector(isConnectedWalletSelector);

  useEffect(() => {
    if (isConnectedWallet) {
      loadSmartContracts();
      if (marketplaceContractInstance) {
        dispatch(
          contractConnected({ contractAddress: MARKETPLACE_CONTRACT_ADDRESS }),
        );
      }
    }
  }, [isConnectedWallet, dispatch]);
  return { contract };
};
