import Cookies from "js-cookie";

export default () => {
  const token = JSON.parse(Cookies.get("token") ?? "{}");

  if (!token?.access_token) return undefined;
  else return token?.access_token;
};
