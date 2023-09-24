import { useState } from "react";
import { Button, createStyles } from "@mantine/core";

import { QrUpload } from ".";
import { dummyQrCode } from "../constants";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    padding: 12,
    background: "white",

    "@media (max-width: 500px)": {
      padding: "12px 5px",
    },
  },
  imgContainer: {
    width: "100%",
    height: "auto",
  },
  img: {
    width: "100%",
    objectFit: "cover",
  },
  contentContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: 8,
  },
  name: {
    fontSize: 14,
    whiteSpace: "nowrap",
    width: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",

    "@media (max-width: 500px)": {
      fontSize: 12,
      width: 160,
    },
  },
  date: {
    fontSize: 13,
    color: "rgba(0,0,0,0.8)",

    "@media (max-width: 500px)": {
      fontSize: 11,
    },
  },
}));

const QrCard = () => {
  const { classes } = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={dummyQrCode} alt="qr-code" />
      </div>
      <div className={classes.contentContainer}>
        <div>
          <h5 className={classes.name}>My Facebook Profile Url</h5>
          <h6 className={classes.date}>11:11 AM 9/16/2023</h6>
        </div>
        <Button onClick={() => setOpenModal(true)} fullWidth>
          Save & Download
        </Button>
      </div>

      <QrUpload
        upload={{ isLoading: false, isSuccess: true, qrCode: dummyQrCode }}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default QrCard;
