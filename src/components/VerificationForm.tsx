import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Modal,
} from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { IconLoader2 } from "@tabler/icons-react";
import Cookies from "js-cookie";

import useAccessToken from "../hooks/useAccessToken";
import useQuery from "../hooks/useQuery";
import { isValidEmail } from "../libs/functions";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import usePhoneAuth from "../hooks/usePhoneAuth";

export default function VerificationForm() {
  const { token } = useAccessToken();
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["email", "phone number"]);
  const [opened, { open, close }] = useDisclosure(false);
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const { mutate, isLoading } = useQuery();
  const { phone, setPhone, onSignup, onOTPVerify, loading } = usePhoneAuth();

  const onClickHandler = async () => {
    if (type == "email") await sendCodeToEmail();
    else await sendCodeToPhone();
  };

  const sendCodeToEmail = async () => {
    if (input == "") return toast.error("Email is required");
    if (!isValidEmail(input)) return toast.error("Invalid email");

    const { message } = await mutate(
      "/user/send-code",
      { email: input },
      { Authorization: `Bearer ${token}` }
    );

    toast.success(message);
  };

  const sendCodeToPhone = () => {
    if (phone == "") return toast.error("Phone is required");

    onSignup();
  };

  const onVerifyHandler = async () => {
    if (type == "email") await verifyWithEmail();
    else await verifyWithPhone();
  };

  const verifyWithEmail = async () => {
    if (code.length < 6) return toast.error("Code must be 6 characters");

    const { message } = await mutate(
      "/user/email-verify",
      { code },
      { Authorization: `Bearer ${token}` }
    );

    if (message) {
      toast.success(message);
      Cookies.set("is_verified", "true");
      setTimeout(() => navigate("/"), 1000);
    }
  };

  const verifyWithPhone = async () => {
    if (code.length < 6) return toast.error("Code must be 6 characters");
    if (typeof parseInt(code) != "number")
      return toast.error("Code must be number ");

    onOTPVerify(code);
  };

  return (
    <Container size={500} my={30}>
      <Title className="title" ta="center">
        Verify Your Account!!!
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your {type} to get a verification code
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        {type != "email" && (
          <p style={{ fontSize: 14, fontWeight: 500 }}>Your Phone Number</p>
        )}
        <div style={{ width: "100%", display: "flex", alignItems: "end" }}>
          {type == "email" ? (
            <TextInput
              label={`Your Email`}
              placeholder={type == "email" ? "test@gmail.com" : "09964470332"}
              required
              radius={0}
              style={{
                width: "100%",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <PhoneInput
              value={phone}
              onChange={(phone) => setPhone(phone)}
              country={"mm"}
              inputStyle={{ width: "100%", borderRadius: 0 }}
            />
          )}

          <Button
            disabled={(isLoading || loading) && !opened}
            radius={0}
            onClick={onClickHandler}
          >
            {(isLoading || loading) && !opened ? (
              <IconLoader2 className="spinner" size={16} />
            ) : (
              "Get Code"
            )}
          </Button>
        </div>

        <Group mt="lg" className="controls">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="sm"
          >
            Verify with {type == "email" ? "Phone Number" : "Email"}
          </Anchor>
          <Button radius={0} className="control" onClick={() => open()}>
            Verify
          </Button>
        </Group>
      </Paper>

      <Modal opened={opened} onClose={close} centered>
        <OtpInput
          value={code}
          onChange={setCode}
          numInputs={6}
          renderSeparator={<div style={{ width: 10 }} />}
          renderInput={(props) => <input {...props} />}
          containerStyle={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          inputStyle={{
            width: "50px",
            height: "50px",
          }}
        />

        <h6 style={{ float: "right", marginTop: 10 }}>
          This code will be expired within 5 minutes
        </h6>

        <Button
          disabled={isLoading}
          fullWidth
          mt={30}
          size="lg"
          onClick={onVerifyHandler}
        >
          {isLoading || loading ? (
            <IconLoader2 className="spinner" size={16} />
          ) : (
            "Verify"
          )}
        </Button>
      </Modal>
    </Container>
  );
}
