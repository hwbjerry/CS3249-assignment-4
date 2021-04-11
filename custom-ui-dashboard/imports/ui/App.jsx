import React from 'react';
import {maxDatapointInTimeRange, timeRange, totalTimeRange} from '../api/Model/constant';
import GraphControlPanel from "./GraphControlPanel";
import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from "moment-timezone";

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
            visible: [true, true, true, true, true, true, true],
            date: [timeRange[0], timeRange[1]],
            duration: new ReactiveVar(totalTimeRange.duration()),
            range: [2, maxDatapointInTimeRange],
            sampleRate: new ReactiveVar(maxDatapointInTimeRange)
        };
    }

    render() {
        const sampleRate = this.state.sampleRate;
        const duration = this.state.duration;
        console.log(duration.get());
        console.log(totalTimeRange.duration());
        console.log(sampleRate.get());
        const totalSamples = Math.round(totalTimeRange.duration() / duration.get() * sampleRate.get());
        return (
            <div>
                <h1>Hello</h1>
                <div className="container">
                <GraphControlPanel minRange={this.state.range[0]} maxRange={this.state.range[1]} currentRange={this.state.range[1]}
                startDateTime={moment(new Date('2013-10-02T05:00:00'))} endDateTime={moment(new Date('2013-12-03T15:30:00'))}/>
                </div>

            </div>
        )
    }
}