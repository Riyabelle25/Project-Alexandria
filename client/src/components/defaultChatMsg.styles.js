export default ({ palette, spacing }) => {
  const radius = spacing(2.5);
  const size = spacing(5);
  const rightBgColor = "#15032e";
  // if you want the same as facebook messenger, use this color '#09f'
  return {
    avatar: {
      width: size,
      height: size,
    },
    leftRow: {
      textAlign: "left",
    },
    rightRow: {
      textAlign: "right",
    },
    msg: {
      padding: spacing(2, 2),
      borderRadius: 2,
      marginBottom: 2,
      display: "inline-block",
      wordBreak: "break-word",
      fontFamily:
        // eslint-disable-next-line max-len
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: "1vw",
    },
    left: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      backgroundColor: "rgb(144, 131, 156)",
      color: "black",
    },
    right: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      backgroundColor: rightBgColor,
      color: palette.common.white,
    },
    leftFirst: {
      borderTopLeftRadius: radius,
    },
    leftLast: {
      borderBottomLeftRadius: radius,
    },
    rightFirst: {
      borderTopRightRadius: radius,
    },
    rightLast: {
      borderBottomRightRadius: radius,
    },
  };
};
