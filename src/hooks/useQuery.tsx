import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";

import config from "../constants/config";
import {
  AuthInfos,
  AuthInputProps,
  EmailVerifyTypes,
  GoogleAuthTypes,
  UploadBody,
} from "../types";
import useAccessToken from "./useAccessToken";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const base = async (
    func: () => Promise<AxiosResponse<any, any>>,
    getTotal: boolean = false
  ) => {
    setIsSuccess(false);
    try {
      setIsLoading(true);
      const { data }: any = await func();

      if (data?.success) {
        setIsSuccess(true);
      }
      setIsLoading(false);

      if (getTotal) return data;

      return data?.data;
    } catch (err: any) {
      console.log(err);

      if (err.response.data.message == "Token error") {
        toast.error("Token Expired");
        Cookies.remove("token");
        setTimeout(() => navigate("/auth"), 1000);
        return;
      }

      setIsLoading(false);
      toast.error(err.response.data.message);
      setIsSuccess(false);
    }
  };

  const mutate = async (
    uri: string,
    body:
      | UploadBody
      | AuthInfos
      | GoogleAuthTypes
      | AuthInputProps
      | EmailVerifyTypes,
    headers?: RawAxiosRequestHeaders
  ) => {
    return await base(() =>
      axios.post(config.baseApiUrl + uri, body, {
        headers,
      })
    );
  };

  const query = async (uri: string, getTotal: boolean = false) => {
    const { token } = useAccessToken();
    return await base(
      () =>
        axios.get(config.baseApiUrl + uri, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      getTotal
    );
  };

  return { mutate, query, isSuccess, isLoading };
};
