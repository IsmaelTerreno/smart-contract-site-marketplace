import {Web3} from "web3";
import marketplace_contract_abi from "../contracts/Marketplace.sol/Marketplace.json";
import erc20_marketplace_item_contract_abi from "../contracts/ERC20MarketplaceItem.sol/ERC20MarketplaceItem.json";

export let web3;
export let accounts;
export let MarketplaceContract;
export let ERC20MarketplaceItemContract;

const MARKETPLACE_CONTRACT_ADDRESS = process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS;
const CONTRACT_ADDRESS_TOKEN_ITEM_SELLER = process.env.REACT_APP_CONTRACT_ADDRESS_TOKEN_ITEM_SELLER;

export const loadWeb3App = async (callbackFn) => {
  const { ethereum } = window;
  if(!ethereum.isConnected()) {
    //window.location.reload();
  }
  if ( ethereum ) {
    ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(()=>{
      web3 = new Web3(ethereum);
      web3.eth.getAccounts().then((walletAccounts)=> {
        accounts = walletAccounts;
      });
      // User has allowed account access to DApp...
      MarketplaceContract = new web3.eth.Contract(marketplace_contract_abi.abi, MARKETPLACE_CONTRACT_ADDRESS);
      ERC20MarketplaceItemContract = new web3.eth.Contract(erc20_marketplace_item_contract_abi.abi, CONTRACT_ADDRESS_TOKEN_ITEM_SELLER);
      setTimeout(() => {
        callbackFn();
      }, 500);
    })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
    ethereum.on('accountsChanged', (accounts) => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });

    ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
  } else {
    alert('You have to install MetaMask !');
  }
}
