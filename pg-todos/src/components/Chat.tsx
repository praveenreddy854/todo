import React, { useState, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { MessageLeft, MessageRight, Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { useCallLlmFn } from "../hooks/useLlm";
import { useInterPreter } from "../hooks/useInterPreter";
import { Functions } from "../types/types";
import { ThemeContext } from "../context/ThemeContext";

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
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      backgroundColor: theme.palette.background.paper,
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
      height: "calc( 100% - 140px )",
      padding: "10px 5px",
      backgroundColor: theme.palette.background.default,
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: theme.palette.type === "dark" ? "#555" : "#f1f1f1",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.type === "dark" ? "#888" : "#bbb",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: theme.palette.type === "dark" ? "#aaa" : "#888",
      },
    },
    chatHeader: {
      width: "100%",
      height: "60px",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 500,
      fontSize: "1.2rem",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    emptyStateMessage: {
      textAlign: "center",
      padding: "40px 20px",
      color: theme.palette.text.secondary,
      fontStyle: "italic",
    },
    loadingIndicator: {
      position: "absolute",
      bottom: "70px",
      right: "20px",
      backgroundColor: theme.palette.type === "dark" ? "#333" : "#f5f5f5",
      border: `1px solid ${theme.palette.type === "dark" ? "#555" : "#ddd"}`,
      borderRadius: "12px",
      padding: "4px 12px",
      color: theme.palette.text.secondary,
      fontSize: "0.8rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      animation: "pulse 1.5s infinite",
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
  const { isDark } = useContext(ThemeContext) || { isDark: false };

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
      <Paper className={`${classes.paper} chat-paper`}>
        <div className={classes.chatHeader}>
          Chat with Todo Assistant
        </div>
        <Paper className={`${classes.messagesBody} chat-messages-body`}>
          {chatMessages?.length === 0 ? (
            <div className={classes.emptyStateMessage}>
              No messages yet. Start typing to chat with the assistant!
            </div>
          ) : (
            chatMessages.map((message, index) => {
              if (message.userMessage) {
                return <MessageLeft key={index} {...message} />;
              }
              return <MessageRight key={index} {...message} />;
            })
          )}
        </Paper>

        {isLoading && (
          <div className={classes.loadingIndicator}>
            Thinking...
          </div>
        )}

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
