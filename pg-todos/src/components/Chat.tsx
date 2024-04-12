import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Grid, LinearProgress, Paper } from "@material-ui/core";
import { MessageLeft, MessageRight, Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { useCallLlmFn } from "../hooks/useLlm";
import { useInterPreter } from "../hooks/useInterPreter";
import { Functions } from "../types/types";
import { CompletionsFinishReason } from "@azure/openai";

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
  const { error, isLoading, mutate } = useCallLlmFn();

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

  const getSuccessMessage = (
    completionReason: CompletionsFinishReason | null
  ) => {
    if (completionReason !== "stop") {
      throw new Error("Operation failed. Please try again.");
    }
    return "Successfully completed operation";
  };

  const handleChatMessageSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    let systemMessage;
    systemMessage = {
      userMessage: false,
      message: "Processing...",
      timestamp: new Date(),
      photoURL: "",
      displayName: "System",
    };

    setChatMessages(
      !!currentChatMessage
        ? [...chatMessages, currentChatMessage, systemMessage]
        : chatMessages
    );
    setValue("");

    mutate(value, {
      onSuccess: (data) => {
        try {
          callInterPrtr(data);
          if (error) {
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
              message: getSuccessMessage(data?.finishReason),
              timestamp: new Date(),
              photoURL: "",
              displayName: "System",
            };
          }
        } catch (error) {
          systemMessage = {
            userMessage: false,
            message: "Something went wrong. Please try again.",
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
      },
    });

    setCurrentChatMessage(undefined);
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

        {isLoading && (
          <Box sx={{ width: "100%", padding: 10 }}>
            <LinearProgress />
          </Box>
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
