import { makeStyles } from '@material-ui/core/styles';
import { SendRounded } from '@mui/icons-material';
import { Button, Chip, Dialog, TextField } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { createForum } from '../Redux/apiCalls';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default
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
    margin: theme.spacing(1)
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
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
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
    borderRadius: '4px'
    // margin: theme.spacing(1)
  }
}));

export default function CreateForum() {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['code-block']
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
    'code-block'
  ];
  const descriptionEditor = useRef(null);
  const [doubtTitle, setDoubtTitle] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [newDescription, setNewDescription] = useState('');

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
  const [postTags, setPostTags] = useState([]);

  const [previewFile, setPreviewFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [status, setStaus] = useState('Post');

  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useSelector((state) => state.user.currentUser);

  const handleSubmit = async () => {
    if (doubtTitle.trim() === '') {
      return; // Return early if the title is empty
    }

    try {
      await createForum(dispatch, {
        title: doubtTitle,
        description: newDescription,
        tags: postTags,
        creator: user?._id
      });
    } catch (err) {
      console.log(err);
    }

    setDoubtTitle('');
    setPostTags([]);
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

  console.log(newDescription);

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
                    window.location.href = '/forum';
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
