import React from 'react';
import {sampleRange, timeRange, totalTimeRange} from '../api/Model/constant';
import GraphControlPanel from "./GraphControlPanel";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { debounce } from 'underscore';
import {TimeRange} from "pondjs";
import FloorPlan from './FloorPlan'
import Graph from "./Graph";
import { withTracker } from 'meteor/react-meteor-data';
import LoadingScreen from 'react-loading-screen';
import temperature_data from "../api/collections/TemperatureModel";
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
            visible: [true, true, true, true, true, true, true],
            dateTimeRange: new TimeRange(totalTimeRange.begin(), totalTimeRange.end())
        };


        this.updateDuration = debounce(this.updateDuration, 50).bind(this);
        this.updateSampleRate = debounce(this.updateSampleRate, 50).bind(this);
        this.updateSampleRateMax = debounce(this.updateSampleRateMax, 50).bind(this);
        this.updateDateTimeRange = debounce(this.updateDateTimeRange, 50).bind(this);
        this.toggleRooms = debounce(this.toggleRooms, 50).bind(this);
    }


    //Control Panel Functions
    updateDuration(newDuration) {
        const { duration } = this.state;
        if (newDuration !== duration) this.setState({duration: newDuration});
    }

    updateSampleRate(newSampleRate) {
        const { sampleRate } = this.state;
        if(newSampleRate !== sampleRate)this.setState({sampleRate: newSampleRate});
    }

    updateSampleRateMax(newSampleRateMax) {
        const { sampleRateMax } = this.state;
        if(newSampleRateMax !== sampleRateMax) this.setState({sampleRateMax: newSampleRateMax});
    }

    updateDateTimeRange(newDateTimeRange) {
        console.log(newDateTimeRange);
        const { dateTimeRange } = this.state;
        if(newDateTimeRange !== dateTimeRange) this.setState({dateTimeRange: newDateTimeRange});
    }

    toggleRooms(newVisible) {
       const {visible} = this.state;
       if(visible !== newVisible) this.setState({visible: visible,});
    }

    render() {
        const { sampleRate, sampleRateMax, duration } = this.state;
        const { visible, dateTimeRange } = this.state;
    return (
        <AppModel sampleRate={sampleRate} sampleRateMax={sampleRateMax} duration={duration}
            sampleRateHandler={this.updateSampleRate}
            sampleRateMaxHandler={this.updateSampleRateMax}
            durationHandler={this.updateDuration}
            visible={visible} visibleHandler={this.toggleRooms}
            dateTimeRange={dateTimeRange} dateTimeRangeHandler={this.updateDateTimeRange}
        />
        );
    }
}
