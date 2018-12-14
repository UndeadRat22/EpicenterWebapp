import React from "react";
import FindsTables from "components/CustomTables/FindsTables.jsx";

class FindsView extends React.Component {
  state = {
    carsFound: 0,
    peopleFound: 0,
    carsFound24: 0,
    peopleFound24: 0
  };
  render() {
    return <FindsTables color1={"primary"} color2={"primary"} limit={-1} />;
  }
}

export default FindsView;
