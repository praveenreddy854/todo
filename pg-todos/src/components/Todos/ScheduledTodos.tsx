import * as React from 'react';
import { TodoType } from '../../types';
import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SmallTextContext } from '../../context/SmallTextContext';
import { useContext, useState } from 'react';
import { DeleteConfirmContext } from '../../context/DeleteConfirmContext';
import { ThemeContext } from '../../context/ThemeContext';
import { TodoStyleProps, getTodoStyles } from './Todo.styles';
import { getRelativeTimeString } from '../../functions/dateTimeUtils';
import { MainContext } from '../../context/MainContext';
import ActionsMenu from '../Actions/ActionsMenu';
import { DeleteConfirm } from '../Actions/DeleteConfirm';
import EditConfirm from '../Actions/EditConfirm';

interface ScheduledTodoProps {
  todos: TodoType[];
  onDelete: () => void;
  onEdit: () => void;
}

export default function ScheduledTodos(props: ScheduledTodoProps) {
  const { todos: rows, onDelete, onEdit } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Due date</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length === 0 ? (
            <EmptyRows />
          ) : (
            rows.map((row) => {
              return <Row row={row} onDelete={onDelete} onEdit={onEdit} />;
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row(props: { row: TodoType; onDelete: () => void; onEdit: () => void }) {
  const { row, onDelete, onEdit } = props;

  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery('(max-width: 768px)');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { isDeleteConfirmation } = useContext(DeleteConfirmContext)!;
  const { isSmallText } = useContext(SmallTextContext)!;
  const { isDark } = useContext(ThemeContext)!;
  const { markComplete, markStar, hideTodo, deleteTodos, updateTodos } = useContext(MainContext)!;

  if (!row) {
    return <></>;
  }

  let checkedStyle = { textDecoration: 'none' };
  if (row.completed) checkedStyle.textDecoration = 'line-through';
  else checkedStyle.textDecoration = 'none';

  const styles = getTodoStyles({ isSmallText, matches, todo: row, isDark } as TodoStyleProps);

  const deleteTodoEvent = (e: any) => {
    if (e.shiftKey || isDeleteConfirmation) {
      deleteTodos([row.id]);
      onDelete();
    } else setDeleteOpen(true);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={styles.text}>
          {row.id}
        </TableCell>
        <TableCell component="th" scope="row" style={styles.text}>
          {row.title}
        </TableCell>
        <TableCell style={styles.text} scope="row">
          {new Date(row.dueAt!).toLocaleDateString() + ' ' + new Date(row.dueAt!).toLocaleTimeString()}
        </TableCell>
        <TableCell>
          <ActionsMenu
            deleteTodo={(e) => deleteTodoEvent(e)}
            setEditOpen={setEditOpen}
            todo={row}
            markStar={markStar}
            hideTodo={hideTodo}
            markComplete={markComplete}
          />
        </TableCell>
      </TableRow>
      <TableRow style={{ border: 'none', background: '#F8F8F8' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 'none' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography variant="h6">More details</Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Modified Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={row.id}>
                  <TableCell>{getRelativeTimeString(new Date(row.createdAt))}</TableCell>
                  <TableCell>{getRelativeTimeString(new Date(row.modifiedAt))}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>

      <DeleteConfirm
        yes={() => {
          setDeleteOpen(false);
          setTimeout(() => {
            deleteTodos([row.id]);
            onDelete();
          }, 200);
        }}
        open={deleteOpen}
        close={() => setDeleteOpen(false)}
      />
      <EditConfirm
        yes={(val: string, dueAt: Date | undefined) => {
          setEditOpen(false);
          setTimeout(() => {
            updateTodos([{ id: row.id, title: val, dueAt }]);
            onEdit();
          }, 200);
        }}
        open={editOpen}
        close={() => setEditOpen(false)}
        value={row.title}
        dueAt={row.dueAt}
      />
    </React.Fragment>
  );
}

function EmptyRows() {
  return (
    <TableRow>
      <TableCell colSpan={4} align="center">
        <h3>No scheduled todos found</h3>
      </TableCell>
    </TableRow>
  );
}
