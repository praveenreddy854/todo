import React from 'react';
import { useContext, useState } from 'react';
import { MainContext } from '../../context/MainContext';
import { Snackbar } from '@material-ui/core';
import { Tab, Tabs, Box } from '@mui/material';
import { Alert } from '@material-ui/lab';
import { UnscheduledTodos } from './UnscheduledTodos';
import ScheduledTodos from './ScheduledTodos';
import { CustomTabPanel } from './CustomTabPanel';
import { styled } from '@mui/material/styles';
import { CalendarMonth, FormatListBulleted } from '@mui/icons-material';

enum TabsEnum {
  SCHEDULED,
  UNSCHEDULED,
}

// Custom styled tabs
const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
    height: 3,
    borderRadius: '3px 3px 0 0',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  marginRight: '16px',
  color: 'rgba(0, 0, 0, 0.85)',
  '&.Mui-selected': {
    color: '#1890ff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '& .MuiTab-wrapper': {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  '& .MuiSvgIcon-root': {
    marginRight: '8px',
  },
}));

const TabContainer = styled(Box)(({ theme }) => ({
  padding: '16px 0',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  borderRadius: '8px',
  background: 'white',
  marginBottom: '16px',
}));

const Todos = () => {
  const { todos } = useContext(MainContext)!;
  const [deleteSnackOpen, setDeleteSnackOpen] = useState(false);
  const [editSnackOpen, setEditSnackOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(TabsEnum.SCHEDULED);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: TabsEnum) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <TabContainer>
        <StyledTabs value={selectedTab} onChange={handleTabChange} aria-label="todo tabs" variant="fullWidth" centered>
          <StyledTab value={TabsEnum.SCHEDULED} label="Scheduled" icon={<CalendarMonth />} iconPosition="start" />
          <StyledTab
            value={TabsEnum.UNSCHEDULED}
            label="Unscheduled"
            icon={<FormatListBulleted />}
            iconPosition="start"
          />
        </StyledTabs>
      </TabContainer>
      <CustomTabPanel selectedTab={selectedTab} currentTab={TabsEnum.SCHEDULED}>
        <ScheduledTodos
          todos={todos.filter((t) => !!t.dueAt)}
          onDelete={() => setDeleteSnackOpen(true)}
          onEdit={() => setEditSnackOpen(true)}
        />
      </CustomTabPanel>
      <CustomTabPanel selectedTab={selectedTab} currentTab={TabsEnum.UNSCHEDULED}>
        <UnscheduledTodos
          onDelete={() => setDeleteSnackOpen(true)}
          onEdit={() => setEditSnackOpen(true)}
          todos={todos.filter((t) => !t.dueAt)}
        />
      </CustomTabPanel>

      <Snackbar
        open={deleteSnackOpen}
        autoHideDuration={4000}
        onClose={() => setDeleteSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert elevation={6} variant="filled" onClose={() => setDeleteSnackOpen(false)} severity="success">
          Successfully deleted item!
        </Alert>
      </Snackbar>
      <Snackbar
        open={editSnackOpen}
        autoHideDuration={4000}
        onClose={() => setEditSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert elevation={6} variant="filled" onClose={() => setEditSnackOpen(false)} severity="success">
          Successfully edited item!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Todos;
