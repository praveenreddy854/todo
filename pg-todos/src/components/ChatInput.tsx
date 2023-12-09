import React, { ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`,
      border: "3px solid grey",
      height: "80px",
    },
    wrapText: {
      width: "100%",
    },
    button: {
      //margin: theme.spacing(1),
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
  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="Chat input"
          className={classes.wrapText}
          onChange={props.onChange}
          value={props.value}
        />
        <Button
          color="primary"
          className={classes.button}
          onClick={props.onClick}
          type="button"
        >
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
