import { Button, Snackbar, TextField, Typography } from '@material-ui/core';
import { Alert } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Content from '../Dashboard/Content';
import { createFeedback } from '../Redux/apiCalls';

export default function FeedbackPage({ userEmail }) {
  const [feedback, setFeedback] = useState('');
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newFeedback = {
        description: feedback,
        creator: user?._id
      };

      await createFeedback(newFeedback);
      console.log('Feedback submitted successfully');
      setIsSuccessAlertOpen(true);

      setFeedback('');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <Content>
      <Snackbar
        open={isSuccessAlertOpen}
        autoHideDuration={5000}
        onClose={() => setIsSuccessAlertOpen(false)}
      >
        <Alert onClose={() => setIsSuccessAlertOpen(false)} severity='success'>
          Feedback submitted successfully!
        </Alert>
      </Snackbar>
      <Typography variant='h4'>Feedback</Typography>
      <Typography variant='body1'>We'd love to hear your feedback!</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Your Email'
          value={userEmail}
          disabled
          fullWidth
          margin='normal'
        />
        <TextField
          label='Feedback'
          multiline
          rows={4}
          value={feedback}
          variant='outlined'
          onChange={(e) => setFeedback(e.target.value)}
          fullWidth
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary'>
          Submit Feedback
        </Button>
      </form>
    </Content>
  );
}
