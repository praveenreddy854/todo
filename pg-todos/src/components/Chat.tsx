import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid, LinearProgress, Paper, Typography, IconButton, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { MessageLeft, MessageRight, Message } from './Message';
import { ChatInput } from './ChatInput';
import { useCallLlmFn } from '../hooks/useLlm';
import { useInterPreter } from '../hooks/useInterPreter';
import { CompletionsFinishReason } from '@azure/openai';
import { blue, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      height: '100%',
      maxWidth: '350px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#fff',
      borderRadius: 0,
      boxShadow: 'none',
    },
    header: {
      width: '100%',
      padding: theme.spacing(2),
      backgroundColor: '#3f51b5',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'absolute',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #303f9f',
    },
    headerTitle: {
      fontWeight: 600,
      fontSize: '1.2rem',
    },
    closeButton: {
      color: 'white',
    },
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesBody: {
      width: '100%',
      overflowY: 'auto',
      height: 'calc(100% - 80px)',
      padding: theme.spacing(2),
      backgroundColor: '#f5f7f9',
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#bbb',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#999',
      },
    },
    progress: {
      width: '100%',
      position: 'absolute',
      bottom: '80px',
      padding: 0,
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: grey[500],
      padding: theme.spacing(3),
      textAlign: 'center',
    },
    emptyStateText: {
      marginTop: theme.spacing(2),
    },
  })
);

export interface ChatProps {
  messages?: Message[];
  onClose?: () => void;
}
export function Chat({ onClose }: ChatProps) {
  const classes = useStyles();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const { error, isLoading, mutate } = useCallLlmFn();

  const [currentChatMessage, setCurrentChatMessage] = useState<Message>();
  const [value, setValue] = useState('');

  const callInterPrtr = useInterPreter();

  const handleChatMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const message = {
      userMessage: true,
      message: event.target.value,
      timestamp: new Date(),
      photoURL: '',
      displayName: 'You',
    };
    setCurrentChatMessage(message);
  };

  const getSuccessMessage = (completionReason: CompletionsFinishReason | null) => {
    if (completionReason !== 'stop') {
      throw new Error('Operation failed. Please try again.');
    }
    return 'Successfully completed operation';
  };

  const handleChatMessageSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let systemMessage;
    systemMessage = {
      userMessage: false,
      message: 'Processing...',
      timestamp: new Date(),
      photoURL: '',
      displayName: 'System',
    };

    setChatMessages(!!currentChatMessage ? [...chatMessages, currentChatMessage, systemMessage] : chatMessages);
    setValue('');

    mutate(value, {
      onSuccess: (data) => {
        try {
          callInterPrtr(data);
          if (error) {
            systemMessage = {
              userMessage: false,
              message: error.message,
              timestamp: new Date(),
              photoURL: '',
              displayName: 'System',
            };
          } else {
            systemMessage = {
              userMessage: false,
              message: getSuccessMessage(data?.finishReason),
              timestamp: new Date(),
              photoURL: '',
              displayName: 'System',
            };
          }
        } catch (error) {
          systemMessage = {
            userMessage: false,
            message: 'Something went wrong. Please try again.',
            timestamp: new Date(),
            photoURL: '',
            displayName: 'System',
          };
        }
        setChatMessages(!!currentChatMessage ? [...chatMessages, currentChatMessage, systemMessage] : chatMessages);
      },
    });

    setCurrentChatMessage(undefined);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="flex-end" style={{ height: '100%' }}>
      <Paper className={classes.paper}>
        <div className={classes.messagesBody}>
          {chatMessages.length === 0 ? (
            <div className={classes.emptyState}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
                alt="Chat assistant"
                style={{ width: '80px', opacity: 0.6 }}
              />
              <Typography variant="body1" className={classes.emptyStateText}>
                Ask me anything about your tasks and I'll try to help you!
              </Typography>
            </div>
          ) : (
            chatMessages?.map((message) => {
              const key = `message_${message.timestamp.getTime()}`;
              if (message.userMessage) {
                return <MessageLeft {...message} key={key} />;
              }
              return <MessageRight {...message} key={key} />;
            })
          )}
        </div>

        {isLoading && (
          <div className={classes.progress}>
            <LinearProgress color="primary" />
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
