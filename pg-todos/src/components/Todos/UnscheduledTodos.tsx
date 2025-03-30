import { TodoType } from '../../types';
import React, { useState, useContext } from 'react';
import { DeleteConfirm } from '../Actions/DeleteConfirm';
import EditConfirm from '../Actions/EditConfirm';
import { Card, CardContent, Typography, useMediaQuery, Checkbox, Grid, Paper } from '@material-ui/core';
import {
  DragDropContext as DragDropContextRaw,
  Draggable as DraggableRaw,
  DropResult,
  Droppable as DroppableRaw,
} from 'react-beautiful-dnd';
import { DeleteConfirmContext } from '../../context/DeleteConfirmContext';
import ActionsMenu from '../Actions/ActionsMenu';
import { SmallTextContext } from '../../context/SmallTextContext';
import { ThemeContext } from '../../context/ThemeContext';
import { MainContext } from '../../context/MainContext';
import { getTodoStyles } from './Todo.styles';
import { styled } from '@mui/material/styles';
import { Box, Tooltip } from '@material-ui/core';

// Type assertions to fix React 18 compatibility
const DragDropContext = DragDropContextRaw as any;
const Droppable = DroppableRaw as any;
const Draggable = DraggableRaw as any;

// Styled components for consistent styling
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  marginBottom: '24px',
  border: '1px solid rgba(0, 0, 0, 0.04)',
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
}));

interface UnscheduledTodosProps {
  todos: TodoType[];
  onDelete: () => void;
  onEdit: () => void;
}

