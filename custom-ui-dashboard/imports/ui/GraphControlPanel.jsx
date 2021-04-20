import React from 'react';
import DateTimeRangeController from "./DateTimeRangeController";
import moment from "moment-timezone";
import SampleRateRangeController from "./SampleRateRangeController";
import { TimeRange } from 'pondjs';
import {sampleRange, totalTimeRange} from '../api/Model/constant';
import * as PropTypes from "prop-types";


class GraphControlPanel extends React.Component {
    constructor(props) {
        super(props);

        //These functions binds component updates from the child
        this.updateDateTimeRange = this.updateDateTimeRange.bind(this);
        this.updateSampleRate = this.updateSampleRate.bind(this);
        this.updateSampleRateMax = this.updateSampleRateMax.bind(this);
    }

    //Callback Functions (to retrieve child modifications)
    updateDateTimeRange(dateTimeRange) {
        const { durationHandler } = this.props;
        durationHandler(dateTimeRange.duration());

        const { dateTimeRangeHandler } = this.props;
        dateTimeRangeHandler(dateTimeRange);
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
        const { dateTimeRange } = this.props;

        const y = (Math.round( dateTimeRange.duration() / totalTimeRange.duration() * sampleRange[1]));
        const x = (y < 0) ? 2 : Math.round( dateTimeRange.duration()/totalTimeRange.duration() * sampleRange[1]);

        this.updateSampleRateMax(x);
        if (x < this.props.sampleRate) {
            this.updateSampleRate(x);
        }
    }


    render() {
            const { sampleRateMin, sampleRateMax, sampleRate} = this.props;
            const {dateTimeRange} = this.props;
          return (
            <div className="controlPanelContainer">
                <DateTimeRangeController
                    dateTimeRange={dateTimeRange}
                    dateTimeRangeHandler={this.updateDateTimeRange}
                />
                 <SampleRateRangeController
                    sampleRateMin={sampleRateMin}
                    sampleRateMax={sampleRateMax}
                    sampleRate={sampleRate}
                    sampleRateHandler={this.updateSampleRate}
                />
            </div>
        )
    }
}

GraphControlPanel.propTypes = {
    //Data
    sampleRateMin: PropTypes.number.isRequired,
    sampleRateMax: PropTypes.number.isRequired,
    sampleRate: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    dateTimeRange: PropTypes.instanceOf(TimeRange).isRequired,

    //Handlers for active data
    sampleRateHandler: PropTypes.func.isRequired,
    sampleRateMaxHandler: PropTypes.func.isRequired,
    durationHandler: PropTypes.func.isRequired,
    dateTimeRangeHandler: PropTypes.func.isRequired
}

export default GraphControlPanel;