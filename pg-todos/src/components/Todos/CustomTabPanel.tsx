import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  currentTab: number;
  selectedTab: number;
}

const StyledTabPanel = styled('div')(({ theme }) => ({
  padding: '16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  animation: 'fadeIn 0.5s ease-out forwards',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

export function CustomTabPanel(props: TabPanelProps) {
  const { children, currentTab, selectedTab, ...other } = props;

  return (
    <StyledTabPanel
      role="tabpanel"
      hidden={selectedTab !== currentTab}
      id={`tabpanel-${currentTab}`}
      aria-labelledby={`tab-${currentTab}`}
      {...other}
    >
      {selectedTab === currentTab && <ContentBox>{children}</ContentBox>}
    </StyledTabPanel>
  );
}
