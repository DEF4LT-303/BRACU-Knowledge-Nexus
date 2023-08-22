import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Content from '../Dashboard/Content';

export default function FeedbackPage({ userEmail }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the submission of feedback, including the user's email
    // You can use the userEmail prop here

    // For demonstration purposes, let's just log the feedback to the console
    console.log('Feedback:', feedback);
  };

  return (
    <Content>
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
