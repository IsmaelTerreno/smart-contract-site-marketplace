import { useDispatch, useSelector } from "react-redux";
import {
  contractConnected,
  contractSelector,
} from "../redux/features/user/marketplacesSlice";
import { useEffect } from "react";
import {
  accountAddressSelector,
  isConnectedWalletSelector,
} from "../redux/features/user/usersSlice";
import {
  getItemsMarketplace,
  loadSmartContracts,
  MARKETPLACE_CONTRACT_ADDRESS,
  marketplaceContractInstance,
} from "../lib/web3-utils/client";

export const useMarketplaceContract = () => {
  const dispatch = useDispatch();
  const contract = useSelector(contractSelector);
  const isConnectedWallet = useSelector(isConnectedWalletSelector);
  const account = useSelector(accountAddressSelector);

  useEffect(() => {
    const getItems = async () => {
      if (marketplaceContractInstance) {
        const items = await getItemsMarketplace(account);
        console.log("Items:", items);
      }
    };
    if (isConnectedWallet) {
      loadSmartContracts();
      if (marketplaceContractInstance) {
        dispatch(
          contractConnected({ contractAddress: MARKETPLACE_CONTRACT_ADDRESS }),
        );
        getItems().then((itemResult) => {
          console.log("Items loaded");
        });
      }
    }
  }, [isConnectedWallet, dispatch, account]);
  return { contract };
};
