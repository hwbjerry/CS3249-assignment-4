import React from 'react';
import DateTimeRangeController from "./DateTimeRangeController";
import moment from "moment-timezone";
import SampleRateRangeController from "./SampleRateRangeController";


class GraphControlPanel extends React.Component {
    constructor(props) {
        super(props);
        let start = moment(new Date('2013-10-02T05:00:00'));
        let end = moment(new Date('2013-12-03T15:30:00'));
        this.state= {
            minRange: this.props.minRange,
            maxRange: this.props.maxRange,
            currentRange: this.props.currentRange,
            start: start,
            end: end
        };
    }

    handleCurrentChange = (event) =>  {
        // console.log(event.target.value);
        this.setState({currentRange: event.target.value});
        // this.service.send(this.state.mode);
    }

    render() {

          return (
            <div>
                <div className="container">
                    <DateTimeRangeController start={this.state.start} end={this.state.end}/>
                </div>
                <div>
                    <SampleRateRangeController
                        minRange={this.state.minRange}
                        maxRange={this.state.maxRange}
                        currentRange={this.state.currentRange}
                        onChangeValue={this.handleCurrentChange}
                    />
                </div>
            </div>
        )
    }
}

export default GraphControlPanel;