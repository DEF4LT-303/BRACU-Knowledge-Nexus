import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import StarIcon from '@mui/icons-material/Star';
import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CreateForum from '../Components/CreateForum';
import DeleteDialog from '../Components/DeleteDialog';
import Content from '../Dashboard/Content';
import {
  createReply,
  getForums,
  updateForum,
  updateOtherUser
} from '../Redux/apiCalls';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: theme.spacing(6),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: `${theme.palette.paper.main} !important`,
    borderRadius: '0.3rem',
    width: '100%'
  },
  spacer: {
    display: 'flex',
    gap: '1rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'left',
    columnGap: '2rem'
  },
  sectionWrapper_2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    columnGap: '2rem',
    width: '100% !important'
  },
  right_hand_side: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexwrap: 'wrap'
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '1rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  threadTitle: {
    marginLeft: '1rem',
    fontFamily: 'Segoe UI',
    fontWeight: 600,
    fontSize: 'large',
    color: theme.palette.fontColor.main
  },

  votes_wrapper: {
    margin: '0.7rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vote_count: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    fontWeight: 600,
    fontSize: 'larger',
    margin: '0.1rem 0',
    color: theme.palette.fontColor.main
  },
  owner_info_wrapper: {
    display: 'flex',
    width: '100% !important',
    margin: '0.7rem 0',
    alignItems: 'center',
    columnGap: '0.5rem'
  },
  doubt_owner_name: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif !important',
    fontSize: 'medium !important',
    fontWeight: '500 !important',
    color: theme.palette.fontColor.main
  },
  // doubt_posted_time: {
  //   fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif !important',
  //   fontSize: 'medium !important',
  //   fontWeight: '500 !important'
  // },
  doubt_main_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100% !important'
  },
  doubt_description_outer: {
    width: '100% !important',
    backgroundColor: theme.palette.secondary.secondary,
    borderRadius: '0.3rem !important',
    padding: '0.1rem',
    [theme.breakpoints.down('sm')]: {
      width: '80% !important'
    }
  },
  doubt_description_wrapper: {
    width: 'auto !important',
    margin: '0.1rem 2rem !important',
    color: theme.palette.fontColor.main,
    '& pre': {
      backgroundColor: theme.palette.codeblock.main,
      padding: '10px',
      overflow: 'auto',
      fontSize: '14px',
      borderRadius: '0.3rem',
      color: theme.palette.fontColor.main
    },
    '& blockquote': {
      borderLeft: '5px solid #ccc',
      paddingLeft: '10px',
      marginLeft: 0,
      fontStyle: 'italic'
    }
  },

  doubt_tags_wrapper: {
    gap: '0.5rem',
    margin: '0.7rem 0',
    display: 'flex',
    flexWrap: 'wrap'
  },
  sectionWrapper_3: {
    display: 'flex',
    flexDirection: 'column',
    width: '100% !important',
    rowGap: '0.7rem'
  },
  sectionNavigation_3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between !important',
    alignItems: 'center',
    width: '100% !important',
    backgroundColor: theme.palette.paper.secondary
  },
  doubt_action_btn: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    fontWeight: '600',
    color: '#000000 !important',
    '&:disabled': {
      color: '#000000 !important',
      opacity: '0.5 !important'
    },
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  reply_action_outer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '0.1rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  customChip: {
    backgroundColor: theme.palette.paper.secondary,
    color: '#000000 !important'
  },
  custom_btn: {
    width: '100px'
    // backgroundColor: '#1772cd07 !important'
  },

  doubt_posted_time: {
    color: `${theme.palette.fontColor.main} !important`,
    [theme.breakpoints.down('sm')]: {
      wordWrap: 'break-word',
      marginTop: theme.spacing(1)
    }
  },
  createdAtContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },

  joditEditor: {
    width: '100%',
    height: 'auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
    '& .ql-editor': {
      color: theme.palette.fontColor.main
    },
    '& .ql-editor.ql-blank::before': {
      color: theme.palette.fontColor.main
    }
  },

  vote_buttons: {
    color: theme.palette.text.secondary,
    transition: 'color 0.3s',

    '&:hover': {
      color: theme.palette.primary.main
    }
  },

  upvoted: {
    color: theme.palette.success.main // Change color for upvoted state
  },

  downvoted: {
    color: theme.palette.error.main // Change color for downvoted state
  }
}));

