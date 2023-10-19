import { useEffect, useState } from "react";
import { Grid, createStyles } from "@mantine/core";

import { QrCard, QrFooter } from ".";
import useQuery from "../hooks/useQuery";
import { QrCardTypes } from "../types";

const useStyles = createStyles(() => ({
  container: {
    maxWidth: 1024,
    minHeight: "90vh",
    margin: "0 auto",
  },
}));

const QrCardContainer = () => {
  const { classes } = useStyles();
  const [data, setData] = useState<QrCardTypes[]>([]);
  const [total, setTotal] = useState<number>(0);

  const { query } = useQuery();

  useEffect(() => {
    getQrData(1);
  }, []);

  const getQrData = async (page: number) => {
    const data = await query(`/qr?page=${page}`);

    setTotal(data.total);
    setData((prev) => {
      return [...prev, ...data.data];
    });
  };

  return (
    <div className={classes.container}>
      <Grid gutter={0}>
        {data?.map((card, index) => (
          <Grid.Col key={index} span={6} sm={6} md={4} lg={3}>
            <QrCard data={card} />
          </Grid.Col>
        ))}
      </Grid>

      {data.length < total && <QrFooter getQrData={getQrData} />}
    </div>
  );
};

export default QrCardContainer;
