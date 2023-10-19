import {
  Button,
  Modal,
  ScrollArea,
  createStyles,
  useMantineTheme,
} from "@mantine/core";

// import { IconPhotoDown } from "@tabler/icons-react";

import { QrUploadProps } from "../types";
import { Loading, ShareLinks } from ".";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "red",
  },
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "#ffffff",
    padding: 10,
    borderRadius: theme.radius.md,
    flex: 1,
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "@media (max-width: 500px)": {
      padding: 5,
    },
  },
  qrBox: {
    height: "auto",
    maxWidth: 250,
    width: 250,

    "@media (max-width: 500px)": {
      padding: 5,
      maxWidth: "100%",
      width: "100%",
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
    // gap: 30,
  },
}));

const QrUpload = ({ upload, openModal, setOpenModal }: QrUploadProps) => {
  const [isShare, setIsShare] = useState<boolean>(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();

  useEffect(() => {
    if (!upload.isLoading && !upload.isSuccess) onCloseHandler();
  }, [upload]);

  const onCloseHandler = () => {
    setOpenModal(false);
    setIsShare(false);
  };

  const onSaveHandler = () => {
    window.open(upload.qrCode);
    toast.success("File Downloaded Successfully");
  };

  return (
    <Modal
      opened={openModal}
      onClose={onCloseHandler}
      withCloseButton={!upload.isLoading}
      centered
      scrollAreaComponent={ScrollArea.Autosize}
      closeOnClickOutside={false}
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <div className={classes.wrapper}>
        {upload.isSuccess ? (
          <img src={upload.qrCode} className={classes.qrBox} />
        ) : (
          <Loading height="200px" />
        )}

        {upload.isSuccess && (
          <div className={classes.btnContainer}>
            <Button
              sx={{
                display: isShare ? "none" : "block",
              }}
              color="green"
              onClick={() => setIsShare(true)}
            >
              Share
            </Button>
            <Button fullWidth={isShare} color="blue" onClick={onSaveHandler}>
              Save
            </Button>
          </div>
        )}

        {isShare && <ShareLinks url={upload.qrCode} />}
      </div>
    </Modal>
  );
};

export default QrUpload;
