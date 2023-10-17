import { useState } from "react";
import { toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Cookies from "js-cookie";

import useQuery from "./useQuery";
import { auth } from "../firebase/config";
import useAccessToken from "./useAccessToken";
import { useNavigate } from "react-router-dom";

declare const window: any;

export default () => {
  const { token } = useAccessToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const { mutate } = useQuery();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            onSignup();
          },
          onAbort: (res: any) => {
            console.log(res);
          },
          "expired-callback": () => {
            setLoading(false);
          },
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phone;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify(otp: string) {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res: any) => {
        const { message } = await mutate(
          "/user/phone-verify",
          { code: res.localId },
          { Authorization: `Bearer ${token}` }
        );

        if (message) {
          toast.success(message);
          setLoading(false);
          Cookies.set("is_verified", "true");
          setTimeout(() => navigate("/"), 1000);
        }
      })
      .catch((err: any) => {
        toast.error("Invalid Code");
        setLoading(false);
      });
  }

  return { phone, setPhone, onSignup, onOTPVerify, loading };
};
