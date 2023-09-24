import { Grid, createStyles } from "@mantine/core";

import { QrCard } from ".";

const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: 1024,
    height: "100%",
    margin: "0 auto",
  },
}));

const QrCardContainer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Grid gutter={0}>
        {[0, 1, 2, 3, 4, 5].map((data, index) => (
          <Grid.Col key={index} span={6} sm={6} md={4} lg={3}>
            <QrCard />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default QrCardContainer;
