import { useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FileInput,
  Select,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";

import config from "../constants/config";
import { Loading, QrUpload } from ".";
import uploadImage from "../libs/uploadImage";
import { selectData } from "../constants";
import { createQrUrl } from "../libs/functions";
import useQuery from "../hooks/useQuery";
import useAccessToken from "../hooks/useAccessToken";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "#ffffff",
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    flex: 1,
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: theme.colorScheme === "dark" ? "" : config.lightFontColor,
    fontSize: 28,
  },
  qrBox: {
    height: "auto",
    maxWidth: 200,
    width: 200,
    marginTop: 15,
  },
  input: {
    marginTop: 10,
    width: "100%",
  },
  button: {
    background: theme.colorScheme === "dark" ? "" : config.lightFontColor,
    marginTop: 15,
    width: "100%",
    "&:hover": {
      background: theme.colorScheme === "dark" ? "" : config.lightFontColor,
    },
  },
}));

const QrBox = () => {
  const { classes } = useStyles();
  const svgRef = useRef<any>();
  const [input, setInput] = useState<string>();
  const [file, setFile] = useState<File>();
  const [type, setType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [fileValue, setFileValue] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [qrImage, setQrImage] = useState<string>("");
  const { token } = useAccessToken();

  const { isLoading, isSuccess, mutate } = useQuery();

  const onSubmitHandler = async () => {
    if (!qrCode) return onGenerateHandler();

    const body = {
      svg: new XMLSerializer().serializeToString(svgRef.current),
      value: fileValue ?? qrCode,
      key: key,
      name: name,
    };

    setOpenModal(true);

    const data = await mutate("/qr", body, {
      Authorization: `Bearer ${token}`,
    });
    setQrImage(data?.qrCode);
  };

  const onGenerateHandler = () => {
    if (type == "url") generateInputToQrCode();
    else generateFileToQrCode();
  };

  const generateInputToQrCode = () => {
    if (!input) return toast.error("File Or Url Is Required");

    setLoading(true);

    setTimeout(() => {
      setQrCode(input);
      setLoading(false);
    }, 2000);
  };

  const generateFileToQrCode = async () => {
    if (!file) return toast.error("File Or Url Is Required");

    setLoading(true);
    const responseFile = (await uploadImage(file)) as string;

    const _key = uuidv4().substring(0, 8);

    setKey(_key);
    setFileValue(responseFile);
    setQrCode(createQrUrl(_key, file.type));
    setLoading(false);
  };

  const onSelectHandler = (e: string) => {
    setType(e);
    setQrCode("");
    setLoading(false);
  };

  const onFileChangeHandler = (e: File) => {
    setFile(e);
    setQrCode("");
    setLoading(false);
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setQrCode("");
    setLoading(false);
  };

  return (
    <Box className={classes.wrapper}>
      <QrUpload
        upload={{
          isLoading: isLoading,
          isSuccess: isSuccess,
          qrCode: qrImage,
        }}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <Title className={classes.title}>Mini QR Generator</Title>

      {loading ? (
        <Loading />
      ) : (
        qrCode && (
          <QRCode
            ref={svgRef}
            size={256}
            value={qrCode}
            viewBox={`0 0 256 256`}
            className={classes.qrBox}
          />
        )
      )}

      <Select
        label="Choose Your Input Type"
        placeholder="File / Url"
        data={selectData}
        onChange={onSelectHandler}
        className={classes.input}
      />

      {type && (
        <TextInput
          label="Enter Qr Name"
          placeholder="QR Name"
          className={classes.input}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      {type == "file" && (
        <FileInput
          placeholder="Pick file"
          label="Your File"
          withAsterisk
          onChange={onFileChangeHandler}
          className={classes.input}
        />
      )}

      {type == "url" && (
        <TextInput
          label="Enter Your Url"
          placeholder="Your Url"
          className={classes.input}
          onChange={onInputChangeHandler}
        />
      )}

      <Button
        disabled={loading}
        className={classes.button}
        onClick={onSubmitHandler}
      >
        {!qrCode ? "Generate" : "Upload"}
      </Button>
    </Box>
  );
};

export default QrBox;
