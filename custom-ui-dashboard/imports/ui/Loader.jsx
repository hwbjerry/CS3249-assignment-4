import React from "react";
import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";
import style from '../../client/main.css';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {

    return (
      <div>
        <h3 className={style.awesomeComponent}>Loading temperature ...</h3>
        <PacmanLoader css={override} size={30} margin={2} color={"#36D7B7"} loading={this.state.loading} speedMultiplier={1.5} />
      </div>
    );
  }
}

export default Loader;