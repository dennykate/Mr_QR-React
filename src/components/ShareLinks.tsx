import { toast } from "react-toastify";
import { Button, Input, createStyles } from "@mantine/core";

import { shareButtons } from "../constants";
import { ShareLinksProps } from "../types";

const useStyles = createStyles(() => ({
  wrapper: {
    width: "100%",
    padding: "12px 0px",
    paddingRight: 10,
    marginTop: 20,
    borderTop: "0.5px solid gray",
  },
  title: {
    margin: 0,
    padding: 0,
    fontSize: 20,
  },
  title2: {
    margin: 0,
    padding: 0,
    fontSize: 17,
    color: "#010203",
    fontWeight: 500,
  },
  sharesContainer: {
    display: "flex",
    alignItems: "center",
    margin: "15px 0",
    gap: 5,
  },
  input: {
    marginTop: "15px",
  },
}));

const ShareLinks = ({ url }: ShareLinksProps) => {
  const { classes } = useStyles();

  const onCopyHandler = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Copied Successfully");
    });
  };

  return (
    <div className={classes.wrapper}>
      <h5 className={classes.title}>Share this link</h5>

      <div className={classes.sharesContainer}>
        {shareButtons?.map(({ Button, Icon }, i) => (
          <Button key={i} url={url}>
            <Icon size={38} round />
          </Button>
        ))}
      </div>

      <h6 className={classes.title2}>Or copy link</h6>

      <Input
        value={url}
        onChange={() => {}}
        className={classes.input}
        placeholder="QR Url"
        rightSection={
          <Button
            radius={0}
            sx={{ borderTopRightRadius: 3, borderBottomRightRadius: 3 }}
            onClick={onCopyHandler}
          >
            Copy
          </Button>
        }
      />
    </div>
  );
};

export default ShareLinks;
