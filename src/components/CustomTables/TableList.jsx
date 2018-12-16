import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ListImage from "../../components/Image/ListImage";

import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteItemButton from "../CustomButtons/DeleteItemButton";
import EditItemButton from "../CustomButtons/EditItemButton";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TableList extends React.Component {
  state = {
    carList: [],
    imageList: []
  };

  countLast24h(list) {
    let time = new Date(Date.now());
    time.setTime(time.getTime() - 24 * 60 * 60 * 1000);
    for (let i = 0; i < list.length; i++) {
      if (new Date(list[i].dateAndTime) < time) {
        this.props.last24hrsCallback(i);
        return;
      }
    }
    this.props.last24hrsCallback(list.length);
  }
  /*src={`data:image/png;base64, ${member.missingModel.baseImage}`}*/
  mapResponseToTable(list, cars, time) {
    const searchReason = ["Not searched", "Missing", "Criminal", "Other"];
    let result = list.map(member => {
      let arr = [];
      if (member.missingModel !== undefined) {
        arr = [
          <ListImage
            src={`data:image/png;base64, ${member.baseImage}`}
            key={0}
          />,
          member.missingModel.message,
          member.missingModel.firstName,
          member.missingModel.lastName,
          searchReason[member.missingModel.reason],
          member.dateAndTime
        ];
      } else {
        arr = [
          <ListImage
            src={`data:image/png;base64, ${member.baseImage}`}
            key={0}
          />,
          member.numberPlate,
          member.firstName,
          member.lastName,
          searchReason[member.reason],
          <div key={5} numeric={true}>
            <EditItemButton
              car={cars}
              toEdit={
                cars
                  ? member.numberPlate
                  : member.firstName + " " + member.lastName
              }
            />
            <DeleteItemButton
              toRemove={
                cars
                  ? member.numberPlate
                  : member.firstName + " " + member.lastName
              }
            />
          </div>
        ];
      }
      if (cars === false) {
        arr.splice(1, 1);
      }
      if (time === false && member.missingModel !== undefined) {
        cars.splice(arr.length - 1, 1);
      }
      return arr;
    });
    if (this.props.limit === -1) {
      return result;
    }
    return result.splice(0, this.props.limit);
  }
  allMainRequests = fetch(this.props.url, {
    method: this.props.http,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    if (response.status === 200) return Promise.resolve(response.json());
    return Promise.reject(response.json());
  });

  baseImagesRequest = fetch(
    this.props.carTable
      ? "https://epicentereu.azurewebsites.net/api/cars/baseimages"
      : "https://epicentereu.azurewebsites.net/api/persons/baseimages",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then(response => {
    if (response.status === 200) return Promise.resolve(response.json());
    return Promise.reject(response.json());
  });

  componentDidMount() {
    Promise.all([this.allMainRequests, this.baseImagesRequest]).then(
      responseBody => {
        const mapper = {};
        //sucreatina mapperi is id -> img
        responseBody[1].forEach(
          missingModel => (mapper[missingModel.id] = missingModel.baseImage)
        );
        const responseList = responseBody[0].map(response => ({
          ...response,
          baseImage:
            response.missingModel == undefined
              ? mapper[response.id]
              : mapper[response.missingModel.id]
        }));
        this.setState({ carList: responseList });
        this.props.responseLenghtCallback(responseList.length);
        if (this.props.timestamps) {
          this.countLast24h(this.state.carList);
        }
      }
    );
  }
  render() {
    const { classes } = this.props;
    let tableHeader = ["Photo", "First Name", "Last Name", "Search Reason"];
    if (this.props.carTable) {
      tableHeader = [
        "Photo",
        "Car Number Plate",
        "First Name",
        "Last Name",
        "Search Reason"
      ];
    }
    if (this.props.timestamps) {
      tableHeader.push("Time");
    } else {
      tableHeader.push(<div numeric={true} />);
    }
    return (
      <GridItem xs={12} sm={12} md={this.props.width}>
        <Card>
          <CardHeader color={this.props.color}>
            <h4 className={classes.cardTitleWhite}>
              {this.props.carTable ? "Cars" : "People"}
            </h4>
            {this.state.carList.length > 0 ? (
              <p className={classes.cardCategoryWhite}>Last update: Now</p>
            ) : (
              <p className={classes.cardCategoryWhite}>Getting data...</p>
            )}
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor={this.props.color}
              tableHead={tableHeader}
              tableData={this.mapResponseToTable(
                this.state.carList,
                this.props.carTable,
                this.props.timestamps
              )}
            />
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(styles)(TableList);
