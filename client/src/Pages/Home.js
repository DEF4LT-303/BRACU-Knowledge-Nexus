import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Link as RouterLink } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Footer from '../Components/Footer';
import Content from '../Dashboard/Content';
import { getForums, getUsers } from '../Redux/apiCalls';

const useStyles = makeStyles((theme) => ({
  logo: {
    width: '100%',
    maxWidth: '500px',
    height: '50vh'
  },
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    // height: '300px'
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  description: {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2 /* Maximum number of lines to show */,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '50px',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  imgContainer: {
    height: '500px',
    width: '80%',
    position: 'relative',
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      height: '400px',
      width: '200px'
    }
  },
  image: {
    objectFit: 'contain',
    height: '100%',
    width: '100%'
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left'
    }
  },
  gap: {
    marginTop: '100px'
  },
  font: {
    fontSize: '14px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '16px'
    }
  }
}));

export function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    getForums(dispatch);
    getUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <main>
        <Content>
          <Container maxWidth='sm'>
            <footer className={classes.imgWrapper}>
              <img src='img/default.png' alt='Logo' className={classes.logo} />
            </footer>
          </Container>
        </Content>
        <div className={classes.heroContent}>
          <Content>
            <Container maxWidth='sm'>
              <Typography
                component='h1'
                variant='h2'
                align='center'
                color='textPrimary'
                gutterBottom
              >
                BRACU Knowledge Nexus
              </Typography>
            </Container>
            <Container maxWidth='lg'>
              <Typography
                variant='h5'
                align='center'
                color='textSecondary'
                paragraph
              >
                <Typewriter
                  options={{
                    strings: [
                      'Welcome to BRACU Knowledge Nexus!',
                      'A place for sharing thoughts and meaningful discussions.',
                      'Explore and expand your knowledge.'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    pauseFor: 3000
                  }}
                />
              </Typography>

              <div className={classes.heroButtons}>
                <Grid container spacing={2} justifyContent='center'>
                  <Grid item>
                    {!user && (
                      <Button
                        component={RouterLink}
                        to={'/login'}
                        variant='contained'
                        color='primary'
                      >
                        Sign In
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Content>
        </div>
        <Content>
          <Fade left>
            <div className={classes.container}>
              <div className={classes.imgContainer}>
                <img
                  className={classes.image}
                  src='img/Nexus.png'
                  alt='Nexus'
                />
              </div>
              <div className={classes.textContainer}>
                <Typography variant='h4'>
                  What is BRACU Knowledge Nexus?
                </Typography>
                <Typography variant='body1' className={classes.font}>
                  BRACU Knowledge Nexus is a platform for sharing knowledge and
                  meaningful discussions. It is a place where you can share your
                  thoughts and ideas with others. Ask questions and get answers
                  from others. Find people with similar interests. Connect with
                  the HUB.
                </Typography>
              </div>
            </div>
          </Fade>

          <Fade right>
            {!isMobile ? (
              <div className={`${classes.container} ${classes.gap}`}>
                <div className={classes.textContainer}>
                  <Typography variant='h4'>Share or browse forums.</Typography>
                  <Typography variant='body1' className={classes.font}>
                    Browse through the forums and find the ones that interest
                    you. Or create your own forum and share your thoughts with
                    others like you.
                  </Typography>
                </div>
                <div className={classes.imgContainer}>
                  <img
                    className={classes.image}
                    src='img/Forum.png'
                    alt='Forum'
                  />
                </div>
              </div>
            ) : (
              <div className={`${classes.container} ${classes.gap}`}>
                <div className={classes.imgContainer}>
                  <img
                    className={classes.image}
                    src='img/Forum.png'
                    alt='Forum'
                  />
                </div>
                <div className={classes.textContainer}>
                  <Typography variant='h4'>Share or browse forums.</Typography>
                  <Typography variant='body1' className={classes.font}>
                    Browse through the forums and find the ones that interest
                    you. Or create your own forum and share your thoughts with
                    others like you.
                  </Typography>
                </div>
              </div>
            )}
          </Fade>

          <Fade left>
            <div className={`${classes.container} ${classes.gap}`}>
              <div className={classes.imgContainer}>
                <img
                  className={classes.image}
                  src='img/Profile.png'
                  alt='Profile'
                />
              </div>
              <div className={classes.textContainer}>
                <Typography variant='h4'>Customize your profile.</Typography>
                <Typography variant='body1' className={classes.font}>
                  Customize user profile and display your skills and
                  information. Build up reputation and get recongnized.
                </Typography>
              </div>
            </div>
          </Fade>
        </Content>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}
