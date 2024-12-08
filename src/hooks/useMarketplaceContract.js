import { useDispatch, useSelector } from "react-redux";
import {
  contractAddressSelector,
  contractConnected,
  itemsForSaleLoaded,
} from "../redux/features/marketplace/marketplacesSlice";
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
  const contractAddress = useSelector(contractAddressSelector);
  const isConnectedWallet = useSelector(isConnectedWalletSelector);
  const account = useSelector(accountAddressSelector);
  const itemsForSale = useSelector((state) => state.marketplaces.itemsForSale);

  useEffect(() => {
    const getItems = async () => {
      if (marketplaceContractInstance) {
        const items = await getItemsMarketplace(account);
        console.log("Items from smart contract:", items);
        return items;
      }
    };
    if (isConnectedWallet) {
      loadSmartContracts();
      if (marketplaceContractInstance) {
        dispatch(
          contractConnected({ contractAddress: MARKETPLACE_CONTRACT_ADDRESS }),
        );
        getItems().then((itemResult) => {
          const activeItems = itemResult
            .filter((item) => item.active)
            .map((item) => {
              return {
                listingId: item.id.toString(),
                tokenAddress: item.token,
                amount: item.amount.toString(),
                price: item.price.toString(),
                sellerAddress: item.seller,
              };
            });
          dispatch(itemsForSaleLoaded({ items: activeItems }));
        });
      }
    }
  }, [isConnectedWallet, dispatch, account]);
  return { contractAddress, itemsForSale };
};
