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
  Box,
  Chip,
  Divider,
  Grid,
  Button,
  Tooltip,
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
import { styled } from '@mui/material/styles';
import {
  Event,
  AccessTime,
  CalendarToday,
  Update,
  Star,
  StarBorder,
  CheckCircle,
  RadioButtonUnchecked,
  Info,
  Timeline,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

interface ScheduledTodoProps {
  todos: TodoType[];
  onDelete: () => void;
  onEdit: () => void;
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
  marginBottom: '24px',
  border: '1px solid rgba(0, 0, 0, 0.04)',
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  borderCollapse: 'separate',
  borderSpacing: '0 12px',
  '& .MuiTableCell-root': {
    borderBottom: 'none',
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableRow-root': {
    backgroundColor: '#f8fafc',
  },
  '& .MuiTableCell-root': {
    fontWeight: '600',
    color: '#475569',
    fontSize: '14px',
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '16px',
    borderBottom: '2px solid #e2e8f0',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '16px',
  fontSize: '15px',
  color: '#334155',
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
}));

const StyledTableRowMain = styled(TableRow)(({ theme }) => ({
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: 'rgba(66, 153, 225, 0.15)',
    transform: 'scale(1.15)',
  },
}));

const ExpandCollapseButton = styled(StyledIconButton)(({ theme }) => ({
  backgroundColor: 'rgba(66, 153, 225, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(66, 153, 225, 0.25)',
    transform: 'scale(1.15)',
  },
}));

const HeaderExpandCollapseButton = styled(ExpandCollapseButton)(({ theme }) => ({
  backgroundColor: 'rgba(66, 153, 225, 0.15)',
  padding: '4px',
  '&:hover': {
    backgroundColor: 'rgba(66, 153, 225, 0.3)',
    transform: 'scale(1.15)',
  },
}));

const StyledDateCell = styled(TableCell)(({ theme }) => ({
  padding: '16px',
  fontSize: '15px',
  color: '#334155',
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  display: 'flex',
  alignItems: 'center',
  '& .date-icon': {
    marginRight: '10px',
    fontSize: '18px',
    color: '#4299e1',
    filter: 'drop-shadow(0 2px 2px rgba(66, 153, 225, 0.2))',
  },
  '& .date-text': {
    display: 'flex',
    flexDirection: 'column',
  },
  '& .date-day': {
    fontWeight: 'bold',
    fontSize: '15px',
  },
  '& .date-time': {
    fontSize: '13px',
    color: '#718096',
    marginTop: '2px',
  },
}));

const DetailCard = styled(Box)(({ theme }) => ({
  padding: '28px',
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
  marginBottom: '16px',
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
  },
}));

const DetailSection = styled(Box)(({ theme }) => ({
  marginBottom: '20px',
}));

