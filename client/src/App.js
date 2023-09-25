import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import AppBarAndDrawer from './AppBarAndDrawer/AppBarAndDrawer';
import { Forum } from './Pages/Forum';
import { Home } from './Pages/Home';
import { SignIn } from './Pages/SignIn';
import People from './Pages/people';

import DateFnsUtils from '@date-io/date-fns';
import { blue } from '@material-ui/core/colors';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Components from './Components/Components';
import FeedbackPage from './Components/Feedback';
import { Feedback } from './Pages/Feedbacks';
import Profile from './Pages/Profile';
import { Register } from './Pages/Register';
import Settings from './Pages/Settings';
import { Thread } from './Pages/Thread';
import UserProfile from './Pages/UserProfile';
import { DataProvider } from './Providers/DataProvider';

export default function App() {
  // const [currentTheme, setCurrentTheme] = useTheme();
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#54c0e6' : blue[500]
      },
      secondary: {
        main: darkMode ? '#434343' : '#f0f0f0'
      },
      fontColor: {
        main: darkMode ? '#dedede' : '#3c3c3c'
      },
      background: {
        default: darkMode ? '#121212' : '#f7f7f7',
        paper: darkMode ? '#1c1c1c' : '#fff'
      },
      dialog: {
        main: darkMode ? '#1c1c1c' : '#fff'
      }
    }
  });

  const user = useSelector((state) => state.user.currentUser);

  const admin = user?.role === 'admin';

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <DataProvider>
            <Router>
              <div>
                <AppBarAndDrawer
                  check={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />

                <Switch>
                  <Route path='/login'>
                    {!user ? <SignIn /> : <Redirect to='/' />}
                  </Route>
                  <Route path='/register'>
                    {!user ? <Register /> : <Redirect to='/' />}
                  </Route>
                  <Route path='/profile'>
                    {!user ? <Redirect to='/login' /> : <Profile />}
                  </Route>
                  <Route path='/userprofile'>
                    <UserProfile />
                  </Route>
                  <Route path='/forum'>
                    <Forum />
                  </Route>
                  <Route path='/thread'>
                    <Thread />
                  </Route>
                  <Route path='/people'>
                    {user && admin ? <People /> : <Redirect to='/' />}
                  </Route>
                  <Route path={`/people/:ProfileId`}>
                    <Profile />
                  </Route>
                  <Route path='/components'>
                    {!user ? <Redirect to='/login' /> : <Components />}
                  </Route>
                  <Route path='/feedbacks'>
                    {!user && admin ? <Redirect to='/login' /> : <Feedback />}
                  </Route>
                  <Route path='/settings'>
                    <Settings
                    // currentTheme={currentTheme}
                    // setCurrentTheme={setCurrentTheme}
                    />
                  </Route>
                  <Route path='/feedback'>
                    {!user ? (
                      <Redirect to='/login' />
                    ) : (
                      <FeedbackPage userEmail={user?.email} />
                    )}
                  </Route>
                  <Route path='/'>
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Router>
          </DataProvider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}
