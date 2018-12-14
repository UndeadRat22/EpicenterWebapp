import React from "react";
import TableList from "components/CustomTables/TableList.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

class FindsTables extends React.Component {
  state = {
    carsFound: 0,
    peopleFound: 0,
    carsFound24: 0,
    peopleFound24: 0
  };
  render() {
    return (
      <GridContainer>
        <TableList
          width={6}
          carTable={false}
          timestamps={true}
          url={"https://epicentereu.azurewebsites.net/api/persons/timestamps"}
          responseLenghtCallback={count =>
            this.setState({ peopleFound: count })
          }
          last24hrsCallback={count => this.setState({ peopleFound24: count })}
          limit={this.props.limit}
          color={this.props.color1}
        />
        <TableList
          width={6}
          carTable={true}
          timestamps={true}
          url={"https://epicentereu.azurewebsites.net/api/cars/timestamps"}
          responseLenghtCallback={length =>
            this.setState({ carsFound: length })
          }
          last24hrsCallback={count => this.setState({ carsFound24: count })}
          limit={this.props.limit}
          color={this.props.color2}
        />
      </GridContainer>
    );
  }
}

export default FindsTables;
