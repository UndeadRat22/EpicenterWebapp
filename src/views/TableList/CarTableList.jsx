import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
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

class CarTableList extends React.Component {
  mapResponseToTable(carList) {
    const searchReason = ["Not searched", "Missing", "Criminal", "Other"];
    return carList.map(member => {
      return [
        <ListImage
          src={"https://www.w3schools.com/w3css/img_lights.jpg"}
          key={0}
        />,
        member.missingModel.message,
        member.missingModel.firstName,
        member.missingModel.lastName,
        searchReason[member.missingModel.reason],
        member.dateAndTime
      ];
    });
  }

  state = { carList: [] };
  componentDidMount() {
    fetch("https://epicentereu.azurewebsites.net/api/cars/timestamps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status !== 200) return;
        response.json().then(rjson => {
          console.log(":-))))))))))))");
          this.setState({ carList: rjson });
        });
      })
      .catch(x => console.log(x));
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Found Car Table</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Photo",
                  "Car Plate Number",
                  "First Name",
                  "Last Name",
                  "Search Reason",
                  "Time"
                ]}
                tableData={this.mapResponseToTable(this.state.carList)}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(CarTableList);
