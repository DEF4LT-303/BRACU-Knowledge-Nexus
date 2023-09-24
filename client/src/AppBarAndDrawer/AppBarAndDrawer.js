import { Switch } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Link as RouterLink, useLocation } from 'react-router-dom';
import { logout } from '../Redux/userRedux';

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  logo: {
    color: 'white',
    textDecoration: 'none'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: `#${theme.palette.primary[300]}`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  active: {
    backgroundColor: theme.palette.action.selected
  }
}));

function ResponsiveDrawer(props) {
  const { container, check, change } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { pathname } = useLocation();
  const isHome = false; // pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const hideAppBar = pathname === '/login' || pathname === '/register';

  const dispatch = useDispatch();

  // const user = null; // TODO: set user selector
  const user = useSelector((state) => state.user.currentUser);
  const admin = user?.role === 'admin';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    dispatch(logout());
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  /* Modifying the source code from the template example to use the react router pathname hook to set
  selected prop and to use the react router component prop */

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {/* <IconButton
        color='inherit'
        aria-label='open drawer'
        edge='end'
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton> */}
      <Divider />
      <List>
        {[
          { text: 'home', icon: 'home' },
          { text: 'forum', icon: 'forum' },
          ...(user
            ? [
                { text: 'profile', icon: 'person' },
                ...(user.role === 'admin'
                  ? [
                      { text: 'people', icon: 'people' },
                      { text: 'feedbacks', icon: 'feedbacks' }
                    ]
                  : [])
                // { text: 'components', icon: 'apps' }
              ]
            : []),
          { text: 'settings', icon: 'settings' },
          ...(user ? [] : [{ text: 'login', icon: 'lock' }])
        ].map(({ text, icon }, index) => (
          <ListItem
            component={RouterLink}
            selected={pathname === `/${text}`}
            to={`/${text}`}
            button
            key={text}
          >
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={text.toUpperCase()} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {user && (
        <List>
          <ListItem
            component={RouterLink}
            selected={pathname === `/login`}
            to={`/home`}
            button
            key={'login'}
            onClick={handleClick}
          >
            <ListItemIcon>
              <Icon>{'logout'}</Icon>
            </ListItemIcon>
            <ListItemText primary={'LOGOUT'} />
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {showAlert && (
        <Alert
          severity='success'
          style={{
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            zIndex: '9999'
          }}
        >
          You have been logged out successfully!
        </Alert>
      )}
      <div
        style={{
          height: '64px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: 'contrast(75%)',
          backgroundImage:
            'url(https://png.pngtree.com/background/20210709/original/pngtree-full-aesthetic-nebula-starry-sky-banner-background-picture-image_916071.jpg)',
          position: 'absolute',
          top: '0px',
          width: '100%',
          zIndex: -2
        }}
      />
      {!hideAppBar && (
        <AppBar position='sticky' className={isHome ? '' : classes.appBar}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              noWrap
              to={'/'}
              component={RouterLink}
              className={classes.logo}
            >
              BRACU Knowledge Nexus
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
            <Switch
              defaultChecked
              color='default'
              inputProps={{ 'aria-label': 'checkbox with default color' }}
              onChange={change}
              checked={check}
            />

            {/* <PalettePicker
              setCurrentTheme={setCurrentTheme}
              currentTheme={currentTheme}
            /> */}
            {/* {user && (
              <Badge badgeContent={4} color='primary'>
                <MailIcon />
              </Badge>
            )} */}
            {user && (
              <IconButton
                component={Link}
                to='/profile'
                color='inherit'
                aria-label='open drawer'
                edge='end'
              >
                <Avatar src={user.photo} />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      )}
      {isHome && !mobileOpen ? (
        <div />
      ) : (
        <nav aria-label='mailbox folders'>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation='css'>
            {!hideAppBar && (
              <Drawer
                container={container}
                variant='temporary'
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            )}
          </Hidden>
          <Hidden xsDown implementation='css'>
            {!hideAppBar && (
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant='permanent'
                open={mobileOpen}
              >
                {drawer}
              </Drawer>
            )}
          </Hidden>
        </nav>
      )}
    </div>
  );
}

export default ResponsiveDrawer;
