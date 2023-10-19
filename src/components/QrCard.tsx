import { useState } from "react";
import { Button, createStyles } from "@mantine/core";

import { QrUpload } from ".";
import { QrCardTypes } from "../types";
import { dateToFormat } from "../libs/functions";

const useStyles = createStyles(() => ({
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

const QrCard = ({ data }: { data: QrCardTypes }) => {
  const { classes } = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={data?.qrCode} alt="qr-code" />
      </div>
      <div className={classes.contentContainer}>
        <div>
          <h5 className={classes.name}>{data?.name}</h5>
          <h6 className={classes.date}>
            {dateToFormat(data?.created_at.toString())}
          </h6>
        </div>
        <Button onClick={() => setOpenModal(true)} fullWidth>
          Save & Download
        </Button>
      </div>

      <QrUpload
        upload={{ isLoading: false, isSuccess: true, qrCode: data?.qrCode }}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default QrCard;
