import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/apiCalls';
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
    paddingTop: '40px'
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export function SignIn() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state.user);

  const handleClicked = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Check if email and password are not empty
    if (email.trim() === '' || password.trim() === '') {
      return;
    }

    try {
      await login(dispatch, { email, password });
      window.location.reload();
    } catch (error) {
      if (error.message === 'Invalid email or password') {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage('An error occurred during login');
      }
      dispatch(loginFailure());
      setOpenSnackbar(true);
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
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
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
                error={isFieldEmpty(email)}
                helperText={isFieldEmpty(email) && 'Email is required'}
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
                helperText={isFieldEmpty(password) && 'Password is required'}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={handleClicked}
                disabled={isFetching}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/register' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </Grid>
        </Grid>
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
            severity='error'
          >
            {errorMessage}
          </MuiAlert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}
