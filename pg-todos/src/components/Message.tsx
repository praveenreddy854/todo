import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, blue, grey } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: 'flex',
      marginBottom: '20px',
    },
    messageRowRight: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '20px',
    },
    messageBlue: {
      position: 'relative',
      marginLeft: '20px',
      marginBottom: '10px',
      padding: '15px',
      backgroundColor: '#f0f0f0',
      maxWidth: '70%',
      textAlign: 'left',
      borderRadius: '18px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      '&:after': {
        content: "''",
        position: 'absolute',
        width: '0',
        height: '0',
        borderTop: '15px solid transparent',
        borderBottom: '15px solid transparent',
        borderRight: '15px solid #f0f0f0',
        top: '15px',
        left: '-15px',
      },
    },
    messageOrange: {
      position: 'relative',
      marginRight: '20px',
      marginBottom: '10px',
      padding: '15px',
      backgroundColor: '#3f51b5',
      maxWidth: '70%',
      textAlign: 'left',
      borderRadius: '18px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      '&:after': {
        content: "''",
        position: 'absolute',
        width: '0',
        height: '0',
        borderTop: '15px solid transparent',
        borderBottom: '15px solid transparent',
        borderLeft: '15px solid #3f51b5',
        top: '15px',
        right: '-15px',
      },
    },
    messageContent: {
      padding: 0,
      margin: 0,
      color: grey[800],
      fontSize: '1rem',
      lineHeight: 1.5,
      wordBreak: 'break-word',
    },
    messageContentAI: {
      padding: 0,
      margin: 0,
      color: 'white',
      fontSize: '1rem',
      lineHeight: 1.5,
      wordBreak: 'break-word',
    },
    messageTimeStampRight: {
      position: 'relative',
      fontSize: '.7rem',
      fontWeight: 300,
      marginTop: '8px',
      color: grey[500],
      textAlign: 'right',
    },
    messageTimeStampRightAI: {
      position: 'relative',
      fontSize: '.7rem',
      fontWeight: 300,
      marginTop: '8px',
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'right',
    },
    avatarContainer: {
      marginTop: '5px',
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    avatarNothing: {
      color: 'transparent',
      backgroundColor: 'transparent',
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    displayName: {
      marginLeft: '20px',
      fontSize: '0.8rem',
      color: grey[600],
      fontWeight: 500,
      marginBottom: '5px',
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
  return (
    <>
      <div className={classes.messageRow}>
        <div className={classes.avatarContainer}>
          <Avatar alt={displayName} className={classes.orange} src={photoURL}></Avatar>
        </div>
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <Typography variant="body1" className={classes.messageContent}>
                {message}
              </Typography>
            </div>
            <div className={classes.messageTimeStampRight}>{timestamp.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export const MessageRight = (props: Message) => {
  const classes = useStyles();
  const message = props.message ? props.message : 'no message';
  const timestamp = props.timestamp ? props.timestamp : '';
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <Typography variant="body1" className={classes.messageContentAI}>
          {message}
        </Typography>
        <div className={classes.messageTimeStampRightAI}>{timestamp.toLocaleString()}</div>
      </div>
    </div>
  );
};
