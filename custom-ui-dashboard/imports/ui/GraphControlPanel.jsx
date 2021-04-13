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

        this.updateDateTimeRange = this.updateDateTimeRange.bind(this);
        this.updateSampleRate = this.updateSampleRate.bind(this);
        this.updateSampleRateMax = this.updateSampleRateMax.bind(this);
    }

    updateDateTimeRange(dateTimeRange) {
        const { durationHandler } = this.props;
        durationHandler(dateTimeRange.duration());
        this.updateMaxSamplePoints();

    }

    updateSampleRate(sampleRate) {
        const { sampleRateHandler } = this.props;
        sampleRateHandler(sampleRate);
    }

    updateSampleRateMax(sampleRateMax) {
        const { sampleRateMaxHandler } = this.props;
        sampleRateMaxHandler(sampleRateMax);
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

    //TODO: remove later used for testing
    handleClick = () => {
        console.log('Click happened');
        console.log(this.props.sampleRate);
    }

    render() {
          return (
            <div>
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
                {/*TODO: remove later used for testing*/}
                {/*{this.props.sampleRateMax}*/}
                {/*<button onMouseUp={this.handleClick}>test</button>*/}
                {/*{this.props.sampleRate}*/}
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