export function Thread() {
  const user = useSelector((state) => state.user.currentUser);
  const admin = user?.role === 'admin';

  const [disableDelete, setDisableDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const [requestedDoubt, setRequestedDoubt] = useState(null);
  const [reply, setReply] = useState('');

  const [selectedThread, setSelectedThread] = useState(null);

  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const forumId = location.pathname.split('/')[2];

  const thread = useSelector((state) =>
    state.forums.forums.find((forum) => forum._id === forumId)
  );

  const handleReplySubmit = async () => {
    try {
      if (reply.trim() === '') {
        return;
      }

      const newReplyData = {
        creator: user?._id,
        reply: reply,
        replyToPost: thread?._id
      };

      const newReply = await createReply(newReplyData);

      const updatedForum = await updateForum(
        thread?._id,
        {
          ...thread,
          replies: [...thread.replies, newReply]
        },
        dispatch
      );

      setReply('');
    } catch (error) {
      console.error('Failed to create reply:', error);
    }
  };

  const isContentNotEmpty = (content) => {
    const cleanedContent = content.replace(/<[^>]*>/g, '').trim();
    return !!cleanedContent;
  };

  const handleEditForum = (thread) => {
    setSelectedThread(thread);
  };

  const EMA_ALPHA = 0.02;
  const initial = thread?.creator?.reputation;

  const updateReputation = async (reputationChange, initial) => {
    const currentReputation = initial;
    const newReputation =
      currentReputation + EMA_ALPHA * (reputationChange - currentReputation);

    // Ensure the new reputation stays within the range of 0 to 5
    const clampedReputation = Math.max(0, Math.min(5, newReputation));

    const roundedReputation = Math.round(clampedReputation * 100) / 100;

    updateOtherUser(
      thread.creator?._id,
      { reputation: roundedReputation },
      dispatch
    );
  };

  const upVote = async () => {
    const isUserInUpVotes = thread.upVotes.includes(user?._id);
    try {
      let updatedUpVotes = [...thread.upVotes];
      let updatedDownVotes = [...thread.downVotes];

      if (isUserInUpVotes) {
        updatedUpVotes = updatedUpVotes.filter(
          (userId) => userId !== user?._id
        );
      } else {
        updatedUpVotes.push(user?._id);
        updatedDownVotes = updatedDownVotes.filter(
          (userId) => userId !== user?._id
        );
      }

      updateReputation(isUserInUpVotes ? -1 : 1, initial);

      const updatedForum = await updateForum(
        thread?._id,
        {
          ...thread,
          upVotes: updatedUpVotes,
          downVotes: updatedDownVotes
        },
        dispatch
      );

      // setUserHasUpvoted(!userHasUpvoted);
      // setUserHasDownvoted(false);
    } catch (error) {
      console.error('Failed to upvote:', error);
    }
  };

  const downVote = async () => {
    const isUserInDownVotes = thread.downVotes.includes(user?._id);
    try {
      let updatedUpVotes = [...thread.upVotes];
      let updatedDownVotes = [...thread.downVotes];

      if (isUserInDownVotes) {
        updatedDownVotes = updatedDownVotes.filter(
          (userId) => userId !== user?._id
        );
      } else {
        updatedDownVotes.push(user?._id);
        updatedUpVotes = updatedUpVotes.filter(
          (userId) => userId !== user?._id
        );
      }

      updateReputation(isUserInDownVotes ? 1 : -1, initial);

      const updatedForum = await updateForum(
        thread?._id,
        {
          ...thread,
          upVotes: updatedUpVotes,
          downVotes: updatedDownVotes
        },
        dispatch
      );

      // setUserHasDownvoted(!userHasDownvoted);
      // setUserHasUpvoted(false);
    } catch (error) {
      console.error('Failed to downvote:', error);
    }
  };

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

  useEffect(() => {
    getForums(dispatch);
  }, [thread?.replies]);

  return (
    <Content>
      <div>
        {selectedThread && (
          <CreateForum
            forumToEdit={selectedThread}
            onClose={() => setSelectedThread(null)}
          />
        )}
      </div>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={0}>
          <div className={classes.sectionWrapper}>
            <Button
              onClick={() => history.push('/forum')}
              size='small'
              startIcon={<ArrowBackIosIcon />}
              className={classes.custom_btn}
            >
              Back
            </Button>
            <div className={classes.right_hand_side}>
              <div className={classes.spacer}>
                {user?._id == thread?.creator?._id && (
                  <Button
                    onClick={() => handleEditForum(thread)}
                    // className={classes.custom_btn}
                    style={{ width: '125px' }}
                    startIcon={<EditIcon />}
                    variant='contained'
                    color='primary'
                  >
                    Edit
                  </Button>
                )}

                {(user?._id === thread.creator?._id || admin) && (
                  <DeleteDialog
                    ids={[thread._id]}
                    entityName={'Forum'}
                    render={(open) => (
                      <Button
                        variant='outlined'
                        startIcon={<DeleteIcon />}
                        onClick={open}
                      >
                        Delete
                      </Button>
                    )}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={classes.sectionWrapper}>
            <div className={classes.threadTitle}>
              <h2>{thread.title}</h2>
            </div>
          </div>

          <div className={classes.sectionWrapper_2}>
            <div className={classes.votes_wrapper}>
              <Button
                disabled={!user}
                onClick={upVote}
                className={`${classes.vote_buttons} ${
                  thread?.upVotes?.includes(user?._id) ? classes.upvoted : ''
                }`}
              >
                <ArrowDropUpIcon style={{ scale: '1.5' }} />
              </Button>
              <div className={classes.vote_count}>
                {thread.upVotes.length - thread.downVotes.length}
              </div>
              <Button
                disabled={!user}
                onClick={downVote}
                className={`${classes.vote_buttons} ${
                  thread?.downVotes?.includes(user?._id)
                    ? classes.downvoted
                    : ''
                }`}
              >
                <ArrowDropDownIcon style={{ scale: '1.5' }} />
              </Button>
            </div>

            <div className={classes.doubt_main_wrapper}>
              <div className={classes.owner_info_outer}>
                <div className={classes.owner_info_wrapper}>
                  <Avatar src={thread.creator?.photo} />
                  <div onClick={null} className={classes.doubt_owner_name}>
                    {thread.creator?.username || 'Deleted User'}
                  </div>

                  <div className='owner_reputation'>
                    <Button
                      size='small'
                      className='custom_btn m-0 black_dull doubt_owner_reputation'
                      style={{ fontFamily: 'Segoe UI', fontWeight: 500 }}
                      startIcon={<StarIcon />}
                    >
                      {thread.creator?.reputation || 0}
                    </Button>
                  </div>

                  <div className={classes.doubt_posted_time}>
                    {Math.floor(
                      Math.abs(Date.now() - Date.parse(thread.createdAt)) /
                        (1000 * 60)
                    ) < 60
                      ? `created ${Math.floor(
                          Math.abs(Date.now() - Date.parse(thread.createdAt)) /
                            (1000 * 60)
                        )} minutes ago`
                      : Math.floor(
                          Math.abs(Date.now() - Date.parse(thread.createdAt)) /
                            (1000 * 60 * 60)
                        ) < 24
                      ? `created ${Math.floor(
                          Math.abs(Date.now() - Date.parse(thread.createdAt)) /
                            (1000 * 60 * 60)
                        )} Hours ago`
                      : Math.floor(
                          Math.abs(Date.now() - Date.parse(thread.createdAt)) /
                            (1000 * 60 * 60 * 24)
                        ) < 30
                      ? `created ${Math.floor(
                          Math.abs(Date.now() - Date.parse(thread.createdAt)) /
                            (1000 * 60 * 60 * 24)
                        )} Days ago`
                      : Math.floor(
                          Math.abs(Date.now() - Date.parse(thread.createdAt)) /
                            (1000 * 60 * 60 * 24 * 30)
                        ) < 12
                      ? `created ${Math.floor(
                          Math.abs(Date.now() - Date.parse(thread.createdAt)) /
                            (1000 * 60 * 60 * 24 * 30)
                        )} Months ago`
                      : `created ${Math.floor(
                          Math.abs(Date.now() - Date.parse(thread.createdAt)) /
                            (1000 * 60 * 60 * 24 * 30 * 12)
                        )} Years ago`}
                  </div>
                </div>
              </div>

              <div className={classes.doubt_description_outer}>
                <div
                  className={classes.doubt_description_wrapper}
                  dangerouslySetInnerHTML={{ __html: thread.description }}
                />
              </div>

              <div className={classes.doubt_tags_wrapper}>
                {thread.tags?.map((tag, idx) => (
                  <Chip
                    key={idx}
                    label={tag}
                    className={`home-post-tags active ${classes.customChip}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={classes.sectionWrapper_3}>
            <div className={classes.sectionNavigation_3}>
              <div className={classes.leftSide}>
                <Button
                  startIcon={<ChatIcon />}
                  className={`custom_btn black ${classes.doubt_action_btn}`}
                >{`Comments: ${
                  !thread.replies ? 0 : thread.replies.length
                }`}</Button>
              </div>
              <div className='right_hand_side'>
                <div className='btn_group'>
                  {user ? (
                    <Button
                      disabled={!isContentNotEmpty(reply)}
                      size='small'
                      startIcon={<ReplyIcon />}
                      className={`custom_btn black_dull ${classes.doubt_action_btn}`}
                      onClick={handleReplySubmit}
                    >
                      Add Reply
                    </Button>
                  ) : (
                    <Link
                      to={`/login`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Typography style={{ margin: '10px' }}>
                        Login to Reply
                      </Typography>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className='comment_editor_outer'>
              <div className={classes.joditEditor}>
                <ReactQuill
                  value={reply}
                  onChange={(e) => {
                    setReply(e);
                  }}
                  modules={modules}
                  formats={formats}
                  readOnly={!user}
                  placeholder='Reply...'
                  className={classes.joditEditor}
                />
              </div>
            </div>
            <div className='display_replies_outer'>
              <div className='display_replies_wrapper'>
                {thread.replies &&
                  thread.replies.map((reply, idx) => (
                    <div key={idx} className='single_reply_outer'>
                      <div className='single_reply_wrapper'>
                        <div className={classes.owner_info_outer}>
                          <div className={classes.owner_info_wrapper}>
                            <Avatar src={reply.creator.photo} />
                            <div
                              onClick={null}
                              className={classes.doubt_owner_name}
                            >
                              {reply.creator.username || 'Deleted User'}
                            </div>

                            <div className='owner_reputation'>
                              <Button
                                size='small'
                                className='custom_btn m-0 black_dull doubt_owner_reputation'
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontWeight: 500
                                }}
                                startIcon={<StarIcon />}
                              >
                                {reply.creator.reputation || 0}
                              </Button>
                            </div>

                            {/* <div className={classes.reply_action_outer}>
                              <IconButton onClick={null}>
                                <ArrowDropUpIcon
                                  className={`${
                                    -1 === -1 ? 'black_dull' : 'black'
                                  }`}
                                />
                              </IconButton>
                              <div
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontWeight: 500
                                }}
                              ></div>
                              <IconButton onClick={null}>
                                <ArrowDropDownIcon
                                  className={`${
                                    -1 === -1 ? 'black_dull' : 'black'
                                  }`}
                                />
                              </IconButton>
                            </div> */}
                            {Math.floor(
                              Math.abs(
                                Date.now() - Date.parse(reply.createdAt)
                              ) /
                                (1000 * 60)
                            ) < 60 ? (
                              <div className={classes.doubt_posted_time}>
                                {`created ${Math.floor(
                                  Math.abs(
                                    Date.now() - Date.parse(reply.createdAt)
                                  ) /
                                    (1000 * 60)
                                )} minutes ago`}
                              </div>
                            ) : Math.floor(
                                Math.abs(
                                  Date.now() - Date.parse(reply.createdAt)
                                ) /
                                  (1000 * 60 * 60)
                              ) < 24 ? (
                              <div
                                className={classes.doubt_posted_time}
                              >{`created ${Math.floor(
                                Math.abs(
                                  Date.now() - Date.parse(reply.createdAt)
                                ) /
                                  (1000 * 60 * 60)
                              )} Hours ago`}</div>
                            ) : Math.floor(
                                Math.abs(
                                  Date.now() - Date.parse(reply.createdAt)
                                ) /
                                  (1000 * 60 * 60 * 24)
                              ) < 30 ? (
                              <div
                                className={classes.doubt_posted_time}
                              >{`created ${Math.floor(
                                Math.abs(
                                  Date.now() - Date.parse(reply.createdAt)
                                ) /
                                  (1000 * 60 * 60 * 24)
                              )} Days ago`}</div>
                            ) : Math.floor(
                                Math.abs(
                                  Date.now() - Date.parse(reply.createdAt)
                                ) /
                                  (1000 * 60 * 60 * 24 * 30)
                              ) < 12 ? (
                              <div
                                className={classes.doubt_posted_time}
                              >{`created ${Math.floor(
                                Math.abs(
                                  Date.now() - Date.parse(reply.createdAt)
                                ) /
                                  (1000 * 60 * 60 * 24 * 30)
                              )} Months ago`}</div>
                            ) : (
                              <div
                                className={classes.doubt_posted_time}
                              >{`created ${Math.floor(
                                Math.abs(
                                  Date.now() - Date.parse(reply.createdAt)
                                ) /
                                  (1000 * 60 * 60 * 24 * 30 * 12)
                              )} Years ago`}</div>
                            )}
                          </div>
                        </div>
                        <div className={classes.doubt_description_outer}>
                          <div className={classes.doubt_description_wrapper}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: reply.reply
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </Content>
  );
}
