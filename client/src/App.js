import { ThemeProvider } from '@material-ui/core/styles';
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
import { useTheme } from './theme';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useSelector } from 'react-redux';
import Components from './Components/Components';
import Profile from './Pages/Profile';
import { Register } from './Pages/Register';
import Settings from './Pages/Settings';
import { DataProvider } from './Providers/DataProvider';

export default function App() {
  const [currentTheme, setCurrentTheme] = useTheme();

  // const user = true; // TODO: set user selector
  const user = useSelector((state) => state.user.currentUser);

  const admin = user?.role === 'admin';

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={currentTheme}>
          <DataProvider>
            <Router>
              <div>
                <AppBarAndDrawer
                  currentTheme={currentTheme}
                  setCurrentTheme={setCurrentTheme}
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
                  <Route path='/forum'>
                    <Forum />
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
                  <Route path='/settings'>
                    <Settings
                      currentTheme={currentTheme}
                      setCurrentTheme={setCurrentTheme}
                    />
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
