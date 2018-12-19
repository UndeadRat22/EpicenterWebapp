import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import MenuInput from "../CustomInput/MenuInput";

class EditItemButton extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEditConfirm = () => {
    this.handleClose();
    this.props.deleteEditCallback === undefined
      ? () => {}
      : this.props.deleteEditCallback();
  };

  render() {
    return (
      <span>
        <IconButton onClick={this.handleClickOpen}>
          <EditIcon color={"primary"} />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Edit " + this.props.toEdit}
          </DialogTitle>
          <DialogContent>
            <GridContainer>
              {this.props.car ? (
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Number Plate"
                    id="number-plate"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              ) : null}
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="First Name"
                  id="first-name"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Last Name"
                  id="last-name"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <p2>Search Reason</p2>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <MenuInput />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Image"
                  id="base-image"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{type: "file"}}
                />
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleEditConfirm} color="primary" autoFocus>
              Submit
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}

export default EditItemButton;
