import React, { ChangeEvent, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { ThemeContext } from "../context/ThemeContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(1)} auto`,
      border: `1px solid ${theme.palette.type === "dark" ? "#555" : "#E0E0E0"}`,
      borderRadius: "24px",
      height: "60px",
      overflow: "hidden",
      backgroundColor: theme.palette.type === "dark" ? "#333" : "#F5F5F5",
      transition: "all 0.3s ease",
      "&:focus-within": {
        boxShadow: `0 0 5px ${theme.palette.type === "dark" ? "rgba(33, 150, 243, 0.3)" : "rgba(33, 150, 243, 0.5)"}`,
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    wrapText: {
      width: "100%",
      "& .MuiInputBase-root": {
        height: "100%",
        color: theme.palette.text.primary,
      },
      "& .MuiInputLabel-root": {
        transform: "translate(14px, 16px) scale(1)",
        color: theme.palette.text.secondary,
      },
      "& .MuiInputLabel-shrink": {
        transform: "translate(14px, 3px) scale(0.75)",
      },
      "& .MuiInput-underline:before, & .MuiInput-underline:after": {
        display: "none",
      },
    },
    button: {
      borderRadius: "0",
      height: "100%",
      width: "60px",
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      "&:disabled": {
        backgroundColor: theme.palette.type === "dark" ? "#555" : "#BDBDBD",
      },
    },
    inputField: {
      paddingLeft: "14px",
      backgroundColor: "transparent",
    },
  })
);

export interface ChatInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  enabled: boolean;
}
export const ChatInput = (props: ChatInputProps) => {
  const classes = useStyles();
  const { isDark } = useContext(ThemeContext) || { isDark: false };
  
  return (
    <>
      <form className={`${classes.wrapForm} chat-input-wrapper`} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="Type your message..."
          className={classes.wrapText}
          InputProps={{
            className: classes.inputField,
          }}
          onChange={props.onChange}
          value={props.value}
          disabled={!props.enabled}
        />
        <Button
          color="primary"
          className={classes.button}
          onClick={props.onClick}
          type="button"
          disabled={!props.enabled}
        >
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
