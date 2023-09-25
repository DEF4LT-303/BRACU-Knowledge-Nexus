import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOtherUser, updateUser } from '../Redux/apiCalls';

const useStyles = makeStyles((theme) => ({
  tagsInput: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    padding: '0 8px',
    border: '1px solid #ced4da',
    borderRadius: 4,
    '&:focus-within': {
      border: `1px solid ${theme.palette.primary.main}`
    }
  },
  customSubtitle: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.subtitle1.fontWeight
  },
  input: {
    flex: 1,
    border: 'none',
    height: 46,
    fontSize: 14,
    color: theme.palette.text.primary,
    background: 'transparent',
    padding: '4px 0 0 0',
    '&:focus': {
      outline: 'transparent'
    }
  },
  tagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    margin: 8,
    gap: '5px'
  }
}));

export default function PeopleDialog({ data, render, onSave }) {
  const classes = useStyles();

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
        // console.log('Updating user:', data._id, currentUser._id);
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
          <Typography
            variant='subtitle2'
            style={{ marginTop: '1rem' }}
            className={classes.customSubtitle}
          >
            Technical Skills
          </Typography>
          <div className={classes.tagsInput}>
            <ul className={classes.tagsList}>
              {technicalSkills.map((tag, index) => (
                <Chip
                  color='primary'
                  key={index}
                  label={tag}
                  onDelete={() => handleSkillDelete(index)}
                  className={classes.tag}
                />
              ))}
            </ul>
            <input
              className={classes.input}
              type='text'
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSkillAdd();
                }
              }}
              placeholder='Press enter to add skills...'
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
