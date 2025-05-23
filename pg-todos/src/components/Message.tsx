import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { ThemeContext } from "../context/ThemeContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: "flex",
      marginBottom: "15px",
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "15px",
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "5px",
      padding: "12px 16px",
      backgroundColor: theme.palette.type === "dark" ? "#1E3A64" : "#E3F2FD",
      color: theme.palette.type === "dark" ? "#fff" : "inherit",
      width: "80%",
      textAlign: "left",
      font: "400 1em 'Roboto', sans-serif",
      border: "none",
      borderRadius: "18px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: `15px solid ${theme.palette.type === "dark" ? "#1E3A64" : "#E3F2FD"}`,
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-12px",
      },
    },
    messageOrange: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "5px",
      padding: "12px 16px",
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light),
      width: "60%",
      textAlign: "left",
      font: "400 1em 'Roboto', sans-serif",
      border: "none",
      borderRadius: "18px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: `15px solid ${theme.palette.primary.light}`,
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        right: "-12px",
      },
    },
    messageContent: {
      padding: 0,
      margin: 0,
      wordBreak: "break-word",
    },
    messageTimeStampRight: {
      position: "relative",
      fontSize: ".75em",
      fontWeight: 300,
      marginTop: "8px",
      color: theme.palette.type === "dark" ? "#aaa" : "#999",
      textAlign: "right",
    },
    orange: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
      width: theme.spacing(5),
      height: theme.spacing(5),
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    displayName: {
      marginLeft: "20px",
      fontWeight: 500,
      fontSize: "0.9em",
      color: theme.palette.type === "dark" ? "#ccc" : "#636363",
    },
    userMessageContainer: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

export interface Message {
  message: string;
  timestamp: Date;
  photoURL: string;
  displayName: string;
  userMessage: boolean;
}

export const MessageLeft = (props: Message) => {
  const message = props.message;
  const timestamp = props.timestamp;
  const photoURL = props.photoURL;
  const displayName = props.displayName;
  const classes = useStyles();
  const { isDark } = useContext(ThemeContext) || { isDark: false };

  return (
    <>
      <div className={`${classes.messageRow} message-animation`}>
        <Avatar
          alt={displayName}
          className={classes.orange}
          src={photoURL}
        ></Avatar>
        <div className={classes.userMessageContainer}>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
          </div>
          <div className={classes.messageTimeStampRight}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </>
  );
};

export const MessageRight = (props: Message) => {
  const classes = useStyles();
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : new Date();
  const { isDark } = useContext(ThemeContext) || { isDark: false };
  
  return (
    <div className={`${classes.messageRowRight} message-animation`}>
      <div>
        <div className={classes.messageOrange}>
          <p className={classes.messageContent}>{message}</p>
        </div>
        <div className={classes.messageTimeStampRight}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
