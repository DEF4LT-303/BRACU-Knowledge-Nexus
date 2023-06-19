import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Content from '../Dashboard/Content';
import { selectPeople } from '../ReduxTable/peopleSlice';
import DeletePeopleDialog from './DeletePeopleDialog';
import PeopleDialog from './PeopleDialog';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: 'relative',
    height: '100px'
  },
  header: {
    display: 'flex',
    position: 'absolute',
    width: 'calc(100%)',
    top: '-70px',
    alignItems: 'flex-end',
    '& > *': {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`
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
  tripCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
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

export default function Driver({ id }) {
  const { driverId } = useParams();
  id = id ? id : driverId;
  const rows = useSelector(selectPeople);
  let driver = rows.find((row) => row.id === +id);
  if (!driver) {
    driver = { name: 'hello', id: 3, img: 'foo' };
  }
  const classes = useStyles();
  const loading = false;

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  return (
    <Content>
      <div
        style={{
          height: '200px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: 'contrast(75%)',
          backgroundImage: 'url(/img/wallpaper.jpeg)'
        }}
      />
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <Avatar
            alt={driver.name}
            src={driver.img}
            classes={{ root: classes.avatar, circle: classes.circle }}
          />
          <Typography variant={'h5'}>{driver.name}</Typography>
          <Chip variant={'outlined'} icon={<PersonIcon />} label='Student' />

          <div className={classes.spacer} />
          <div className={classes.actionGroup}>
            <PeopleDialog
              data={driver}
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
            <DeletePeopleDialog
              ids={[driver.id]}
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
        </div>
      </div>
      <div className={classes.summaryCards}>
        <SummaryCard title={'Posts'} value={3} />
        <SummaryCard title={'Favorites'} value={2} />
        <SummaryCard title={'Reputation'} value={4.32} />
      </div>
    </Content>
  );
}
