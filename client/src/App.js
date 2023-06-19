import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AppBarAndDrawer from './AppBarAndDrawer/AppBarAndDrawer';
import { Dashboard } from './Dashboard/Dashboard';
import { Home } from './Home/Home';
import { DataProvider } from './Providers/DataProvider';
import People from './ReduxTable/people';
import { SignIn } from './SignIn';
import Trips from './Trips/Trips';
import { useTheme } from './theme';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Components from './Components/Components';
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
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={currentTheme}>
          <Provider store={store}>
            <DataProvider>
              <Router>
                <div>
                  <AppBarAndDrawer
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                  />
                  {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                  <Switch>
                    <Route path='/login'>
                      <SignIn />
                    </Route>
                    <Route path='/profile'>
                      <Driver id={3} />
                    </Route>
                    <Route path='/dashboard'>
                      <Dashboard />
                    </Route>
                    <Route exact path='/people'>
                      <People />
                    </Route>
                    <Route path={`/people/:driverId`}>
                      <Driver />
                    </Route>
                    <Route path='/map'>
                      <Trips />
                    </Route>
                    <Route path='/components'>
                      <Components />
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
          </Provider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}
