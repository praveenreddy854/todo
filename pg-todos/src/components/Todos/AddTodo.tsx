import React from 'react';
import { useState, FC, ChangeEvent } from 'react';
import { FormControl, Container, Button, TextField, Snackbar } from '@material-ui/core';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Alert } from '@material-ui/lab';
import { Add } from '@material-ui/icons';
import { AddToDoArgs } from '../../types/types';
import { useAddTodoStyles } from './AddTodo.styles';
import { Dayjs } from 'dayjs';

const AddTodo: FC<{ addTodo: (args: AddToDoArgs) => void }> = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState(false);
  const classes = useAddTodoStyles();
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setText(e.target.value);
  const handleDateChangeAccepted = (date: Dayjs | null) => setDueDate(date);
  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ title: text, dueAt: dueDate?.toDate() });
    setText('');
    if (text.trim()) setOpen(true);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <form onSubmit={createTodo}>
          <FormControl fullWidth={true}>
            <TextField
              className={classes.addTodoControls}
              label="I will do this"
              variant="standard"
              onChange={handleTitleChange}
              required={true}
              value={text}
            />
            <DateTimePicker
              className={classes.addTodoControls}
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              onAccept={(value) => handleDateChangeAccepted(value)}
              label="Due date (optional)"
            />
            <Button
              className={classes.addTodoControls}
              variant="contained"
              color="primary"
              style={{ marginTop: 5 }}
              type="submit"
            >
              <Add />
              Add
            </Button>
          </FormControl>
        </form>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          // icon={<Check fontSize="inherit" />}
          elevation={6}
          variant="filled"
          onClose={() => setOpen(false)}
          severity="success"
        >
          Successfully added item!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddTodo;
