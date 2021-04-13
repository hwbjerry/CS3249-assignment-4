import React from 'react';
import {sampleRange, timeRange, totalTimeRange} from '../api/Model/constant';
import GraphControlPanel from "./GraphControlPanel";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { debounce } from 'underscore';
import {TimeRange} from "pondjs";


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
            duration: new ReactiveVar(new TimeRange(totalTimeRange.begin(), totalTimeRange.end())),
            range: [sampleRange[0], sampleRange[1]],
            sampleRate: new ReactiveVar(sampleRange[1]),
            sampleRateMax: new ReactiveVar(sampleRange[1])
        };

        // this.updateSampleRate = debounce(this.updateSampleRate, 100).bind(this);
        this.updateDuration = debounce(this.updateDuration, 500).bind(this);
        this.updateSampleRate = debounce(this.updateSampleRate, 500).bind(this);
        this.updateSampleRateMax = debounce(this.updateSampleRateMax, 500).bind(this);

    }

    updateDuration(newDuration) {
        const { duration } = this.state;
        if (newDuration !== duration) {
          this.state.duration.set(newDuration);
        }
    }

    updateSampleRate(newSampleRate) {
        const {sampleRate} = this.state;
        console.log(newSampleRate);

        // if (newSampleRate !== sampleRate) {
        //     console.log("new sr?");

            this.state.sampleRate.set(newSampleRate);
            console.log('sampleRate.get(): ' + this.state.sampleRate.get());
        //     console.log("My new value: " + this.state.sampleRate.get());
        // }
    }

    updateSampleRateMax(newSampleRateMax) {
        const {sampleRateMax} = this.state;
        console.log(newSampleRateMax);
        if (newSampleRateMax !== sampleRateMax) {
            this.state.sampleRateMax.set(newSampleRateMax);
        }
    }

    render() {
        const {sampleRate, duration, sampleRateMax} = this.state;
        // console.log(duration.get());
        // console.log(totalTimeRange.duration());
        // console.log(sampleRate.get());
        const totalSamples = Math.round(totalTimeRange.duration() / duration.get() * sampleRate.get());
        return (
            <div>
                <h1>Hello</h1>
                <div className="container">
                <GraphControlPanel sampleRateMin={this.state.range[0]} sampleRateMax={sampleRateMax.get()}
                                   sampleRate={sampleRate.get()} duration={duration.get()}
                                   durationHandler={this.updateDuration} sampleRateHandler={this.updateSampleRate} sampleRateMaxHandler={this.updateSampleRateMax}
                />
                </div>

            </div>
        )
    }
}