const DetailHeader = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: '18px',
    marginRight: '8px',
    color: '#4299e1',
    filter: 'drop-shadow(0 2px 2px rgba(66, 153, 225, 0.2))',
  },
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#334155',
  lineHeight: '1.5',
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
  borderRadius: '20px',
  padding: '0 6px',
  height: '28px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
  '& .MuiChip-label': {
    padding: '0 12px',
  },
  '& .MuiChip-icon': {
    marginLeft: '6px',
  },
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export default function ScheduledTodos(props: ScheduledTodoProps) {
  const { todos: rows, onDelete, onEdit } = props;
  const { isDark } = useContext(ThemeContext)!;
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [allExpanded, setAllExpanded] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: 'id' | 'title' | 'dueAt' | null;
    direction: 'ascending' | 'descending';
  }>({ key: 'dueAt', direction: 'ascending' });

  // Function to toggle expand/collapse all rows
  const toggleExpandAll = () => {
    if (allExpanded) {
      // Collapse all
      setExpandedRows({});
      setAllExpanded(false);
    } else {
      // Expand all
      const expanded: Record<string, boolean> = {};
      rows.forEach((row) => {
        expanded[row.id] = true;
      });
      setExpandedRows(expanded);
      setAllExpanded(true);
    }
  };

  // Function to handle sorting
  const requestSort = (key: 'id' | 'title' | 'dueAt') => {
    let direction: 'ascending' | 'descending' = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  // Function to get sorted items
  const getSortedItems = (items: TodoType[]) => {
    if (!sortConfig.key) return items;

    return [...items].sort((a, b) => {
      if (sortConfig.key === 'id') {
        return sortConfig.direction === 'ascending' ? a.id - b.id : b.id - a.id;
      }

      if (sortConfig.key === 'title') {
        return sortConfig.direction === 'ascending' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      }

      if (sortConfig.key === 'dueAt') {
        if (!a.dueAt) return 1;
        if (!b.dueAt) return -1;

        const dateA = new Date(a.dueAt).getTime();
        const dateB = new Date(b.dueAt).getTime();

        return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });
  };

  // Get the sorted rows
  const sortedRows = getSortedItems(rows);

  // Function to get sort direction indicator
  const getSortDirectionIcon = (key: 'id' | 'title' | 'dueAt') => {
    if (sortConfig.key !== key) return null;

    return sortConfig.direction === 'ascending' ? (
      <ArrowUpward style={{ fontSize: 16, marginLeft: 4 }} />
    ) : (
      <ArrowDownward style={{ fontSize: 16, marginLeft: 4 }} />
    );
  };

  return (
    <Paper
      style={{
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        marginBottom: '24px',
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.04)',
      }}
    >
      <StyledTable aria-label="collapsible table">
        <StyledTableHead>
          <TableRow>
            <StyledTableCell width="5%">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Tooltip title={allExpanded ? 'Collapse All Rows' : 'Expand All Rows'}>
                  <HeaderExpandCollapseButton
                    aria-label="toggle expand/collapse all rows"
                    size="small"
                    onClick={toggleExpandAll}
                    style={{ color: '#4299e1' }}
                  >
                    {allExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </HeaderExpandCollapseButton>
                </Tooltip>
              </Box>
            </StyledTableCell>
            <StyledTableCell width="10%" onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>
              <Box display="flex" alignItems="center">
                ID {getSortDirectionIcon('id')}
              </Box>
            </StyledTableCell>
            <StyledTableCell width="45%" onClick={() => requestSort('title')} style={{ cursor: 'pointer' }}>
              <Box display="flex" alignItems="center">
                Title {getSortDirectionIcon('title')}
              </Box>
            </StyledTableCell>
            <StyledTableCell width="30%" onClick={() => requestSort('dueAt')} style={{ cursor: 'pointer' }}>
              <Box display="flex" alignItems="center">
                <Event style={{ marginRight: '8px', fontSize: '18px', color: '#4299e1' }} />
                Due Date {getSortDirectionIcon('dueAt')}
              </Box>
            </StyledTableCell>
            <StyledTableCell width="10%" />
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {sortedRows && sortedRows.length === 0 ? (
            <EmptyRows />
          ) : (
            sortedRows.map((row, index) => {
              return (
                <Row
                  row={row}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  key={`scheduled-todo-${row.id}`}
                  isExpanded={!!expandedRows[row.id]}
                  setExpanded={(isExpanded) => {
                    setExpandedRows((prev) => ({
                      ...prev,
                      [row.id]: isExpanded,
                    }));
                  }}
                  index={index}
                />
              );
            })
          )}
        </TableBody>
      </StyledTable>
    </Paper>
  );
}

function Row(props: {
  row: TodoType;
  onDelete: () => void;
  onEdit: () => void;
  isExpanded: boolean;
  setExpanded: (isExpanded: boolean) => void;
  index: number;
}) {
  const { row, onDelete, onEdit, isExpanded, setExpanded, index } = props;

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

  // Format date for better display
  const dueDate = new Date(row.dueAt!);
  const formattedDate = dueDate.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = dueDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Calculate time remaining
  const now = new Date();
  const timeRemaining = dueDate.getTime() - now.getTime();
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Format created and modified dates
  const createdDate = new Date(row.createdAt);
  const modifiedDate = new Date(row.modifiedAt);

  const formattedCreatedDate = createdDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedModifiedDate = modifiedDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedCreatedTime = createdDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedModifiedTime = modifiedDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Get status color
  const getStatusColor = () => {
    if (row.completed) return '#10b981'; // green
    if (timeRemaining < 0) return '#ef4444'; // red - overdue
    if (timeRemaining < 24 * 60 * 60 * 1000) return '#f59e0b'; // amber - due soon (less than 24 hours)
    return '#3b82f6'; // blue - upcoming
  };

  // Get status text
  const getStatusText = () => {
    if (row.completed) return 'Completed';
    if (timeRemaining < 0) return 'Overdue';
    if (timeRemaining < 24 * 60 * 60 * 1000) return 'Due Soon';
    return 'Upcoming';
  };

  return (
    <React.Fragment>
      <StyledTableRowMain
        key="scheduled-todo-overview"
        style={{
          background: row.completed
            ? styles.card.background
            : row.starred
            ? styles.card.background
            : index % 2 === 0
            ? isDark
              ? 'rgba(30, 41, 59, 0.95)'
              : 'rgba(255, 255, 255, 1)'
            : isDark
            ? 'rgba(40, 55, 75, 0.95)'
            : 'rgba(248, 250, 252, 1)',
          boxShadow: styles.card.boxShadow,
          borderRadius: '12px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: row.completed
            ? '1px solid rgba(16, 185, 129, 0.2)'
            : row.starred
            ? '1px solid rgba(234, 179, 8, 0.2)'
            : '1px solid rgba(0, 0, 0, 0.04)',
        }}
        hover
      >
        <StyledTableCell>
          <StyledIconButton
            aria-label="expand row"
            size="small"
            onClick={() => setExpanded(!isExpanded)}
            style={{
              color: row.starred ? styles.checkbox.color : '#4299e1',
              backgroundColor: row.starred ? 'rgba(234, 179, 8, 0.1)' : 'rgba(66, 153, 225, 0.1)',
            }}
          >
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </StyledIconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" style={{ ...styles.todoId, color: '#334155', fontWeight: 600 }}>
          {row.id}
        </StyledTableCell>
        <StyledTableCell
          component="th"
          scope="row"
          style={{
            ...styles.text,
            ...checkedStyle,
            color: row.completed ? '#718096' : row.starred ? styles.text.color : '#334155',
            fontWeight: row.starred ? 600 : 400,
            transition: 'color 0.2s ease',
          }}
        >
          {row.title}
        </StyledTableCell>
        <StyledDateCell scope="row">
          <AccessTime className="date-icon" />
          <div className="date-text">
            <span className="date-day">{formattedDate}</span>
            <span className="date-time">{formattedTime}</span>
          </div>
        </StyledDateCell>
        <StyledTableCell>
          <ActionsMenu
            deleteTodo={(e) => deleteTodoEvent(e)}
            setEditOpen={setEditOpen}
            todo={row}
            markStar={markStar}
            hideTodo={hideTodo}
            markComplete={markComplete}
          />
        </StyledTableCell>
      </StyledTableRowMain>
      <TableRow
        style={{
          border: 'none',
          background: row.starred
            ? 'rgba(76, 99, 182, 0.05)'
            : index % 2 === 0
            ? isDark
              ? 'rgba(20, 30, 45, 0.8)'
              : 'rgba(248, 250, 252, 0.8)'
            : isDark
            ? 'rgba(30, 41, 59, 0.8)'
            : 'rgba(241, 245, 249, 0.8)',
          borderRadius: '0 0 12px 12px',
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        }}
        key="scheduled-todo-more"
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 'none' }} colSpan={6}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ padding: '24px', borderRadius: '12px' }}>
              <Typography
                variant="h6"
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  marginBottom: '16px',
                  color: row.starred ? styles.text.color : '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                <Info style={{ marginRight: '8px', color: '#3b82f6' }} />
                Task Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <DetailCard>
                    <DetailSection>
                      <DetailHeader>
                        <Info />
                        Status
                      </DetailHeader>
                      <Box display="flex" alignItems="center" mt={1}>
                        <StatusChip
                          label={getStatusText()}
                          style={{
                            backgroundColor: getStatusColor(),
                            color: 'white',
                            transition: 'all 0.2s ease',
                            transform: 'scale(1)',
                          }}
                          icon={row.completed ? <CheckCircle style={{ color: 'white' }} /> : undefined}
                        />

                        {row.starred && (
                          <StatusChip
                            label="Starred"
                            style={{
                              backgroundColor: '#eab308',
                              color: 'white',
                              marginLeft: '8px',
                              transition: 'all 0.2s ease',
                            }}
                            icon={<Star style={{ color: 'white' }} />}
                          />
                        )}
                      </Box>
                    </DetailSection>

                    <Divider style={{ margin: '16px 0' }} />

                    <DetailSection>
                      <DetailHeader>
                        <Timeline />
                        Time Remaining
                      </DetailHeader>
                      <DetailValue>
                        {row.completed ? (
                          'Task completed'
                        ) : timeRemaining < 0 ? (
                          <span style={{ color: '#ef4444', fontWeight: 'bold' }}>
                            Overdue by {Math.abs(daysRemaining)} days and {Math.abs(hoursRemaining)} hours
                          </span>
                        ) : (
                          <span>
                            {daysRemaining} days and {hoursRemaining} hours remaining
                          </span>
                        )}
                      </DetailValue>
                    </DetailSection>
                  </DetailCard>
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailCard>
                    <DetailSection>
                      <DetailHeader>
                        <CalendarToday />
                        Created
                      </DetailHeader>
                      <DetailValue>
                        {formattedCreatedDate} at {formattedCreatedTime}
                      </DetailValue>
                      <Typography variant="body2" style={{ color: '#64748b', marginTop: '4px' }}>
                        {getRelativeTimeString(createdDate)}
                      </Typography>
                    </DetailSection>

                    <Divider style={{ margin: '16px 0' }} />

                    <DetailSection>
                      <DetailHeader>
                        <Update />
                        Last Modified
                      </DetailHeader>
                      <DetailValue>
                        {formattedModifiedDate} at {formattedModifiedTime}
                      </DetailValue>
                      <Typography variant="body2" style={{ color: '#64748b', marginTop: '4px' }}>
                        {getRelativeTimeString(modifiedDate)}
                      </Typography>
                    </DetailSection>
                  </DetailCard>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => setEditOpen(true)}
                      style={{
                        marginRight: '8px',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '6px 16px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Edit Task
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => setDeleteOpen(true)}
                      style={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '6px 16px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Delete Task
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
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
      <TableCell colSpan={5} align="center">
        <Box
          sx={{
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          }}
        >
          <Event style={{ fontSize: 64, color: '#a0aec0', marginBottom: '20px', opacity: 0.7 }} />
          <Typography variant="h6" style={{ color: '#4a5568', fontWeight: 'bold', fontSize: '18px' }}>
            No scheduled todos found
          </Typography>
          <Typography variant="body2" style={{ color: '#718096', marginTop: '12px', fontSize: '15px' }}>
            Add a todo with a due date to see it here
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}
