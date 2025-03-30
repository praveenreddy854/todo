import React from 'react';
import { useContext, useState } from 'react';

// Third-party libraries
import { Route } from 'wouter';
import { Grid } from '@material-ui/core';
import { QueryClientProvider, QueryClient } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Local components
import PersistentDrawerLeft from './components/PersistentDrawerLeft';
import AddTodo from './components/Todos/AddTodo';
import Todos from './components/Todos/Todos';
import { Chat } from './components/Chat';
import About from './pages/About';
import Settings from './pages/Settings';

// Context
import { MainContext } from './context/MainContext';

function App() {
  const { addTodo } = useContext(MainContext)!;
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleCloseChatClick = () => {
    setIsChatOpen(false);
  };

  return (
    <div style={{ height: '100vh' }}>
      <PersistentDrawerLeft isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={new QueryClient()}>
          <Route path="/">
            <div style={{ marginTop: '64px' }}>
              {' '}
              {/* Add spacing for AppBar */}
              <Grid container>
                <Grid item xs={isChatOpen ? 8 : 12}>
                  <AddTodo addTodo={addTodo} />
                  <Todos />
                </Grid>
                {isChatOpen && (
                  <Grid item xs={4}>
                    <div
                      id="chat-container"
                      style={{
                        position: 'fixed',
                        top: '64px', // Position right below the AppBar
                        right: 0,
                        width: '350px',
                        height: 'calc(100vh - 64px)', // Adjust height to account for AppBar
                        transition: 'right 0.3s ease',
                        background: '#fff',
                        boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000, // Lower than AppBar's z-index
                        overflow: 'hidden',
                        borderLeft: '1px solid #e0e0e0',
                      }}
                    >
                      <Chat onClose={handleCloseChatClick} />
                    </div>
                  </Grid>
                )}
              </Grid>
            </div>
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </QueryClientProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
