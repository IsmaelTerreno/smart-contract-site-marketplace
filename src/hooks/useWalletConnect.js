import { useDispatch } from "react-redux";
import { connectRequested } from "../redux/features/user/usersSlice";

export const useWalletConnect = (path) => {
  const dispatch = useDispatch();
  const connectionRequest = () => {
    dispatch(connectRequested());
  };
  return { connectionRequest };
};
