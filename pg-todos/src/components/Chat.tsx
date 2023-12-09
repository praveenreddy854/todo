import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { MessageLeft, MessageRight, Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { useCallLlmFn } from "../hooks/useLlm";
import { useInterPreter } from "../hooks/useInterPreter";
import { Functions } from "../types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "95vh",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
      marginTop: "80px",
    },
  })
);

export interface ChatProps {
  messages: Message[];
}
export function Chat() {
  const classes = useStyles();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const { error, isLoading, mutateAsync } = useCallLlmFn();

  const [currentChatMessage, setCurrentChatMessage] = useState<Message>();
  const [value, setValue] = useState("");

  const callInterPrtr = useInterPreter();

  const handleChatMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);
    const message = {
      userMessage: true,
      message: event.target.value,
      timestamp: new Date(),
      photoURL: "",
      displayName: "PG",
    };
    setCurrentChatMessage(message);
  };

  const getSuccessMessage = (fnName?: string) => {
    if (!fnName) {
      throw new Error("Function name is undefined");
    }
    if (fnName === Functions.createTodo) {
      return "Added ToDo successfully";
    }
    if (fnName === Functions.deleteTodo) {
      return "Deleted ToDo successfully";
    }
    if (fnName === Functions.deleteTodos) {
      return "Deleted ToDos successfully";
    }
    if (fnName === Functions.updateTodo) {
      return "Updated ToDo successfully";
    }
    return "Successfully completed operation";
  };

  const handleChatMessageSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const response = await mutateAsync(value);
    callInterPrtr(response);

    event.preventDefault();
    let systemMessage;
    if (isLoading) {
      systemMessage = {
        userMessage: false,
        message: "Processing...",
        timestamp: new Date(),
        photoURL: "",
        displayName: "System",
      };
    } else if (error) {
      systemMessage = {
        userMessage: false,
        message: error.message,
        timestamp: new Date(),
        photoURL: "",
        displayName: "System",
      };
    } else {
      systemMessage = {
        userMessage: false,
        message: getSuccessMessage(response?.message?.functionCall?.name),
        timestamp: new Date(),
        photoURL: "",
        displayName: "System",
      };
    }
    setChatMessages(
      !!currentChatMessage
        ? [...chatMessages, currentChatMessage, systemMessage]
        : chatMessages
    );

    setCurrentChatMessage(undefined);
    setValue("");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-end"
    >
      <Paper className={classes.paper}>
        <Paper className={classes.messagesBody}>
          {chatMessages?.map((message) => {
            if (message.userMessage) {
              return <MessageLeft {...message} />;
            }
            return <MessageRight {...message} />;
          })}
        </Paper>

        <ChatInput
          onChange={handleChatMessageChange}
          onClick={handleChatMessageSubmit}
          value={value}
          enabled={!isLoading}
        />
      </Paper>
    </Grid>
  );
}
