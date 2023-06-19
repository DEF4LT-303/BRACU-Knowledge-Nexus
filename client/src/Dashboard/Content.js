import React from "react";
import Container from "@material-ui/core/Container";
import { drawerWidth } from "../AppBarAndDrawer/AppBarAndDrawer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    position: "relative",
  },
}));

export default function Content({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
}
