import React from 'react';
import DateTimeRangeController from "./DateTimeRangeController";
import moment from "moment-timezone";
import SampleRateRangeController from "./SampleRateRangeController";
import { TimeRange } from 'pondjs';
import { totalTimeRange } from '../api/Model/constant';
import * as PropTypes from "prop-types";


class GraphControlPanel extends React.Component {
    constructor(props) {
        super(props);

        // this.state= {
        //     sampleRateMin: this.props.sampleRateMin,
        //     sampleRateMax: this.props.sampleRateMax,
        //     sampleRate: this.props.sampleRate,
        //     duration: this.props.duration
        // };
        this.updateDateTimeRange = this.updateDateTimeRange.bind(this);
        this.updateSampleRate = this.updateSampleRate.bind(this);
        this.updateSampleRateMax = this.updateSampleRateMax.bind(this);
    }

    updateDateTimeRange(dateTimeRange) {
        const { durationHandler } = this.props;
        // this.setState({ dateTimeRange });
        durationHandler(dateTimeRange.duration());
        console.log("dt ok");
        this.updateMaxSamplePoints();

    }

    updateSampleRate(sampleRate) {
        const { sampleRateHandler } = this.props;
        // this.setState({ sampleRate });
        sampleRateHandler(sampleRate);
        console.log("sr ok");
    }

    updateSampleRateMax(sampleRateMax) {
        const { sampleRateMaxHandler } = this.props;
        // this.setState({ sampleRateMax });
        sampleRateMaxHandler(sampleRateMax);
        console.log("srm ok");

    }


    updateMaxSamplePoints = () => {
        //select from bucket generated based on room selected
        // for now make max 2555
        const x = 2555;
        this.updateSampleRateMax(x);
        // console.log(this.state.maxRange);
        // console.log(this.state.currentRange);

        if (x < this.props.sampleRate) {
            this.updateSampleRate(x);
        }
    }

    render() {
          return (
            <div>
                {this.props.sampleRate}
                <div className="container">
                    <DateTimeRangeController
                        dateTimeRange={this.props.duration}
                        dateTimeRangeHandler={this.updateDateTimeRange}
                    />
                </div>
                <div>
                    <SampleRateRangeController
                        sampleRateMin={this.props.sampleRateMin}
                        sampleRateMax={this.props.sampleRateMax}
                        sampleRate={this.props.sampleRate}
                        sampleRateHandler={this.updateSampleRate}
                    />
                </div>
            </div>
        )
    }
}

GraphControlPanel.propTypes = {
    //Data
    sampleRateMin: PropTypes.number.isRequired,
    sampleRateMax: PropTypes.number.isRequired,
    sampleRate: PropTypes.number.isRequired,
    duration: PropTypes.instanceOf(TimeRange).isRequired,

    //Handlers for active data
    sampleRateHandler: PropTypes.func.isRequired,
    sampleRateMaxHandler: PropTypes.func.isRequired,
    durationHandler: PropTypes.func.isRequired
}

export default GraphControlPanel;