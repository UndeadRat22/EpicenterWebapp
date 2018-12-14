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
    carList: []
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

  mapResponseToTable(list, cars, time) {
    const searchReason = ["Not searched", "Missing", "Criminal", "Other"];
    let result = list.map(member => {
      let arr = [
        <ListImage
          src={`data:image/png;base64, ${member.missingModel.baseImage}`}
          key={0}
        />,
        member.missingModel.message,
        member.missingModel.firstName,
        member.missingModel.lastName,
        searchReason[member.missingModel.reason],
        member.dateAndTime
      ];
      if (cars === false) {
        arr.splice(1, 1);
      }
      if (time === false) {
        cars.splice(arr.length - 1, 1);
      }
      return arr;
    });
    if (this.props.limit === -1) {
      return result;
    }
    return result.splice(0, this.props.limit);
  }

  componentDidMount() {
    fetch(this.props.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status !== 200) return;
        response.json().then(rjson => {
          this.props.responseLenghtCallback(rjson.length);
          this.setState({ carList: rjson });
          if (this.props.timestamps) {
            this.countLast24h(this.state.carList);
          }
        });
      })
      .catch(x => console.log(x));
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
    }
    return (
      <GridItem xs={12} sm={12} md={this.props.width}>
        <Card>
          <CardHeader color={this.props.color}>
            <h4 className={classes.cardTitleWhite}>
              {this.props.carTable ? "Cars" : "People"}
            </h4>
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
