import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoTitle } from "@mui-treasury/components/info";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    transition: "0.3s",
    position: "relative",
    "&:before": {
      transition: "0.2s",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      backgroundColor: "rgba(0,0,0,0.08)",
      borderRadius: "1.5rem",
      zIndex: 0,
      bottom: 0,
    },
    "&:hover": {
      transform: "translateY(-4px)",
      backgroundColor: "rgb(127, 136, 187)",
      borderRadius: "1.5rem",
      "&:before": {
        bottom: -6,
        backgroundColor: "rgba(0,0,0,0.08)",
      },
      "& $card": {},
    },
  },
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "1rem",

    backgroundColor: "rgba(0,0,0,0.08)",
    transition: "0.4s",
    width: "36vw",
    height: "15vh",
  },
  logo: {
    width: "70px",
    height: "60px",
    borderRadius: "0.75rem",
  },
  avatar: {
    fontFamily: "Ubuntu",
    fontSize: "0.875rem",
    backgroundColor: "#6d7efc",
  },
  join: {
    fontWeight: "bold",
    background: "linear-gradient(to top, #81c784, #388e3c)",
    color: "azure",
    width: "140px",
    height: "60px",
    marginTop: "10px",
    borderRadius: "1rem",
    alignContent: "flex-end",

    "& > *": {
      textTransform: "none !important",
    },
  },
  action: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.5)",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
}));

// eslint-disable-next-line react/prop-types
const CustomCard = ({ title }) => {
  const styles = useStyles();

  const btnStyles = useGraphicBtnStyles();
  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <Row
          p={4}
          px={7}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Info
            position={"middle"}
            useStyles={useApexInfoStyles}
            style={{ paddingLeft: "10px" }}
          >
            <InfoTitle
              style={{
                fontSize: "1.5vw",
                fontWeight: "100",
                color: "azure",
                marginLeft: -1,
              }}
            >
              {title}
            </InfoTitle>
          </Info>
          <Item alignContent={"flex-end"}>
            <Button
              className={styles.join}
              classes={btnStyles}
              variant={"contained"}
              color={"success"}
              disableRipple
              onClick={() => (window.location.href = `/room/${title}`)}
            >
              {" "}
              Enter
            </Button>
          </Item>
        </Row>
      </Column>
    </div>
  );
};

export default CustomCard;
