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
import IconButton from '@mui/material/IconButton';
import JoditEditor from 'jodit-react';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Content from '../Dashboard/Content';

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
    backgroundColor: '#1772cd07',
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
    color: '#000000'
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
    margin: '0.1rem 0'
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
    fontWeight: '500 !important'
  },
  doubt_posted_time: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif !important',
    fontSize: 'medium !important'
    // fontWeight: '500 !important'
  },
  doubt_main_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100% !important'
  },
  doubt_description_outer: {
    width: '100% !important',
    backgroundColor: 'rgba(0, 0, 0, 0.03) !important',
    borderRadius: '0.3rem !important',
    padding: '0.1rem',
    [theme.breakpoints.down('sm')]: {
      width: '80% !important'
    }
  },
  doubt_description_wrapper: {
    width: '70% !important',
    margin: '0.1rem 2rem !important'
  },

  doubt_tags_wrapper: {
    gap: '0.5rem',
    margin: '0.7rem 0',
    display: 'flex',
    flexwrap: 'wrap'
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
    backgroundColor: '#1773cf23 !important'
  },
  doubt_action_btn: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    fontWeight: '600',
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
    backgroundColor: '#1772cd27 !important',
    color: '#000000 !important'
  },
  custom_btn: {
    width: '100px'
    // backgroundColor: '#1772cd07 !important'
  },

  doubt_posted_time: {
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
  }
}));

const threadPosts = [
  {
    id: 1,
    author: 'John Doe',
    avatar:
      'https://w0.peakpx.com/wallpaper/342/700/HD-wallpaper-ken-kaneki-anime-ken-kaneki-tokyo-ghoul-thumbnail.jpg',
    content:
      'This is the first thread post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in imperdiet nisi. Curabitur fringilla eleifend massa, non faucibus odio malesuada quis.',
    replies: [
      {
        id: 1,
        author: 'Jane Smith',
        avatar:
          'https://www.thedailymeal.com/img/gallery/13-delicious-things-you-can-make-with-bananas/l-intro-1673458653.jpg',
        content: 'Reply 1 to the first post.'
      },
      {
        id: 2,
        author: 'Mike Johnson',
        avatar: '/avatars/avatar3.jpg',
        content: 'Reply 2 to the first post.'
      }
    ]
  },
  {
    id: 2,
    author: 'Jane Smith',
    avatar: '/avatars/avatar2.jpg',
    content:
      'This is the second thread post. Aenean sed facilisis mi. Nullam tincidunt sapien sit amet tellus eleifend, quis aliquet felis fermentum.',
    replies: [
      {
        id: 3,
        author: 'John Doe',
        avatar: '/avatars/avatar1.jpg',
        content: 'Reply to the second post.'
      }
    ]
  }
];

const createdAt = '2023-07-28T12:34:56.789Z';
const tags = ['C++', 'Python'];
const replies = [
  {
    id: 1,
    author: 'Jane Smith',
    avatar: '/avatars/avatar2.jpg',
    content: 'Reply 1 to the first post.'
  },
  {
    id: 2,
    author: 'Mike Johnson',
    avatar: '/avatars/avatar3.jpg',
    content: 'Reply 2 to the first post.'
  }
];

