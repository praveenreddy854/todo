import React from 'react';
import { useContext, useState } from 'react';
import { MainContext } from '../../context/MainContext';
import { Snackbar } from '@material-ui/core';
import { Tab, Tabs, Box } from '@mui/material';
import { Alert } from '@material-ui/lab';
import { UnscheduledTodos } from './UnscheduledTodos';
import ScheduledTodos from './ScheduledTodos';
import { CustomTabPanel } from './CustomTabPanel';

enum TabsEnum {
  SCHEDULED,
  UNSCHEDULED,
}
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
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab value={TabsEnum.SCHEDULED} label="Scheduled" />
          <Tab value={TabsEnum.UNSCHEDULED} label="Unscheduled" />
        </Tabs>
      </Box>
      <CustomTabPanel selectedTab={selectedTab} currentTab={TabsEnum.SCHEDULED}>
        <ScheduledTodos
          todos={todos.filter((t) => !!t.dueAt)}
          onDelete={() => setDeleteSnackOpen(true)}
          onEdit={() => setEditSnackOpen(true)}
        />
      </CustomTabPanel>
      <CustomTabPanel selectedTab={selectedTab} currentTab={TabsEnum.UNSCHEDULED}>
        <UnscheduledTodos
          onDelete={setDeleteSnackOpen}
          onEdit={setEditSnackOpen}
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
