import { makeStyles } from '@material-ui/core/styles';
import { SendRounded } from '@mui/icons-material';
import { Button, Chip, Dialog, TextField } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createForum, getForums, updateForum } from '../Redux/apiCalls';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // height: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.dialog.main
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center'
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  customPostInputField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '60%',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    '& .MuiOutlinedInput-input::placeholder': {
      color: theme.palette.fontColor.main
    },
    '& input': {
      color: theme.palette.fontColor.main
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.fontColor.main
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.secondary.main
      }
      // '&:hover fieldset': {
      //   borderColor: theme.palette.secondary.main
      // }
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  btnGroup: {
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2)
  },
  customBtn: {
    minWidth: '100px',
    height: '40px',
    margin: theme.spacing(1),
    '&:disabled': {
      color: `${theme.palette.fontColor.main} !important`,
      cursor: 'not-allowed'
    }
  },

  postDoubtsTagsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'left',
    margin: theme.spacing(2),
    gap: theme.spacing(1)
  },
  homePostTags: {
    margin: theme.spacing(1),
    cursor: 'pointer',
    backgroundColor: `${theme.palette.secondary.main} !important`,
    color: `${theme.palette.fontColor.main} !important`,
    '&.active': {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: `${theme.palette.common.white} !important`,
      '&:hover': {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: `${theme.palette.common.white} !important`
      }
    }
  },
  joditWrapper: {
    width: '100%',
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  joditEditor: {
    width: '100%',
    height: 'auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
    '& .ql-editor': {
      color: theme.palette.fontColor.main
    },
    '& .ql-editor::placeholder': {
      color: `${theme.palette.fontColor.main} !important`
    }
  }
}));

export default function CreateForum({ forumToEdit, onClose }) {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link'],
      ['code-block'],
      [{ color: [] }]
    ]
  };

  const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'code-block',
    'color',
    'indent'
  ];

  const [tags, setTags] = useState([
    'JavaScript',
    'Java',
    'Python',
    'C++',
    'HTML',
    'CSS',
    'React',
    'Angular',
    'Vue.js',
    'Node.js',
    'PHP',
    'Ruby on Rails',
    '.NET',
    'Swift',
    'Kotlin',
    'Android',
    'iOS',
    'Git',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'Google Cloud Platform',
    'SQL',
    'NoSQL',
    'MongoDB',
    'Firebase',
    'RESTful API',
    'GraphQL',
    'OAuth',
    'JWT',
    'WebSocket',
    'Microservices',
    'DevOps',
    'Agile',
    'Scrum',
    'Machine Learning',
    'Artificial Intelligence',
    'Data Science',
    'Natural Language Processing',
    'Computer Vision',
    'Big Data',
    'Blockchain',
    'Cybersecurity',
    'IoT',
    'Virtual Reality'
  ]);

  const [forumId, setForumId] = useState(null);

  const [postTags, setPostTags] = useState([]);
  const descriptionEditor = useRef(null);
  const [doubtTitle, setDoubtTitle] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [newDescription, setNewDescription] = useState('');

  const [previewFile, setPreviewFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [open, setOpen] = useState(true);
  const [status, setStaus] = useState(forumToEdit ? 'Update' : 'Post');

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (forumToEdit) {
      setForumId(forumToEdit._id);
      setDoubtTitle(forumToEdit.title);
      setNewDescription(forumToEdit.description);
      setPostTags(forumToEdit.tags);
    }
  }, [forumToEdit]);

  const user = useSelector((state) => state.user.currentUser);

  const handleSubmit = async () => {
    if (doubtTitle.trim() === '') {
      return; // Return early if the title is empty
    }

    try {
      setDisableSubmit(true);
      setStaus(forumId ? 'Updating' : 'Posting'); // Update status based on forumId
      if (forumId) {
        await updateForum(
          forumId,
          {
            title: doubtTitle,
            description: newDescription,
            tags: postTags
          },
          dispatch
        );
      } else {
        await createForum(dispatch, {
          title: doubtTitle,
          description: newDescription,
          tags: postTags,
          creator: user?._id
        });
      }
      setStaus(forumId ? 'Updated' : 'Posted');
      setDisableSubmit(true);
      getForums(dispatch);
    } catch (err) {
      console.log(err);
    }

    setOpen(false); // Close the dialog
    onClose();
  };

  const isContentNotEmpty = (content) => {
    const cleanedContent = content.replace(/<[^>]*>/g, '').trim();
    return !!cleanedContent;
  };

  useEffect(() => {
    setDisableSubmit(
      doubtTitle.trim() === '' || !isContentNotEmpty(newDescription)
    );
  }, [doubtTitle, newDescription]);

  return (
    <>
      <SnackbarProvider maxSnack={3} />
      <Dialog
        disableEnforceFocus
        fullScreen
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <div className={classes.section}>
              <div className={classes.inputWrapper}>
                <TextField
                  className={classes.customPostInputField}
                  type='text'
                  variant='outlined'
                  label='Topic Title'
                  margin='dense'
                  id='input-title'
                  required
                  autoFocus={true}
                  placeholder='Enter topic title...'
                  autoComplete={'off'}
                  value={doubtTitle}
                  onChange={(e) => setDoubtTitle(e.target.value)}
                />
              </div>
              <div className={classes.btnGroup}>
                <Button
                  onClick={() => {
                    setOpen(false);
                    onClose();
                  }}
                  className={classes.customBtn}
                >
                  Close
                </Button>
                <Button
                  disabled={disableSubmit}
                  onClick={handleSubmit}
                  endIcon={<SendRounded />}
                  className={classes.customBtn}
                >
                  {status}
                </Button>
              </div>
            </div>

            <div className={classes.postDoubtsTagsWrapper}>
              {tags?.map((tag) => (
                <Chip
                  onClick={() => {
                    if (postTags.indexOf(tag) === -1)
                      setPostTags((state) => [...state, tag]);
                    else
                      setPostTags((state) =>
                        state.filter((all) => all !== tag)
                      );
                  }}
                  className={`${classes.homePostTags} ${
                    postTags?.indexOf(tag) !== -1 ? 'active' : ''
                  }`}
                  key={tag}
                  label={tag}
                />
              ))}
            </div>

            <div className={classes.joditWrapper}>
              <ReactQuill
                value={newDescription}
                onChange={setNewDescription}
                modules={modules}
                formats={formats}
                placeholder='Enter your description here...'
                className={classes.joditEditor}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
