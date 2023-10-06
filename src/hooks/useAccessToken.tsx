import Cookies from "js-cookie";
import { AccessToken } from "../types";

export default (): AccessToken => {
  const token = Cookies.get("token");
  const is_verified = Cookies.get("is_verified") == "true";

  if (!token) return { token: undefined, is_verified: false };
  else return { token, is_verified };
};
