import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import ListImage from "components/Image/ListImage.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
/*function convertDate(date) {
  const day = date.getDate(); // yields date
  const month = date.getMonth() + 1; // yields month (add one as '.getMonth()' is zero indexed)
  const year = date.getFullYear(); // yields year
  const hour = date.getHours(); // yields hours
  const minute = date.getMinutes(); // yields minutes
  const second = date.getSeconds(); // yields seconds

  // After this construct a string with the above results as below
  return (
    year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second
  );
}*/

class Dashboard extends React.Component {
  mapPeopleResponseToTable(peopleList) {
    const searchReason = ["Not searched", "Missing", "Criminal", "Other"];
    return peopleList.map(member => {
      return [
        <ListImage
          src={"https://www.w3schools.com/w3css/img_lights.jpg"}
          key={0}
        />,
        member.missingModel.firstName,
        member.missingModel.lastName,
        searchReason[member.missingModel.reason],
        member.dateAndTime
      ];
    });
  }

  mapCarsResponseToTable(carList) {
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

  state = {
    peopleFound24: 0,
    carsFound24: 0,
    peopleFound: 0,
    carsFound: 0,
    peopleList: [],
    carList: [],
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount() {
    fetch("https://epicentereu.azurewebsites.net/api/persons/timestamps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status !== 200) return;
        response.json().then(rjson => {
          this.setState({
            peopleList: rjson,
            peopleFound: rjson.length
          });
        });
      })
      .catch(x => console.log(x));
    fetch("https://epicentereu.azurewebsites.net/api/cars/timestamps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status !== 200) return;
        response.json().then(rjson => {
          this.setState({
            carList: rjson,
            carsFound: rjson.length
          });
        });
      })
      .catch(x => console.log(x));
    let date = new Date();
    date.setDate(date.getDate() - 1);
    fetch("https://epicentereu.azurewebsites.net/api/persons/timestamps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(date.toJSON())
    })
      .then(response => {
        if (response.status !== 200) return;
        response.json().then(rjson => {
          this.setState({
            peopleFound24: rjson.length
          });
        });
      })
      .catch(x => console.log(x));
    fetch("https://epicentereu.azurewebsites.net/api/cars/timestamps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(date.toJSON())
    })
      .then(response => {
        console.log(date.toJSON());
        if (response.status !== 200) return;
        response.json().then(rjson => {
          this.setState({
            carsFound24: rjson.length
          });
        });
      })
      .catch(x => console.log(x));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>People Found</p>
                <h3 className={classes.cardTitle}>{this.state.peopleFound}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  All Time
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>People Found</p>
                <h3 className={classes.cardTitle}>
                  {this.state.peopleFound24}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>directions_car</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Cars Found</p>
                <h3 className={classes.cardTitle}>{this.state.carsFound}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  All Time
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>directions_car</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Cars Found</p>
                <h3 className={classes.cardTitle}>{this.state.carsFound24}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Last Found People</h4>
                <p className={classes.cardCategoryWhite}>Last update: Now</p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="success"
                  tableHead={[
                    "Photo",
                    "First Name",
                    "Last Name",
                    "Search Reason",
                    "Time"
                  ]}
                  tableData={this.mapPeopleResponseToTable(
                    this.state.peopleList
                  ).slice(0, 10)}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Last Found Cars</h4>
                <p className={classes.cardCategoryWhite}>Last update: Now</p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={[
                    "Photo",
                    "Car Plate Number",
                    "First Name",
                    "Last Name",
                    "Search Reason",
                    "Time"
                  ]}
                  tableData={this.mapCarsResponseToTable(
                    this.state.carList
                  ).slice(0, 10)}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
