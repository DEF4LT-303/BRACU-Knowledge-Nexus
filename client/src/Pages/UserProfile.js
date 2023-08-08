import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DeleteDialog from '../Components/DeleteDialog';
import PeopleDialog from '../Components/PeopleDialog';
import Content from '../Dashboard/Content';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://react.school/'></Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: 'relative',
    height: '100px',
    marginBottom: theme.spacing(10), // Add margin at the bottom for mobile view
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0 // Remove margin for larger screens
    }
  },
  header: {
    display: 'flex',
    position: 'absolute',
    width: 'calc(100%)',
    top: '-70px',
    flexDirection: 'column', // Display items in a column on mobile view
    alignItems: 'center', // Center items horizontally on mobile view
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row', // Reset to row layout for larger screens
      alignItems: 'flex-end', // Align items to the bottom of the row
      '& > *': {
        margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`
      }
    }
  },

  spacer: {
    flexGrow: '1'
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3]
  },
  actionGroup: {
    display: 'flex',
    width: '330px',
    justifyContent: 'space-between',
    marginRight: 0
  },
  summaryCards: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  card: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
    background: '#f0f0f0',
    borderRadius: '5px'
  },
  cardTitle: {
    marginBottom: theme.spacing(1),
    display: 'inline-block',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    paddingBottom: theme.spacing(0.1),
    fontWeight: 'bold'
  },
  underline: {
    width: '20%',
    height: '2px',
    background: theme.palette.primary.main,
    marginBottom: theme.spacing(2)
  },
  cardContent: {
    marginLeft: theme.spacing(2)
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  skillChip: {
    margin: theme.spacing(0.5)
  },
  sectionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4)
  },

  linkTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(-1),
    fontWeight: 'bold',
    color: '#000'
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    marginBottom: theme.spacing(1)
  },
  emailSection: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(1)
    }
  }
}));

export function SummaryCard({ title, value, component }) {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.summaryCard}>
      <Typography color={'textSecondary'} variant='h5' gutterBottom>
        {title}
      </Typography>
      {component || (
        <Typography color={'primary'} variant='h3'>
          {value}
        </Typography>
      )}
    </Paper>
  );
}

export function BioCard({ title, content }) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Typography variant='h5' className={classes.cardTitle}>
        {title}
      </Typography>
      <Typography variant='body1' className={classes.cardContent}>
        {content}
      </Typography>
    </div>
  );
}

export function SkillsCard({ title, skills }) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Typography variant='h5' className={classes.cardTitle}>
        {title}
      </Typography>
      <div className={classes.skillsContainer}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            variant='outlined'
            className={classes.skillChip}
          />
        ))}
      </div>
    </div>
  );
}

export default function Profile() {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];

  const user = useSelector((state) =>
    state.people.list.find((person) => person._id === userId)
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const admin = currentUser?.role === 'admin';

  const loading = useSelector((state) => state.user.isFetching);

  const classes = useStyles();

  const roleLabel = user ? user.role.toUpperCase() : '';

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  return (
    <Content>
      {!user ? (
        <Typography variant='body1' color='error'>
          Invalid User
        </Typography>
      ) : (
        <>
          <div
            style={{
              height: '200px',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              filter: 'contrast(75%)',
              backgroundImage:
                'url(https://png.pngtree.com/background/20210709/original/pngtree-full-aesthetic-nebula-starry-sky-banner-background-picture-image_916071.jpg)'
            }}
          />
          <div className={classes.headerContainer}>
            <div className={classes.header}>
              <Avatar
                alt={user.name}
                src={user.photo}
                classes={{ root: classes.avatar, circle: classes.circle }}
              />
              <div>
                <Typography variant={'h5'}>{user.username}</Typography>
                <Typography
                  variant='caption'
                  color='textSecondary'
                  style={{ fontSize: '15px' }}
                >
                  @{user.displayName}
                </Typography>
              </div>
              <Chip
                variant={'outlined'}
                icon={<PersonIcon />}
                label={roleLabel}
              />

              <div className={classes.spacer} />
              {(admin || userId == currentUser?._id) && (
                <div className={classes.actionGroup}>
                  <PeopleDialog
                    data={user}
                    render={(open) => (
                      <Button
                        color='primary'
                        variant='contained'
                        startIcon={<EditIcon />}
                        onClick={open}
                      >
                        Edit
                      </Button>
                    )}
                  />
                  <DeleteDialog
                    ids={[user._id]}
                    entityName={'User'}
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
                </div>
              )}
            </div>
          </div>
          <div className={classes.summaryCards}>
            <SummaryCard title={'Posts'} value={user.materialCount} />
            <SummaryCard title={'Favorites'} value={user.favourites.length} />
            <SummaryCard title={'Reputation'} value={user.reputation} />
          </div>

          <BioCard title='About' content={user.about} />
          <div className={classes.summaryCards}>
            <BioCard title='Gender' content={user.gender} />
            <SkillsCard title='Skills' skills={user.technicalSkills} />
          </div>
          <div className={classes.card}>
            <Typography variant='h5' className={classes.cardTitle}>
              Links:
            </Typography>
            <div className={classes.emailSection}>
              <EmailIcon />
              <Typography variant='h6'>{user.email}</Typography>
            </div>
            <div>
              <Typography variant='h6' className={classes.linkTitle}>
                GitHub Link:
              </Typography>
              {user.githubLink ? (
                <a href={user.githubLink} className={classes.link}>
                  {user.githubLink}
                </a>
              ) : (
                <Typography variant='body1'>N/A</Typography>
              )}
            </div>
            <div>
              <Typography variant='h6' className={classes.linkTitle}>
                LinkedIn Link:
              </Typography>
              {user.linkedInLink ? (
                <a href={user.linkedInLink} className={classes.link}>
                  {user.linkedInLink}
                </a>
              ) : (
                <Typography variant='body1'>N/A</Typography>
              )}
            </div>
          </div>
          <Copyright />
        </>
      )}
    </Content>
  );
}
