import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ChevronRight from "@material-ui/icons/ChevronRight";
import BankIcon from "@material-ui/icons/AccountBalance";
import ContactSupport from "@material-ui/icons/ContactSupport";
import SpeedIcon from "@material-ui/icons/Speed";
import { blue, green, pink } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
  green: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: green[500],
  },
}));

export default function Tools() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Manage your account</Title>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.green}>
              <SpeedIcon />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <ChevronRight />
            </IconButton>
          }
          title="Credit Check"
          subheader="View your credit score and verify identity"
        />
      </CardActionArea>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.blue}>
              <BankIcon />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <ChevronRight />
            </IconButton>
          }
          title="Find your bank"
          subheader="Find nearby banks for your location"
        />
      </CardActionArea>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.pink}>
              <ContactSupport />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <ChevronRight />
            </IconButton>
          }
          title="Contact us"
          subheader="Have questions? Contact us here"
        />
      </CardActionArea>
    </React.Fragment>
  );
}
