import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../Redux/apiCalls';

export default function DeletePeopleDialog({ ids, render, onSave }) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    onSave && onSave();

    for (const id of ids) {
      try {
        await deleteUser(id, dispatch);
      } catch (err) {
        console.log(err);
      }
    }

    handleClose();
  };

  return (
    <div>
      {render(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Delete Users</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {ids.length} User
          {ids.length > 1 && 's'}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
