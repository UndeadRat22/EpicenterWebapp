import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

class DeleteItemButton extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteConfirm = () => {
    this.handleClose();
    this.props.deleteConfirmCallback === undefined
      ? () => {}
      : this.props.deleteConfirmCallback();
  };

  render() {
    return (
      <span>
        <IconButton onClick={this.handleClickOpen}>
          <ClearIcon style={{ color: "red" }} />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Remove " + this.props.toRemove}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"You can't undo this action! Are you sure?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleDeleteConfirm}
              color="primary"
              autoFocus
            >
              Yes
              <Button onClick={this.handleClose} color="primary">
                No
              </Button>
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}

export default DeleteItemButton;
