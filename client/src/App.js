import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import AppBarAndDrawer from './AppBarAndDrawer/AppBarAndDrawer';
import { Dashboard } from './Pages/Dashboard';
import { Home } from './Pages/Home';
import { SignIn } from './Pages/SignIn';
import People from './ReduxTable/people';
import { useTheme } from './theme';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { configureStore } from '@reduxjs/toolkit';
import Components from './Components/Components';
import { Register } from './Pages/Register';
import Driver from './People/Driver';
import peopleReducer from './ReduxTable/peopleSlice';
import Settings from './Settings/Settings';

export default function App() {
  const store = configureStore({
    reducer: {
      people: peopleReducer
    }
  });
  const [currentTheme, setCurrentTheme] = useTheme();

  const user = true; // TODO: set user selector

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={currentTheme}>
          <Router>
            <div>
              <AppBarAndDrawer
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              />

              <Switch>
                <Route path='/login'>
                  <SignIn />
                </Route>
                <Route path='/register'>
                  <Register />
                </Route>
                <Route path='/profile'>
                  {!user ? <Redirect to='/login' /> : <Driver id={3} />}
                </Route>
                <Route path='/dashboard'>
                  <Dashboard />
                </Route>
                <Route exact path='/people'>
                  {!user ? <Redirect to='/login' /> : <People />}
                </Route>
                <Route path={`/people/:driverId`}>
                  <Driver />
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
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}
