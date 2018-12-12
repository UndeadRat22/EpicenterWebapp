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

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
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
                <h3 className={classes.cardTitle}>500000</h3>
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
                <h3 className={classes.cardTitle}>500000</h3>
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
                <h3 className={classes.cardTitle}>90000</h3>
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
                <h3 className={classes.cardTitle}>90000</h3>
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
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={[
                    "First Name",
                    "Last Name",
                    "Search Reason",
                    "Time"
                  ]}
                  tableData={[
                    ["Nigger", "Faggot", "Criminal", "2018-09-01"],
                    ["Nigger", "Faggot", "Criminal", "2018-09-01"],
                    ["Nigger", "Faggot", "Criminal", "2018-09-01"],
                    ["Nigger", "Faggot", "Criminal", "2018-09-01"],
                    ["Nigger", "Faggot", "Criminal", "2018-09-01"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Last Found Cars</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="success"
                  tableHead={[
                    "Car Plate Number",
                    "First Name",
                    "Last Name",
                    "Search Reason",
                    "Time"
                  ]}
                  tableData={[
                    ["699XXX", "Nigger", "got", "Criminal", "2018-09-01"],
                    ["699XXX", "Nigger", "Faggot", "Criminal", "2018-09-01"],
                    ["699XXX", "Nigger", "Faggot", "Criminal", "2018-09-01"],
                    ["699XXX", "Nigger", "Faggot", "Criminal", "2018-09-01"],
                    ["699XXX", "Nigger", "Faggot", "Criminal", "2018-09-01"]
                  ]}
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
