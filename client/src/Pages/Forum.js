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
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChatIcon from '@mui/icons-material/Chat';
import CreateIcon from '@mui/icons-material/Create';
import { Fab } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CreateForum from '../Components/CreateForum';
import Content from '../Dashboard/Content';
import { getForums, getUsers } from '../Redux/apiCalls';

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
  icon: {
    pointerEvents: 'none'
  },
  links: {
    textDecoration: 'none',
    color: 'inherit'
  },
  cardContent: {
    '& pre': {
      backgroundColor: '#f5f5f5',
      padding: '10px',
      overflow: 'auto',
      fontSize: '14px'
    },
    '& blockquote': {
      borderLeft: '5px solid #ccc',
      paddingLeft: '10px',
      marginLeft: 0,
      fontStyle: 'italic'
    }
  }
}));

function AddForum() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        borderRadius: '50%',
        zIndex: 999
      }}
    >
      {/* You can customize the Fab component as needed */}
      <Fab color='primary' aria-label='create forum' onClick={handleClick}>
        <CreateIcon />
      </Fab>
      {open && <CreateForum />}
    </div>
  );
}

function ForumCard({ post }) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (event) => {
    const clickedElement = event.target;

    if (
      !clickedElement.closest('.no-navigation') &&
      clickedElement.tagName !== 'A'
    ) {
      // Navigate to the home page
      history.push(`/thread/${post._id}`);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }} elevation={3}>
      <CardActionArea onClick={handleClick} disableRipple>
        <CardHeader
          avatar={
            <Link
              to={`/userprofile/${post.creator?._id}`}
              className={classes.links}
            >
              <Avatar
                className='no-navigation'
                sx={{ bgcolor: red[500] }}
                aria-label='forum'
                src={post.creator?.photo}
              ></Avatar>
            </Link>
          }
          action={
            <IconButton aria-label='settings' className='no-navigation'>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {post.title}
            </Typography>
          }
          subheader={
            <div className='no-navigation'>
              <Link
                to={`/userprofile/${post.creator?._id}`}
                className={classes.links}
              >
                @{post.creator?.displayName || 'deletd_user'}
              </Link>
            </div>
          }
        />
        <CardContent>
          <Typography
            variant='body2'
            color='text.secondary'
            className={classes.cardContent}
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
        </CardContent>
        <CardActions disableSpacing>
          <div className={classes.icons}>
            <IconButton aria-label='upvotes' className={classes.icon}>
              <ArrowDropUpIcon />
            </IconButton>
            <Typography variant='body2' color='text.secondary'>
              {post.upVotes.length}
            </Typography>
            <IconButton aria-label='replies' className={classes.icon}>
              <ChatIcon />
            </IconButton>
            <Typography variant='body2' color='text.secondary'>
              {post.downvotes || 0}
            </Typography>
          </div>
          <div className='no-navigation'>
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.forums.isFetching);

  useEffect(() => {
    getForums(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const forums = useSelector((state) => state.forums.forums);

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

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
              {forums.map((post) => (
                <Grid item xs={12} key={post.id}>
                  <ForumCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Box pt={4}>
          {user && <AddForum />}
          <Copyright />
        </Box>
      </Content>
    </>
  );
}
