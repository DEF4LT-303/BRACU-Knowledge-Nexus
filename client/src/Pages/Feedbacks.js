import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Content from '../Dashboard/Content';
import { deleteFeedback, getFeedback, getUsers } from '../Redux/apiCalls';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2)
  }
}));

export function Feedback() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [deleteFeedbackFlag, setDeleteFeedbackFlag] = useState(false);
  const [deleteFeedbackId, setDeleteFeedbackId] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const feedbackData = await getFeedback();
        setFeedbacks(feedbackData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
        setLoading(false);
      }
    }

    fetchFeedback();
  }, [deleteFeedbackFlag]);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleMenuOpen = (event, id) => {
    setMenuAnchorEl(event.currentTarget);
    setDeleteFeedbackId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setDeleteFeedbackId(null);
  };

  const handleDeleteFeedback = async (id) => {
    await deleteFeedback(id, dispatch);
    setDeleteAlertOpen(true);
    setDeleteFeedbackFlag((prev) => !prev);
  };

  const handleDeleteAlertClose = () => {
    setDeleteAlertOpen(false);
  };

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  return (
    <Content>
      <Snackbar
        open={deleteAlertOpen}
        autoHideDuration={3000}
        onClose={handleDeleteAlertClose}
      >
        <MuiAlert onClose={handleDeleteAlertClose} severity='success'>
          Feedback deleted successfully!
        </MuiAlert>
      </Snackbar>
      <Typography variant='h4' gutterBottom align='center'>
        <Box fontWeight='fontWeightBold' letterSpacing={2}>
          Feedbacks
        </Box>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {feedbacks.map((feedback) => (
              <Grid item xs={12}>
                <Card sx={{ maxWidth: 345 }} elevation={3}>
                  <CardActionArea disableRipple>
                    <CardHeader
                      avatar={
                        <Avatar
                          className='no-navigation'
                          sx={{ bgcolor: red[500] }}
                          aria-label='forum'
                          src={feedback.creator?.photo}
                        />
                      }
                      action={
                        <React.Fragment>
                          <IconButton
                            aria-label='settings'
                            className='no-navigation'
                            onClick={(event) =>
                              handleMenuOpen(event, feedback._id)
                            }
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={menuAnchorEl}
                            open={Boolean(menuAnchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem
                              onClick={() =>
                                handleDeleteFeedback(deleteFeedbackId)
                              }
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </React.Fragment>
                      }
                      title={
                        <Typography
                          style={{ fontSize: '24px', fontWeight: 'bold' }}
                        >
                          {feedback.creator?.displayName || 'deletd_user'}
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography variant='body2' color='text.secondary'>
                        {feedback.description}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {new Date(feedback.createdAt).toDateString()}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Content>
  );
}
