import React from 'react';
import {sampleRange, totalTimeRange, maxDecimalOfSevenBits} from '../api/Model/constant';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { debounce } from 'underscore';
import {TimeRange} from "pondjs";
import AppModel from "./AppModel";


export class App extends React.Component {
    constructor(props) {
        super(props);
        /**
         * @description: Sets the state of the client application
         * @type { , , }}
         * @type {visible: boolean[]} visible: Represents state of room button visible when true. Otherwise, false.
         * @type {date: [Date, Date]} date: represents start and end datetime
         * @type {duration} duration: The duration of the time range in milliseconds for date.
         * @type {range: [number, number]} range: Represents min and max of slider range
         * @type {sampleRate} sampleRate: Represents user selected rate.
         */
        this.state = {
            duration: totalTimeRange.duration(),
            sampleRate: sampleRange[1],
            sampleRateMax: sampleRange[1],
            visible: maxDecimalOfSevenBits,
            dateTimeRange: new TimeRange(totalTimeRange.begin(), totalTimeRange.end())
        };

        //These functions binds component updates from the child
        this.updateDuration = debounce(this.updateDuration, 50).bind(this);
        this.updateSampleRate = debounce(this.updateSampleRate, 50).bind(this);
        this.updateSampleRateMax = debounce(this.updateSampleRateMax, 50).bind(this);
        this.updateDateTimeRange = debounce(this.updateDateTimeRange, 50).bind(this);
        this.updateVisible = debounce(this.updateVisible, 500).bind(this);
    }


    //Callback Functions (to retrieve child modifications)
    updateDuration(newDuration) {
        const { duration } = this.state;
        if (newDuration !== duration) this.setState({duration: newDuration});
    }

    updateSampleRate(newSampleRate) {
        const { sampleRate } = this.state;
        if(newSampleRate !== sampleRate) this.setState({sampleRate: newSampleRate});
    }

    updateSampleRateMax(newSampleRateMax) {
        const { sampleRateMax } = this.state;
        if(newSampleRateMax !== sampleRateMax) this.setState({sampleRateMax: newSampleRateMax});
    }

    updateDateTimeRange(newDateTimeRange) {
        const { dateTimeRange } = this.state;
        if(newDateTimeRange !== dateTimeRange) this.setState({dateTimeRange: newDateTimeRange});
    }

    updateVisible(newVisible) {
       const {visible} = this.state;
       this.setState({visible: newVisible});

       const { sampleRate, duration } = this.state;
       this.setState({sampleRate:sampleRate});
       this.setState({duration: duration});
    }

    render() {
        const { sampleRate, sampleRateMax, duration } = this.state;
        const { visible, dateTimeRange } = this.state;
    return (
        <AppModel sampleRate={sampleRate} sampleRateMax={sampleRateMax} duration={duration}
            sampleRateHandler={this.updateSampleRate}
            sampleRateMaxHandler={this.updateSampleRateMax}
            durationHandler={this.updateDuration}
            visible={visible} visibleHandler={this.updateVisible}
            dateTimeRange={dateTimeRange} dateTimeRangeHandler={this.updateDateTimeRange}
        />
        );
    }
}
