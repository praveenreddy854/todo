import React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
} from '@material-ui/core';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getEditConfirmStyles } from './EditConfirm.styles';

interface Props {
  yes: (val: string, dueAt: Date | undefined) => void;
  open: boolean;
  close: () => void;
  value: string;
  dueAt?: Date;
}

const EditConfirm = ({ open, close, value, yes, dueAt }: Props) => {
  const [newValue, setNewValue] = useState(value);
  const [dueDate, setDueDate] = useState<Date | undefined>(dueAt);
  const editConfirmStyles = getEditConfirmStyles();
  const onClose = () => {
    setNewValue(value);
    close();
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">EDIT ITEM</DialogTitle>
      <DialogContent>
        <DialogContentText>Please provide the new name for this item.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="New Value"
          type="text"
          fullWidth
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <div style={editConfirmStyles.dateTimePicker}>
          <DateTimePicker
            label="Enter due date"
            value={!!dueDate ? dayjs(dueDate) : undefined}
            onAccept={(value) => setDueDate(value?.toDate())}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => newValue.trim() && yes(newValue, dueDate)} color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditConfirm;
