import React from 'react';
import DateTimeRangeController from "./DateTimeRangeController";
import moment from "moment-timezone";
import SampleRateRangeController from "./SampleRateRangeController";


class GraphControlPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            minRange: this.props.minRange,
            maxRange: this.props.maxRange,
            currentRange: this.props.currentRange,
            startDateTime: this.props.startDateTime,
            endDateTime: this.props.endDateTime
        };
    }

    handleCurrentChange = (event) =>  {
        // console.log(event.target.value);
        this.setState({currentRange: event.target.value});
        // this.service.send(this.state.mode);
    }

    handleStartDateTimeChange = (event) =>  {
        this.setState({startDateTime: moment(new Date(event.target.value))});
        console.log(this.state.startDateTime);
        console.log('updated start');
    }

    handleEndDateTimeChange = (event) =>  {
        this.setState({endDateTime: moment(new Date(event.target.value))});
        console.log(this.state.endDateTime);
        console.log('updated end');
        this.updateMaxSamplePoints();
    }

    updateMaxSamplePoints = () => {
        //select from bucket generated based on room selected
        // for now make max 2555
        var x = 2555;
        this.setState({maxRange: x});
        console.log(this.state.maxRange);
        console.log(this.state.currentRange);
        if (x < this.state.currentRange) {
            this.setState({currentRange: x});
        }
    }

    render() {

          return (
            <div>
                <div className="container">
                    <DateTimeRangeController
                        startDateTime={this.state.startDateTime}
                        endDateTime={this.state.endDateTime}
                        onStartDateChangeValue={this.handleStartDateTimeChange}
                        onEndDateChangeValue={this.handleEndDateTimeChange}
                    />
                </div>
                <div>
                    <SampleRateRangeController
                        id={SampleRateRangeController}
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