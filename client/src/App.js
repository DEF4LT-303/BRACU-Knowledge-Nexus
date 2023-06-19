import React from "react";
import AppBarAndDrawer from "./AppBarAndDrawer/AppBarAndDrawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SignIn } from "./SignIn";
import { Dashboard } from "./Dashboard/Dashboard";
import { Home } from "./Home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "./theme";
import { DataProvider } from "./Providers/DataProvider";
import People from "./ReduxTable/people";
import Trips from "./Trips/Trips";

import Driver from "./People/Driver";
import Components from "./Components/Components";
import Settings from "./Settings/Settings";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./ReduxTable/peopleSlice";
import { Provider } from "react-redux";

export default function App() {
  const store = configureStore({
    reducer: {
      people: peopleReducer,
    },
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
                    <Route path="/login">
                      <SignIn />
                    </Route>
                    <Route path="/profile">
                      <Driver id={1} />
                    </Route>
                    <Route path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route exact path="/people">
                      <People />
                    </Route>
                    <Route path={`/people/:driverId`}>
                      <Driver />
                    </Route>
                    <Route path="/map">
                      <Trips />
                    </Route>
                    <Route path="/components">
                      <Components />
                    </Route>
                    <Route path="/settings">
                      <Settings
                        currentTheme={currentTheme}
                        setCurrentTheme={setCurrentTheme}
                      />
                    </Route>
                    <Route path="/">
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
