import { TodoType } from '../../types';
import React, { useState, useContext, forwardRef } from 'react';
import { DeleteConfirm } from '../Actions/DeleteConfirm';
import EditConfirm from '../Actions/EditConfirm';
import { Card, CardContent, Typography, Container, useMediaQuery, Checkbox, Grid } from '@material-ui/core';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { DeleteConfirmContext } from '../../context/DeleteConfirmContext';
import ActionsMenu from '../Actions/ActionsMenu';
import { SmallTextContext } from '../../context/SmallTextContext';
import { ThemeContext } from '../../context/ThemeContext';
import { MainContext } from '../../context/MainContext';
import FlipMove from 'react-flip-move';
import { getTodoStyles } from './Todo.styles';

interface Props {
  todo: TodoType;
  index: number;
  onDelete: () => void;
  onEdit: () => void;
}

const Todo = forwardRef(({ todo, index, onDelete, onEdit }: Props, ref: any) => {
  const { markComplete, markStar, hideTodo, deleteTodos, updateTodos } = useContext(MainContext)!;
  const matches = useMediaQuery('(max-width: 768px)');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { isDeleteConfirmation } = useContext(DeleteConfirmContext)!;
  const { isSmallText } = useContext(SmallTextContext)!;
  const { isDark } = useContext(ThemeContext)!;
  let checkedStyle = { textDecoration: 'none' };
  if (todo.completed) checkedStyle.textDecoration = 'line-through';
  else checkedStyle.textDecoration = 'none';

  const styles = getTodoStyles({ isSmallText, matches, todo, isDark });

  const deleteTodoEvent = (e: any) => {
    if (e.shiftKey || isDeleteConfirmation) {
      deleteTodos([todo.id]);
      onDelete();
    } else setDeleteOpen(true);
  };
  return (
    <Container ref={ref}>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(p) => (
          <Card
            className="todo-card"
            variant="outlined"
            ref={p.innerRef}
            {...p.draggableProps}
            {...p.dragHandleProps}
            style={{
              ...styles.card,
              userSelect: 'none',
              ...p.draggableProps.style,
            }}
          >
            <CardContent className="card-content" style={{ padding: '16px' }}>
              <Typography variant="h5" component="h2" style={checkedStyle} className="todo-text">
                <Grid container alignItems="center" justify="flex-start">
                  <Grid item>
                    <Checkbox
                      checked={todo.completed}
                      color="primary"
                      style={{ marginRight: 5 }}
                      onClick={() => markComplete(todo.id)}
                      centerRipple={false}
                    />
                  </Grid>
                  <Grid item>
                    <div style={styles.text}>{todo.id + ':'}</div>
                  </Grid>
                  <Grid item style={{ flex: 2 }}>
                    <div style={styles.text}>{todo.title}</div>
                  </Grid>
                  <Grid item>
                    <ActionsMenu
                      deleteTodo={(e) => deleteTodoEvent(e)}
                      setEditOpen={setEditOpen}
                      todo={todo}
                      markStar={markStar}
                      hideTodo={hideTodo}
                      markComplete={markComplete}
                    />
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        )}
      </Draggable>
      <DeleteConfirm
        yes={() => {
          setDeleteOpen(false);
          setTimeout(() => {
            deleteTodos([todo.id]);
            onDelete();
          }, 200);
        }}
        open={deleteOpen}
        close={() => setDeleteOpen(false)}
      />
      <EditConfirm
        yes={(val: string, dueAt?: Date) => {
          setEditOpen(false);
          setTimeout(() => {
            updateTodos([{ id: todo.id, title: val, dueAt }]);
            onEdit();
          }, 200);
        }}
        open={editOpen}
        close={() => setEditOpen(false)}
        value={todo.title}
      />
    </Container>
  );
});

interface UnscheduledTodosProps {
  todos: TodoType[];
  onDelete: (val: boolean) => void;
  onEdit: (val: boolean) => void;
}
export const UnscheduledTodos = (props: UnscheduledTodosProps) => {
  const { todos, onDelete, onEdit } = props;
  const { moveTodo } = useContext(MainContext)!;
  const [dragging, setDragging] = useState(false);
  const onDragEnd = (x: DropResult) => {
    if (!x.destination) return console.log(x);
    moveTodo(x.source.index, x.destination.index);
    setTimeout(() => setDragging(false), 200);
  };

  return (
    <DragDropContext onBeforeDragStart={() => setDragging(true)} onDragEnd={onDragEnd}>
      <Droppable droppableId="0">
        {(p) => (
          <div {...p.droppableProps} ref={p.innerRef}>
            <FlipMove disableAllAnimations={dragging}>
              {todos.map((todo, i) => {
                return (
                  <Todo
                    todo={todo}
                    key={todo.id}
                    onDelete={() => onDelete(true)}
                    index={i}
                    onEdit={() => onEdit(true)}
                  />
                );
              })}
            </FlipMove>
            {p.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
