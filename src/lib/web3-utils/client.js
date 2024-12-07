import { Web3 } from "web3";
import marketplaceContractAbi from "../contracts/Marketplace.sol/Marketplace.json";
import erc20MarketplaceItemContractAbi from "../contracts/ERC20MarketplaceItem.sol/ERC20MarketplaceItem.json";

export let web3Instance;
export let userAccounts;
export let marketplaceContractInstance;
export let erc20MarketplaceItemContractInstance;

const MARKETPLACE_CONTRACT_ADDRESS =
  process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS;
const TOKEN_ITEM_SELLER_CONTRACT_ADDRESS =
  process.env.REACT_APP_CONTRACT_ADDRESS_TOKEN_ITEM_SELLER;
const ACCOUNT_CHANGED_RELOAD_TIMEOUT = 500;

export const loadWeb3App = async (onAccountsLoaded) => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("You have to install MetaMask!");
    return;
  }

  try {
    await requestAccountAccess(ethereum, onAccountsLoaded);
    setupEventListeners(ethereum);
  } catch (error) {
    handleConnectionError(error);
  }
};

const requestAccountAccess = async (ethereum, onAccountsLoaded) => {
  await ethereum.request({ method: "eth_requestAccounts" });
  web3Instance = new Web3(ethereum);

  userAccounts = await web3Instance.eth.getAccounts();

  onAccountsLoaded(userAccounts);

  // Trigger a page reload when accounts are detected
  if (userAccounts.length > 0) {
    window.location.reload();
  }

  marketplaceContractInstance = new web3Instance.eth.Contract(
    marketplaceContractAbi.abi,
    MARKETPLACE_CONTRACT_ADDRESS,
  );

  erc20MarketplaceItemContractInstance = new web3Instance.eth.Contract(
    erc20MarketplaceItemContractAbi.abi,
    TOKEN_ITEM_SELLER_CONTRACT_ADDRESS,
  );

  setTimeout(
    () => onAccountsLoaded(userAccounts),
    ACCOUNT_CHANGED_RELOAD_TIMEOUT,
  );
};

const setupEventListeners = (ethereum) => {
  ethereum.on("accountsChanged", () => {
    setTimeout(() => window.location.reload(), ACCOUNT_CHANGED_RELOAD_TIMEOUT);
  });

  ethereum.on("chainChanged", () => {
    window.location.reload();
  });

  ethereum.on("connected", () => {
    window.location.reload();
  });
};

const handleConnectionError = (error) => {
  if (error.code === 4001) {
    console.log("Please connect to MetaMask.");
  } else {
    console.error(error);
  }
};
