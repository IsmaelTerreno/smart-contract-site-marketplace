import React from "react";
import "./App.css";
import { useWalletConnect } from "./hooks/useWalletConnect";

const App = () => {
  const { connectionRequest } = useWalletConnect();
  return (
    <div className="App">
      <button onClick={connectionRequest}>Connect wallet</button>
    </div>
  );
};

export default App;
