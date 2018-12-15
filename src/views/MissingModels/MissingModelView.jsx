import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import TableList from "components/CustomTables/TableList.jsx";

class MissingModelView extends React.Component {
  render() {
    return (
      <GridContainer>
        <TableList
          width={6}
          carTable={false}
          timestamps={false}
          url={"https://epicentereu.azurewebsites.net/api/missing/persons/"}
          responseLenghtCallback={count => {}}
          last24hrsCallback={count => {}}
          limit={-1}
          color={"success"}
          http={"GET"}
        />
        <TableList
          width={6}
          carTable={true}
          timestamps={false}
          url={"https://epicentereu.azurewebsites.net/api/missing/cars/"}
          responseLenghtCallback={count => {}}
          last24hrsCallback={count => {}}
          limit={-1}
          color={"warning"}
          http={"GET"}
        />
      </GridContainer>
    );
  }
}

export default MissingModelView;