export function Thread() {
  const user = useSelector((state) => state.user.currentUser);
  const admin = user?.role === 'admin';

  const [disableDelete, setDisableDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  const [requestedDoubt, setRequestedDoubt] = useState(null);
  const [reply, setReply] = useState('');

  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const forumId = location.pathname.split('/')[2];

  const thread = useSelector((state) =>
    state.forums.forums.find((forum) => forum._id === forumId)
  );

  const commentConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Enter your comment here...',
      buttons: [
        'bold',
        'italic',
        'ul',
        'ol',
        'link',
        'underline',
        'font',
        'align',
        'fontsize',
        'redo',
        'undo'
      ]
    }),
    []
  );

  return (
    <Content>
      <div className={classes.container}>
        <Paper
          className={classes.paper}
          style={{ backgroundColor: '#1772cd07' }}
          elevation={0}
        >
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
                {user?._id == thread?.creator._id && (
                  <Button
                    onClick={() => setEdit(true)}
                    // className={classes.custom_btn}
                    style={{ width: '125px' }}
                    startIcon={<EditIcon />}
                    variant='contained'
                    color='primary'
                  >
                    Edit
                  </Button>
                )}

                {(user?._id === thread.creator._id || admin) && (
                  <Button
                    onClick={() => setEdit(true)}
                    style={{ width: '125px' }}
                    startIcon={<DeleteIcon />}
                    variant='outlined'
                    width='100%'
                  >
                    Delete
                  </Button>
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
              <Button disabled={!user} onClick={null}>
                <ArrowDropUpIcon style={{ scale: '1.5' }} />
              </Button>
              <div className={classes.vote_count}>{thread.upVotes.length}</div>
              <Button disabled={!user} onClick={null}>
                <ArrowDropDownIcon style={{ scale: '1.5' }} />
              </Button>
            </div>

            <div className={classes.doubt_main_wrapper}>
              <div className={classes.owner_info_outer}>
                <div className={classes.owner_info_wrapper}>
                  <Avatar src={thread.creator.photo} />
                  <div onClick={null} className={classes.doubt_owner_name}>
                    {thread.creator.username}
                  </div>

                  <div className='owner_reputation'>
                    <Button
                      size='small'
                      className='custom_btn m-0 black_dull doubt_owner_reputation'
                      style={{ fontFamily: 'Segoe UI', fontWeight: 500 }}
                      startIcon={<StarIcon />}
                    >
                      {thread.creator.reputation}
                    </Button>
                  </div>

                  <div className={classes.doubt_posted_time}>
                    {Math.floor(
                      Math.abs(Date.now() - Date.parse(createdAt)) / (1000 * 60)
                    ) < 60
                      ? `created ${Math.floor(
                          Math.abs(Date.now() - Date.parse(createdAt)) /
                            (1000 * 60)
                        )} minutes ago`
                      : Math.floor(
                          Math.abs(Date.now() - Date.parse(createdAt)) /
                            (1000 * 60 * 60)
                        ) < 24
                      ? `created ${Math.floor(
                          Math.abs(Date.now() - Date.parse(createdAt)) /
                            (1000 * 60 * 60)
                        )} Hours ago`
                      : Math.floor(
                          Math.abs(Date.now() - Date.parse(createdAt)) /
                            (1000 * 60 * 60 * 24)
                        ) < 30
                      ? `created ${Math.floor(
                          Math.abs(Date.now() - Date.parse(createdAt)) /
                            (1000 * 60 * 60 * 24)
                        )} Days ago`
                      : Math.floor(
                          Math.abs(Date.now() - Date.parse(createdAt)) /
                            (1000 * 60 * 60 * 24 * 30)
                        ) < 12
                      ? `created ${Math.floor(
                          Math.abs(Date.now() - Date.parse(createdAt)) /
                            (1000 * 60 * 60 * 24 * 30)
                        )} Months ago`
                      : `created ${Math.floor(
                          Math.abs(Date.now() - Date.parse(createdAt)) /
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
                {tags?.map((tag, idx) => (
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
                  !threadPosts[0].replies.length
                    ? 0
                    : threadPosts[0].replies.length
                }`}</Button>
              </div>
              <div className='right_hand_side'>
                <div className='btn_group'>
                  <Button
                    disabled={!reply.length}
                    size='small'
                    startIcon={<ReplyIcon />}
                    className={`custom_btn black_dull ${classes.doubt_action_btn}`}
                    onClick={null}
                  >
                    Add Reply
                  </Button>
                </div>
              </div>
            </div>
            <div className='comment_editor_outer'>
              <div className='comment_editor_wrapper'>
                <JoditEditor
                  config={commentConfig}
                  value={reply}
                  onChange={(e) => setReply(e)}
                />
              </div>
            </div>
            <div className='display_replies_outer'>
              <div className='display_replies_wrapper'>
                {threadPosts[0].replies.map((reply, idx) => (
                  <div key={idx} className='single_reply_outer'>
                    <div className='single_reply_wrapper'>
                      <div className={classes.owner_info_outer}>
                        <div className={classes.owner_info_wrapper}>
                          <Avatar src={reply.avatar} />
                          <div
                            onClick={null}
                            className={classes.doubt_owner_name}
                          >
                            {reply.author}
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
                              5
                            </Button>
                          </div>

                          <div className={classes.reply_action_outer}>
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
                            >
                              {null ? 0 : 3}
                            </div>
                            <IconButton onClick={null}>
                              <ArrowDropDownIcon
                                className={`${
                                  -1 === -1 ? 'black_dull' : 'black'
                                }`}
                              />
                            </IconButton>
                          </div>
                          {Math.floor(
                            Math.abs(Date.now() - Date.parse(createdAt)) /
                              (1000 * 60)
                          ) < 60 ? (
                            <div className={classes.doubt_posted_time}>
                              {`created ${Math.floor(
                                Math.abs(Date.now() - Date.parse(createdAt)) /
                                  (1000 * 60)
                              )} minutes ago`}
                            </div>
                          ) : Math.floor(
                              Math.abs(Date.now() - Date.parse(createdAt)) /
                                (1000 * 60 * 60)
                            ) < 24 ? (
                            <div
                              className={classes.doubt_posted_time}
                            >{`created ${Math.floor(
                              Math.abs(Date.now() - Date.parse(createdAt)) /
                                (1000 * 60 * 60)
                            )} Hours ago`}</div>
                          ) : Math.floor(
                              Math.abs(Date.now() - Date.parse(createdAt)) /
                                (1000 * 60 * 60 * 24)
                            ) < 30 ? (
                            <div
                              className={classes.doubt_posted_time}
                            >{`created ${Math.floor(
                              Math.abs(Date.now() - Date.parse(createdAt)) /
                                (1000 * 60 * 60 * 24)
                            )} Days ago`}</div>
                          ) : Math.floor(
                              Math.abs(Date.now() - Date.parse(createdAt)) /
                                (1000 * 60 * 60 * 24 * 30)
                            ) < 12 ? (
                            <div
                              className={classes.doubt_posted_time}
                            >{`created ${Math.floor(
                              Math.abs(Date.now() - Date.parse(createdAt)) /
                                (1000 * 60 * 60 * 24 * 30)
                            )} Months ago`}</div>
                          ) : (
                            <div
                              className={classes.doubt_posted_time}
                            >{`created ${Math.floor(
                              Math.abs(Date.now() - Date.parse(createdAt)) /
                                (1000 * 60 * 60 * 24 * 30 * 12)
                            )} Years ago`}</div>
                          )}
                        </div>
                      </div>
                      <div className={classes.doubt_description_outer}>
                        <div className={classes.doubt_description_wrapper}>
                          {reply.content}
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
