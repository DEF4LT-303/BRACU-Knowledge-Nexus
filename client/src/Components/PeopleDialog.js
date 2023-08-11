import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
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
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

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

  const handleSkillAdd = () => {
    if (skillInput.trim() !== '') {
      setTechnicalSkills([...technicalSkills, skillInput]);
      setSkillInput('');
    }
  };

  const handleSkillDelete = (index) => {
    const newSkills = [...technicalSkills];
    newSkills.splice(index, 1);
    setTechnicalSkills(newSkills);
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
      technicalSkills: technicalSkills
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
          <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <FormControl fullWidth variant='outlined'>
              <InputLabel shrink id='gender-label'>
                Gender
              </InputLabel>
              <Select
                autoFocus
                margin='dense'
                labelId='gender-label'
                label='Gender'
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
          </div>
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
          <div style={{ marginTop: '1rem' }}>
            <TextField
              id='technical-skills-input'
              label='Technical Skills'
              fullWidth
              value={skillInput}
              variant='outlined'
              onChange={(e) => {
                setSkillInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSkillAdd();
                }
              }}
              InputProps={{
                startAdornment: (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap', // Prevent chips from wrapping
                      gap: '4px',
                      maxWidth: '100%',
                      flexShrink: 0,
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {technicalSkills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        color='primary'
                        onDelete={() => handleSkillDelete(index)}
                      />
                    ))}
                  </div>
                )
              }}
            />
          </div>
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
