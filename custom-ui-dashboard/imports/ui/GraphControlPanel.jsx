import React from 'react';
import DateTimeRangeController from "./DateTimeRangeController";


class GraphControlPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

          return (
            <div>
                <div className="container">
                    <DateTimeRangeController />
                </div>
                <div>
                    <input type="range"/>
                    <label>{" "}Samples</label>
                </div>
            </div>
        )
    }
}

export default GraphControlPanel;