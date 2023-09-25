import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { register } from '../Redux/apiCalls';
import { loginFailure } from '../Redux/userRedux';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(img/wallpaper2-min.PNG)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    paddingTop: '40px',
    backgroundAttachment: 'fixed'
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    color: '#54c0e6 !important'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export function CustomSnackbar({
  message,
  severity,
  openSnackbar,
  handleCloseSnackbar
}) {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <MuiAlert
        elevation={6}
        variant='filled'
        onClose={handleCloseSnackbar}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export function Register() {
  const classes = useStyles();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const { isFetching, error } = useSelector((state) => state.user);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Check if any field is empty
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format');
      setOpenSnackbar(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setOpenSnackbar(true);
      return;
    }

    try {
      await register(dispatch, { username, email, password });
      // dispatch(logout());
      setErrorMessage('Registration successful');
      setOpenSnackbar(true);
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    } catch (error) {
      if (error.message === 'Email already exists') {
        setErrorMessage('Email already exists');
      } else {
        setErrorMessage('An error occurred during registration');
      }
      setOpenSnackbar(true);
      dispatch(loginFailure());
    }
  };

  const isFieldEmpty = (value) => {
    return value.trim() === '' && submitted;
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Dispatch the loginFailure action when the page is refreshed
      dispatch(loginFailure());
    };

    // Add the event listener for beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch]);

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid container justifyContent='center' className={classes.image}>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          direction='row'
          elevation={6}
          square
        >
          <Grid className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Register
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='Username'
                label='Username'
                name='Username'
                autoComplete='Username'
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                error={isFieldEmpty(username)}
                helperText={isFieldEmpty(username) ? 'Required' : ''}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={isFieldEmpty(email)}
                helperText={isFieldEmpty(email) ? 'Required' : ''}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
                error={isFieldEmpty(password)}
                helperText={isFieldEmpty(password) ? 'Required' : ''}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                autoComplete='new-password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={password !== confirmPassword}
                helperText={
                  password !== confirmPassword ? 'Passwords do not match' : ''
                }
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={handleRegister}
                disabled={isFetching}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link href='/login' variant='body2'>
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </Grid>
        </Grid>
        <CustomSnackbar
          message={errorMessage || 'Registration successful'}
          severity={error ? 'error' : 'success'}
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
        />
      </Grid>
    </Grid>
  );
}
