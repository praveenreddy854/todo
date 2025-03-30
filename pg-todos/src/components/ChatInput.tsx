import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { blue, grey } from '@material-ui/core/colors';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '95%',
      margin: '0 auto',
      padding: theme.spacing(1, 2),
      borderRadius: '24px',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    wrapText: {
      width: '90%',
      '& .MuiInputBase-root': {
        color: grey[800],
      },
      '& .MuiFormLabel-root': {
        color: grey[600],
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: 'transparent',
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'transparent',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'transparent',
      },
    },
    button: {
      borderRadius: '50%',
      minWidth: '40px',
      height: '40px',
      backgroundColor: '#3f51b5',
      color: 'white',
      '&:hover': {
        backgroundColor: '#303f9f',
      },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
    },
    sendIcon: {
      color: 'white',
      marginRight: 0,
    },
    inputContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      padding: theme.spacing(2, 0),
      backgroundColor: '#f5f7f9',
      borderTop: '1px solid #e0e0e0',
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
    <div className={classes.inputContainer}>
      <Paper className={classes.wrapForm} elevation={0}>
        <TextField
          id="standard-text"
          placeholder="Type a message..."
          className={classes.wrapText}
          onChange={props.onChange}
          value={props.value}
          disabled={!props.enabled}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              props.onClick(event as any);
            }
          }}
          variant="standard"
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Button
          className={classes.button}
          onClick={props.onClick}
          type="button"
          disabled={!props.enabled}
          variant="contained"
          disableElevation
        >
          <SendIcon className={classes.sendIcon} />
        </Button>
      </Paper>
    </div>
  );
};
