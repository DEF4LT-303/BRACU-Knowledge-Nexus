import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Content from '../Dashboard/Content';
import DeletePeopleDialog from '../People/DeletePeopleDialog';
import PeopleDialog from '../People/PeopleDialog';
import { SummaryCard } from '../People/Profile';
import { getUsers } from '../Redux/apiCalls';
import { remove, selectLoading, selectPeople } from './peopleSlice';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    _id: 'avatar',
    numeric: false,
    disablePadding: true,
    label: ''
  },
  {
    _id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  { _id: '_id', numeric: true, disablePadding: false, label: 'ID' },
  { _id: 'role', numeric: true, disablePadding: false, label: 'Role' }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell._id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell._id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell._id}
              direction={orderBy === headCell._id ? order : 'asc'}
              onClick={createSortHandler(headCell._id)}
            >
              {headCell.label}
              {orderBy === headCell._id ? (
                <span className={classes.visuallyH_idden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    w_idth: '100%'
  },
  paper: {
    w_idth: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minW_idth: 750
  },
  visuallyH_idden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'h_idden',
    padding: 0,
    position: 'absolute',
    top: 20,
    w_idth: 1
  },
  grow: {
    flexGrow: 1
  },
  deleteButton: {
    marginLeft: theme.spacing(1)
  }
}));

export default function People() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const rows = useSelector(selectPeople);
  const loading = useSelector(selectLoading);
  const error = false;
  // todo with snacks
  const [snackOpen, setSnackOpen] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  let history = useHistory();

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  if (error) return `Error! ${error.message}`;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const selectTableRow = (_id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <Content>
      <Snackbar open={snackOpen} autoH_ideDuration={2000} onClose={snackClose}>
        <Alert onClose={snackClose} severity='success'>
          {snackOpen}
        </Alert>
      </Snackbar>
      <div className={classes.root}>
        <Toolbar>
          <div edge='start' className={classes.grow} />
          <PeopleDialog
            edge='end'
            onSave={() => {
              setSnackOpen('Person added');
            }}
            render={(open) => (
              <Button
                edge='end'
                color='primary'
                variant='contained'
                startIcon={<AddIcon />}
                onClick={open}
              >
                Add Person
              </Button>
            )}
          />
          {selected.length > 0 && (
            <Tooltip title={'Delete'}>
              <DeletePeopleDialog
                _ids={selected}
                onSave={() => {
                  dispatch(remove(selected));

                  setSnackOpen(
                    `${selected.length} Driver${
                      selected.length > 1 ? 's' : ''
                    } Deleted`
                  );
                  setSelected([]);
                }}
                render={(open) => (
                  <Button
                    className={classes.deleteButton}
                    variant='contained'
                    color='secondary'
                    startIcon={<DeleteIcon />}
                    onClick={open}
                  >
                    {' '}
                    Delete {selected.length} selected
                  </Button>
                )}
              />
            </Tooltip>
          )}
        </Toolbar>
        <SummaryCard
          title={'All Users'}
          value={
            <>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby='tableTitle'
                  size={'small'}
                  aria-label='enhanced table'
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row._id);
                        const label_Id = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role='checkbox'
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            onClick={(e) => {
                              if (
                                e.target.type === 'checkbox' ||
                                e.target.className.indexOf('Checkbox') > 0
                              ) {
                                return;
                              }
                              history.push(`/people/${row._id}`);
                            }}
                            key={`person-${row._id}`}
                            selected={isItemSelected}
                            style={{ cursor: 'pointer' }}
                          >
                            <TableCell
                              padding='checkbox'
                              onClick={(e) => {
                                selectTableRow(row._id);
                              }}
                            >
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': label_Id }}
                                onChange={(e) => {
                                  selectTableRow(row._id);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Avatar alt={row.username} src={row.img} />
                            </TableCell>
                            <TableCell
                              component='th'
                              _id={label_Id}
                              scope='row'
                              padding='none'
                            >
                              {row.username}
                            </TableCell>
                            <TableCell align='right'>{row._id}</TableCell>
                            <TableCell align='right'>{row.role}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          }
        />
      </div>
    </Content>
  );
}
