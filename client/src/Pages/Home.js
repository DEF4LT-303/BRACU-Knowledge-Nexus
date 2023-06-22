import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://react.school'>
        React School
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
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
  }
}));

const cards = [
  {
    name: 'Login',
    description: 'Log in or register users for your app.',
    img: 'Login.PNG',
    path: 'login'
  },
  {
    name: 'Profile',
    description: "A profile dashboard page for viewing a user's data",
    img: 'Profile.PNG',
    path: 'profile'
  },
  {
    name: 'Dashboard',
    description:
      'A detailed analysis of business revenue with actions and integrated expense adding.',
    img: 'Dashboard.PNG',
    path: 'dashboard'
  },
  {
    name: 'Redux Table',
    description:
      'A functioning CRUD table to add, delete and edit multiple users.',
    img: 'Crud.PNG',
    path: 'people'
  },
  {
    name: 'Components',
    description: 'View all components built for this theme.',
    img: 'components.PNG',
    path: 'components'
  }
];

export function Home() {
  const classes = useStyles();

  const user = false; // TODO: set user selector

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              BRACU Discussion Forum
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='textSecondary'
              paragraph
            >
              A place for sharing thoughts and meaningful discussions.
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
        </div>
        <Container className={classes.cardGrid} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`img/${card.img}`}
                    title='Image title'
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {card.name}
                    </Typography>
                    <Typography className={classes.description}>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      color='secondary'
                      variant='outlined'
                      component={RouterLink}
                      to={`/${card.path}`}
                      fullWidth
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant='h6' align='center' gutterBottom>
          Footer
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='textSecondary'
          component='p'
        >
          Footer Content
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
