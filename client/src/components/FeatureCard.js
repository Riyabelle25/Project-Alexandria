/* eslint-disable react/prop-types */
import React from "react";
import { VideoCall, LaptopChromebook } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Column, Row, Item } from "@mui-treasury/components/flex";
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
      borderRadius: "2.5rem",
      zIndex: 0,
      bottom: 0,
    },
    "&:hover": {
      transform: "translateY(-5px)",
      backgroundColor: "#555",
      borderRadius: "2.5rem",
      "&:before": {
        bottom: -6,
      },
      "& $card": {
        boxShadow: "-3px 3px 36px 0 #555",
      },
      "& $join": {
        transform: "translateY(-5px)",
      },
    },
  },
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "2.5rem",
    boxShadow: "0 2px 12px 0 #1a237e",
    // backgroundColor: 'rgba(0,0,0,0.08)',
    transition: "0.4s",
    // height: '100%',
    width: "18vw",
    height: "36vh",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: "0.75rem",
  },
  avatar: {
    fontFamily: "Ubuntu",
    fontSize: "0.875rem",
    backgroundColor: "#6d7efc",
  },
  join: {
    fontWeight: "bolder",
    background: "linear-gradient(to top, #81c784, #388e3c)",
    color: "#c5cae9",
    height: "5vh",
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

const CustomCard = ({
  color,
  thumbnail,
  title,
  subtitle,
  description,
  newRoom,
  toJoin,
  icon,
}) => {
  const styles = useStyles();

  const btnStyles = useGraphicBtnStyles();
  return (
    <div className={styles.root}>
      <Column className={styles.card} style={{ backgroundColor: color }}>
        <Row p={2} gap={4} justifyContent={"right"} flexBasis={"auto"}>
          {icon ? (
            <LaptopChromebook
              style={{
                width: 120,
                height: 100,
                justifyContent: "flex-start",
                color: "#c5cae9",
              }}
            />
          ) : (
            <VideoCall
              style={{
                width: 120,
                height: 100,
                justifyContent: "flex-start",
                color: "#c5cae9",
              }}
            />
          )}
        </Row>
        <Box
          flexBasis={"auto"}
          marginTop={1}
          px={2}
          marginRight={8}
          color={"rgb(48, 41, 54)"}
          fontSize={"1vw"}
          fontFamily={"Ubuntu"}
        >
          {description}
        </Box>
        <Row p={2} gap={1} position={"bottom"} flexBasis={"auto"}>
          <Item
            position={"middle-right"}
            alignContent={"flex-end"}
            paddingRight={"2%"}
          >
            <Button
              className={styles.join}
              classes={btnStyles}
              variant={"contained"}
              color={"success"}
              disableRipple
              onClick={newRoom}
            >
              {" "}
              {toJoin}
            </Button>
          </Item>
        </Row>
      </Column>
    </div>
  );
};

export default CustomCard;
