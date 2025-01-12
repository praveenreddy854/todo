import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  currentTab: number;
  selectedTab: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, currentTab, selectedTab, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== currentTab}
      id={`simple-tabpanel-${currentTab}`}
      aria-labelledby={`simple-tab-${currentTab}`}
      {...other}
    >
      {selectedTab === currentTab && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
