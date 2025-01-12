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

  return (
    <div style={{ height: '100vh' }}>
      <PersistentDrawerLeft isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={new QueryClient()}>
          <Route path="/">
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
                      top: 0,
                      right: 0,
                      width: '400px',
                      height: '100vh',
                      transition: 'right 0.3s ease',
                      background: '#fff',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <Chat />
                  </div>
                </Grid>
              )}
            </Grid>
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