export const UnscheduledTodos = (props: UnscheduledTodosProps) => {
  const { todos, onDelete, onEdit } = props;
  const { moveTodo } = useContext(MainContext)!;
  const [dragging, setDragging] = useState(false);
  const { isDark } = useContext(ThemeContext)!;
  const { isSmallText } = useContext(SmallTextContext)!;
  const { isDeleteConfirmation } = useContext(DeleteConfirmContext)!;
  const matches = useMediaQuery('(max-width: 768px)');
  const [deleteOpenMap, setDeleteOpenMap] = useState<Record<number, boolean>>({});
  const [editOpenMap, setEditOpenMap] = useState<Record<number, boolean>>({});
  const { markComplete, markStar, hideTodo, deleteTodos, updateTodos } = useContext(MainContext)!;

  const onDragEnd = (result: DropResult) => {
    setDragging(false);

    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    moveTodo(result.source.index, result.destination.index);
  };

  const openDeleteDialog = (todoId: number) => {
    setDeleteOpenMap((prev) => ({ ...prev, [todoId]: true }));
  };

  const closeDeleteDialog = (todoId: number) => {
    setDeleteOpenMap((prev) => ({ ...prev, [todoId]: false }));
  };

  const openEditDialog = (todoId: number) => {
    setEditOpenMap((prev) => ({ ...prev, [todoId]: true }));
  };

  const closeEditDialog = (todoId: number) => {
    setEditOpenMap((prev) => ({ ...prev, [todoId]: false }));
  };

  const deleteTodoEvent = (e: any, todoId: number) => {
    if (e.shiftKey || isDeleteConfirmation) {
      deleteTodos([todoId]);
      onDelete();
    } else {
      openDeleteDialog(todoId);
    }
  };

  const handleDeleteConfirm = (todoId: number) => {
    closeDeleteDialog(todoId);
    setTimeout(() => {
      deleteTodos([todoId]);
      onDelete();
    }, 200);
  };

  const handleEditConfirm = (todoId: number, val: string, dueAt?: Date) => {
    closeEditDialog(todoId);
    setTimeout(() => {
      updateTodos([{ id: todoId, title: val, dueAt }]);
      onEdit();
    }, 200);
  };

  return (
    <StyledPaper
      style={{
        backgroundColor: isDark ? '#111827' : '#f0f9ff',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(59, 130, 246, 0.2)',
        boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(59, 130, 246, 0.1)',
      }}
    >
      <Box
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={1}
        borderColor="divider"
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: 600,
            color: isDark ? '#f1f5f9' : '#334155',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          }}
        >
          Unscheduled Tasks
        </Typography>
        <Tooltip title="Drag to reorder tasks">
          <Typography
            variant="body2"
            style={{
              color: isDark ? '#94a3b8' : '#64748b',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            }}
          >
            {dragging ? 'Release to drop' : 'Drag to reorder'}
          </Typography>
        </Tooltip>
      </Box>

      <Box p={2}>
        <DragDropContext onDragStart={() => setDragging(true)} onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided: any, snapshot: any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  minHeight: '50px',
                  backgroundColor: snapshot.isDraggingOver
                    ? isDark
                      ? 'rgba(99, 102, 241, 0.15)'
                      : 'rgba(99, 102, 241, 0.08)'
                    : isDark
                    ? 'rgba(30, 41, 59, 0.7)'
                    : 'rgba(224, 242, 254, 0.8)',
                  borderRadius: '12px',
                  transition: 'background-color 0.2s ease',
                  padding: '12px',
                  border: isDark ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid rgba(59, 130, 246, 0.15)',
                }}
              >
                {todos.length === 0 ? (
                  <Box
                    sx={{
                      padding: '48px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      borderRadius: '8px',
                      border: isDark ? '1px dashed rgba(148, 163, 184, 0.2)' : '1px dashed rgba(148, 163, 184, 0.5)',
                    }}
                    style={{
                      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.3)' : 'rgba(241, 245, 249, 0.5)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        color: isDark ? '#94a3b8' : '#334155',
                        fontWeight: 'bold',
                        fontSize: '18px',
                      }}
                    >
                      No unscheduled todos found
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: isDark ? '#64748b' : '#64748b',
                        marginTop: '12px',
                        fontSize: '15px',
                      }}
                    >
                      Add a todo to get started
                    </Typography>
                  </Box>
                ) : (
                  todos.map((todo, index) => {
                    const styles = getTodoStyles({ isSmallText, matches, todo, isDark });
                    let checkedStyle = { textDecoration: 'none' };
                    if (todo.completed) checkedStyle.textDecoration = 'line-through';

                    return (
                      <Draggable key={`todo-${todo.id}`} draggableId={`todo-${todo.id}`} index={index}>
                        {(provided: any, snapshot: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              marginBottom: '8px',
                            }}
                          >
                            <Card
                              className="todo-card"
                              variant="outlined"
                              style={{
                                ...styles.card,
                                userSelect: 'none',
                                borderRadius: '10px',
                                boxShadow: snapshot.isDragging
                                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                                  : isDark
                                  ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)'
                                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                                border: todo.completed
                                  ? '1px solid rgba(99, 102, 241, 0.6)'
                                  : todo.starred
                                  ? '1px solid rgba(245, 158, 11, 0.6)'
                                  : isDark
                                  ? index % 2 === 0
                                    ? '1px solid rgba(99, 102, 241, 0.4)'
                                    : '1px solid rgba(79, 70, 229, 0.4)'
                                  : index % 2 === 0
                                  ? '1px solid rgba(99, 102, 241, 0.3)'
                                  : '1px solid rgba(79, 70, 229, 0.25)',
                                backgroundColor: isDark
                                  ? todo.starred
                                    ? 'rgba(79, 70, 229, 0.15)'
                                    : todo.completed
                                    ? 'rgba(99, 102, 241, 0.15)'
                                    : index % 2 === 0
                                    ? 'rgba(30, 41, 59, 0.9)'
                                    : 'rgba(51, 65, 85, 0.9)'
                                  : todo.starred
                                  ? 'rgba(238, 242, 255, 1)'
                                  : todo.completed
                                  ? 'rgba(238, 242, 255, 0.8)'
                                  : index % 2 === 0
                                  ? 'rgba(255, 255, 255, 1)'
                                  : 'rgba(241, 245, 249, 1)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: snapshot.isDragging ? 0.9 : 1,
                                margin: '4px 0',
                              }}
                            >
                              <CardContent style={{ padding: '16px' }}>
                                <Typography
                                  variant="h5"
                                  style={{
                                    ...checkedStyle,
                                    margin: 0,
                                    color: isDark
                                      ? todo.completed
                                        ? 'rgba(148, 163, 184, 0.8)'
                                        : todo.starred
                                        ? '#c7d2fe'
                                        : '#e2e8f0'
                                      : todo.completed
                                      ? '#64748b'
                                      : todo.starred
                                      ? '#4f46e5'
                                      : '#334155',
                                    fontWeight: todo.starred ? 600 : 400,
                                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                                  }}
                                  className="todo-text"
                                >
                                  <Grid container alignItems="center" justifyContent="flex-start" spacing={2}>
                                    <Grid item>
                                      <Checkbox
                                        checked={todo.completed}
                                        color="primary"
                                        style={{
                                          ...styles.checkbox,
                                          marginRight: 5,
                                          color: todo.starred
                                            ? isDark
                                              ? '#818cf8'
                                              : '#6366f1'
                                            : todo.completed
                                            ? '#10b981'
                                            : isDark
                                            ? '#60a5fa'
                                            : '#3b82f6',
                                          transition: 'all 0.2s ease-in-out',
                                        }}
                                        onClick={() => markComplete(todo.id)}
                                        centerRipple={false}
                                      />
                                    </Grid>
                                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                      <div
                                        style={{
                                          ...styles.todoId,
                                          color: isDark
                                            ? todo.starred
                                              ? '#a5b4fc'
                                              : '#94a3b8'
                                            : todo.starred
                                            ? '#4f46e5'
                                            : '#64748b',
                                          fontWeight: 600,
                                        }}
                                      >
                                        {todo.id}:
                                      </div>
                                    </Grid>
                                    <Grid item style={{ flex: 2, minWidth: 0, display: 'flex', alignItems: 'center' }}>
                                      <div
                                        style={{
                                          ...styles.text,
                                          transition: 'color 0.2s ease',
                                        }}
                                      >
                                        {todo.title}
                                      </div>
                                    </Grid>
                                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                      <ActionsMenu
                                        deleteTodo={(e) => deleteTodoEvent(e, todo.id)}
                                        setEditOpen={() => openEditDialog(todo.id)}
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

                            <DeleteConfirm
                              yes={() => handleDeleteConfirm(todo.id)}
                              open={!!deleteOpenMap[todo.id]}
                              close={() => closeDeleteDialog(todo.id)}
                            />
                            <EditConfirm
                              yes={(val: string, dueAt?: Date) => handleEditConfirm(todo.id, val, dueAt)}
                              open={!!editOpenMap[todo.id]}
                              close={() => closeEditDialog(todo.id)}
                              value={todo.title}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </StyledPaper>
  );
};
