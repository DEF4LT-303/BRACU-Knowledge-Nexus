import React from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Chart from "./Chart";
import TotalCard from "./TotalCard";
import ExpensesTable from "./ExpensesTable";
import { drawerWidth } from "../AppBarAndDrawer/AppBarAndDrawer";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Content from "./Content";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CovidWarning from "./CovidWarning";
import Tools from "./Tools";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://react.school/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appToolbar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 300,
  },
  balanceCard: {
    height: 200,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        color="secondary"
        position="static"
        className={classes.appToolbar}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Accounts" />
          <Tab label="Portfolio" />
          <Tab label="Pay & Transfer" />
        </Tabs>
      </AppBar>
    </div>
  );
}

export function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const balancePaper = clsx(classes.paper, classes.balanceCard);
  return (
    <>
      <SimpleTabs />
      <Content>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} lg={8}>
            <Paper className={balancePaper}>
              <TotalCard />
            </Paper>
          </Grid>
          {/* Recent TotalCard */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper className={balancePaper}>
              <CovidWarning />
            </Paper>
          </Grid>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={8}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Paper className={fixedHeightPaper}>
              <Tools />
            </Paper>
          </Grid>
          {/* ExpensesTable */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ExpensesTable />
            </Paper>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Content>
    </>
  );
}
