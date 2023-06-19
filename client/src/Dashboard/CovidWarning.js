import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  depositContext: {
    textAlign: "center",
  },
});

export default function CovidWarning() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>
        <Alert severity="info">COVID-19 Update - Services may be delayed</Alert>
      </Title>
      <Typography
        color="textSecondary"
        variant="h3"
        className={classes.depositContext}
      >
        78,304
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Points available
      </Typography>
      <Button size="small" color="primary">
        Redeem
      </Button>
    </React.Fragment>
  );
}
