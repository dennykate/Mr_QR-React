import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
import { useState } from "react";

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [windowRecaptcha, setWindowRecaptcha] = useState<any>();

  function onCaptchVerify() {
    if (windowRecaptcha) {
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response: any) => {
            console.log(response);
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );

      setWindowRecaptcha(recaptchaVerifier);
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = windowRecaptcha;

    const formatPh = "+" + phone;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        windowRecaptcha.confirmationResult = confirmationResult;
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
    windowRecaptcha.confirmationResult
      .confirm(otp)
      .then(async (res: any) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  }

  return { phone, setPhone, onCaptchVerify, onOTPVerify, loading };
};
