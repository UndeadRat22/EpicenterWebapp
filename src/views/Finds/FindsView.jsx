import React from "react";
import FindsTables from "components/CustomTables/FindsTables.jsx";

class FindsView extends React.Component {
  render() {
    return <FindsTables color1={"success"} color2={"warning"} limit={-1} />;
  }
}

export default FindsView;
