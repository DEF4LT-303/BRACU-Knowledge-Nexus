import { CardActionArea } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Content from '../Dashboard/Content';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://react.school/'></Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  forumCard: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  postContent: {
    flexGrow: 1
  },
  truncate: {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 'auto'
  },
  favIcon: {
    marginLeft: 'auto'
  },
  links: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

const forumPosts = [
  {
    id: 1,
    title: 'Introduction to React Hooks',
    description:
      'React Hooks provide a simpler and more intuitive way to manage state in React applications. By introducing the useState and useEffect hooks, developers can easily handle stateful logic without relying on class components. useState allows for the creation of state variables within functional components, while useEffect enables the execution of side effects based on component lifecycle events. With Hooks, developers can streamline their code, improve reusability, and enhance the readability of their applications. By embracing Hooks, developers can easily grasp the fundamentals of state management in React and leverage its benefits to build more efficient and maintainable applications.',
    author: 'John Doe',
    avatar: '/avatars/avatar1.jpg',
    favorites: 10,
    upvotes: 25,
    downvotes: 5
  },
  {
    id: 2,
    title: 'Getting Started with Node.js',
    description:
      'Explore the fundamentals of Node.js and build your first server-side applications using JavaScript.',
    author: 'Jane Smith',
    avatar: '/avatars/avatar2.jpg',
    favorites: 15,
    upvotes: 20,
    downvotes: 3
  },
  {
    id: 3,
    title: 'Mastering CSS Flexbox',
    description:
      'Dive deep into CSS Flexbox and learn how to create flexible and responsive layouts for your web projects.',
    author: 'Mike Johnson',
    avatar: '/avatars/avatar3.jpg',
    favorites: 5,
    upvotes: 18,
    downvotes: 7
  }
];

function ForumCard({ post }) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (event) => {
    // Check if the card area itself is clicked
    if (!event.target.closest('.no-navigation')) {
      // Navigate to the home page
      history.push('/');
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick} disableRipple>
        <CardHeader
          avatar={
            <Link to={`/profile`} className={classes.links}>
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                R
              </Avatar>
            </Link>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={
            <Link to={`/profile`} className={classes.links}>
              {post.author}
            </Link>
          }
          className='no-navigation'
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className='no-navigation'>
          <div className={classes.icons}>
            <IconButton aria-label='upvote'>
              <ThumbUpIcon />
            </IconButton>
            <Typography variant='body2' color='text.secondary'>
              {post.upvotes}
            </Typography>
            <IconButton aria-label='downvote'>
              <ThumbDownIcon />
            </IconButton>
            <Typography variant='body2' color='text.secondary'>
              {post.downvotes}
            </Typography>
          </div>
          <div className={classes.favIcon}>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
          </div>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export function Forum() {
  const classes = useStyles();

  return (
    <>
      <Content>
        <Typography variant='h4' gutterBottom align='center'>
          <Box fontWeight='fontWeightBold' letterSpacing={2}>
            Forum
          </Box>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {forumPosts.map((post) => (
                <Grid item xs={12} key={post.id}>
                  <ForumCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Content>
    </>
  );
}
