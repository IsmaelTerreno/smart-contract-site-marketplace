import { useDispatch } from "react-redux";
import {
  connectionSucceeded,
  connectRequested,
} from "../redux/features/user/usersSlice";

export const useWalletConnect = () => {
  const dispatch = useDispatch();
  const connectionRequest = () => {
    dispatch(
      connectRequested({
        callback: (account) => {
          console.log("Web3 loaded successfully");
          connectionSucceeded({ account });
        },
      }),
    );
  };
  return { connectionRequest };
};
