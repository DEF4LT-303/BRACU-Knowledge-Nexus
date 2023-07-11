import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOtherUser, updateUser } from '../Redux/apiCalls';

export default function PeopleDialog({ data, render, onSave }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const defaultImg = data && data.photo;
  const defaultName = data && data.username;
  // Existing ID or random ID
  const id = data && data.id;

  const [img, setImg] = useState(defaultImg);
  const [name, setName] = useState(defaultName);
  const [displayName, setDisplayName] = useState(data && data.displayName);
  const [about, setAbout] = useState(data && data.about);
  const [gender, setGender] = useState(data && data.gender);
  const [githubLink, setGithubLink] = useState(data && data.githubLink);
  const [linkedInLink, setLinkedInLink] = useState(data && data.linkedInLink);
  const [technicalSkills, setTechnicalSkills] = useState(
    data && data.technicalSkills
  );

  const genders = ['Male', 'Female'];

  const handleClickOpen = () => {
    setOpen(true);
    setName(defaultName);
    setImg(defaultImg);
    setDisplayName(data && data.displayName);
    setAbout(data && data.about);
    setGender(data && data.gender);
    setGithubLink(data && data.githubLink);
    setLinkedInLink(data && data.linkedInLink);
    setTechnicalSkills(data && data.technicalSkills);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const updatedUserData = {
      username: name,
      displayName: displayName,
      photo: img,
      about: about,
      gender: gender,
      githubLink: githubLink,
      linkedInLink: linkedInLink,
      technicalSkills:
        typeof technicalSkills === 'string' && technicalSkills.trim() !== ''
          ? technicalSkills.split(',').map((skill) => skill.trim())
          : []
    };

    try {
      if (data._id === currentUser._id) {
        console.log('Updating user:', data._id, currentUser._id);
        await updateUser(data._id, updatedUserData, dispatch);
      } else {
        updateOtherUser(data._id, updatedUserData, dispatch);
      }

      onSave && onSave();
      handleClose();
    } catch (error) {
      console.error('Failed to update user:', error);
      const errorMessage = 'An error occurred while saving the user.';
      alert(errorMessage);
    }
  };

  return (
    <>
      {render(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          {data ? 'Edit' : 'Add'} Profile{' '}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            label='Image URL'
            fullWidth
            value={img}
            onChange={(e) => {
              setImg(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Display Name'
            fullWidth
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
          <FormControl fullWidth>
            <InputLabel id='gender-label'>Gender</InputLabel>
            <Select
              autoFocus
              margin='dense'
              labelId='gender-label'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {genders.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin='dense'
            label='About'
            fullWidth
            multiline
            rows={4}
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            label='GitHub Link'
            fullWidth
            value={githubLink}
            onChange={(e) => {
              setGithubLink(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            label='LinkedIn Link'
            fullWidth
            value={linkedInLink}
            onChange={(e) => {
              setLinkedInLink(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            label='Technical Skills'
            fullWidth
            value={technicalSkills}
            onChange={(e) => {
              setTechnicalSkills(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
