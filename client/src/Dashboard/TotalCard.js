import React, { useContext } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { DataContext } from "../Providers/DataProvider";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import { currentDay } from "../Providers/DataProvider";
import { format } from "date-fns";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  balance: {
    display: "flex",
  },
  balanceItem: {
    marginRight: "40px",
  },
});

export default function Deposits() {
  const classes = useStyles();
  const { data } = useContext(DataContext);
  let despositsTotal = 0;
  let withdrawlsTotal = 0;
  const total = Object.values(data).reduce((total, { amount }) => {
    if (amount > 0) despositsTotal += amount;
    if (amount < 0) withdrawlsTotal += amount;
    return amount + total;
  }, 0);
  const { addRandomExpense } = useContext(DataContext);

  return (
    <React.Fragment>
      <div className={classes.toolbar}>
        <Title>Balance</Title>

        <Button
          edge="end"
          variant="outlined"
          color="primary"
          onClick={() => {
            addRandomExpense();
          }}
        >
          Add expense
        </Button>
      </div>
      <div className={classes.balance}>
        <div className={classes.balanceItem}>
          <Typography component="p" variant="h3">
            ${total.toLocaleString()}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            {format(currentDay.valueOf(), "MMMM do, y")}
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              View balance
            </Link>
          </div>
        </div>
        <div className={classes.balanceItem}>
          <Typography component="p" variant="h5">
            ${withdrawlsTotal.toLocaleString()}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Withdrawls
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              View balance
            </Link>
          </div>
        </div>
        <div className={classes.balanceItem}>
          <Typography component="p" variant="h5">
            ${despositsTotal.toLocaleString()}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Deposits
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              View balance
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
