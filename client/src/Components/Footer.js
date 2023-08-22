// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import React from 'react';
import { Link } from 'react-router-dom';
import Content from '../Dashboard/Content';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  footerText: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2)
  },
  socialIcons: {
    // position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2)
  },
  socialIcon: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  lists: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  listHeader: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  },
  listItem: {
    marginBottom: theme.spacing(0.5)
  },
  bottom: {
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3)
  },
  Link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}));

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://knowledge-nexus-lime.vercel.app/'>
        Knowledge Nexus.
      </Link>{' '}
      All Rights Reserved. {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Content>
        <Typography variant='h6' align='center' gutterBottom>
          BRACU Knowledge Nexus
        </Typography>
        <Copyright />
        <div className={classes.bottom}>
          <div className={classes.socialIcons}>
            <Link
              href='https://github.com/def4lt-303'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.socialIcon}
            >
              <GitHubIcon />
            </Link>
            <Link
              href={`mailto:ryanrafi72@gmail.com`}
              target='_top'
              className={classes.socialIcon}
            >
              <MailIcon />
            </Link>
          </div>
          <div className={classes.lists}>
            <Typography variant='subtitle2' className={classes.listHeader}>
              Contact Us
            </Typography>
            <Link to={'/feedback'} className={classes.listItem}>
              Feedback
            </Link>
            <Link href='/' className={classes.listItem}>
              Support
            </Link>
          </div>
          <div className={classes.lists}>
            <Typography variant='subtitle2' className={classes.listHeader}>
              About Us
            </Typography>
            <Link href='/' className={classes.listItem}>
              Our Mission
            </Link>
            <Link href='/' className={classes.listItem}>
              Our Team
            </Link>
          </div>
        </div>
      </Content>
    </footer>
  );
}
