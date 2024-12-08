import Web3 from "web3";
import marketplaceContractAbi from "../contracts/Marketplace.sol/Marketplace.json";
import erc20MarketplaceItemContractAbi from "../contracts/ERC20MarketplaceItem.sol/ERC20MarketplaceItem.json";

export let userAccounts;
export let marketplaceContractInstance;
export let erc20MarketplaceItemContractInstance;
export let web3Instance;
export const MARKETPLACE_CONTRACT_ADDRESS =
  process.env.REACT_APP_CONTRACT_ADDRESS_MARKETPLACE;
export const TOKEN_ITEM_SELLER_CONTRACT_ADDRESS =
  process.env.REACT_APP_CONTRACT_ADDRESS_TOKEN_ITEM_SELLER;
web3Instance = new Web3(window.ethereum);

export const getContractInstance = (contractAbi, contractAddress) => {
  return new web3Instance.eth.Contract(contractAbi, contractAddress);
};

export const loadWeb3App = async (onWeb3AccountsLoaded) => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("You have to install MetaMask!");
    return;
  }

  try {
    await requestAccountAccess(ethereum);
    setupEventListeners(ethereum);
  } catch (error) {
    console.error(
      "Error loading Web3 after request credentials to the user:",
      error,
    );
    handleConnectionError(error);
  }

  onWeb3AccountsLoaded(userAccounts);
};
export const loadSmartContracts = () => {
  const { ethereum } = window;
  if (!ethereum) {
    alert("You have to install MetaMask!");
    return;
  }
  try {
    erc20MarketplaceItemContractInstance = getContractInstance(
      erc20MarketplaceItemContractAbi.abi,
      TOKEN_ITEM_SELLER_CONTRACT_ADDRESS,
    );

    console.log("ABI:", marketplaceContractAbi.abi);
    console.log("Contract Address:", MARKETPLACE_CONTRACT_ADDRESS);
    console.log("Web3 Instance:", web3Instance);

    marketplaceContractInstance = getContractInstance(
      marketplaceContractAbi.abi,
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    );
    console.log("Marketplace Contract Instance:", marketplaceContractInstance);
  } catch (error) {
    console.error("Error loading contract instance:", error);
    handleConnectionError(error);
  }
};
const requestAccountAccess = async (ethereum) => {
  web3Instance = new Web3(ethereum);
  await ethereum.request({ method: "eth_requestAccounts" });
  userAccounts = await web3Instance.eth.getAccounts();
};

const setupEventListeners = (ethereum) => {
  ethereum.on("accountsChanged", () => {
    // setTimeout(() => window.location.reload(), ACCOUNT_CHANGED_RELOAD_TIMEOUT);
  });

  ethereum.on("chainChanged", () => {
    // window.location.reload();
  });

  ethereum.on("connected", () => {
    // window.location.reload();
  });
};

const handleConnectionError = (error) => {
  if (error.code === 4001) {
    console.log("Please connect to MetaMask.");
  } else {
    console.error(error);
  }
};
