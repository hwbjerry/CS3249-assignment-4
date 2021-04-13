import React from 'react';
import {sampleRange, timeRange, totalTimeRange} from '../api/Model/constant';
import GraphControlPanel from "./GraphControlPanel";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { debounce } from 'underscore';
import {TimeRange} from "pondjs";
import FloorPlan from './FloorPlan'


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
            avgs: [0, 0, 0, 0, 0, 0, 0],
            date: [timeRange[0], timeRange[1]],
            duration: new TimeRange(totalTimeRange.begin(), totalTimeRange.end()),
            range: [sampleRange[0], sampleRange[1]],
            sampleRate: sampleRange[1],
            sampleRateMax: sampleRange[1]
        };

        // this.updateSampleRate = debounce(this.updateSampleRate, 100).bind(this);
        this.updateDuration = debounce(this.updateDuration, 500).bind(this);
        this.updateSampleRate = debounce(this.updateSampleRate, 500).bind(this);
        this.updateSampleRateMax = debounce(this.updateSampleRateMax, 500).bind(this);

    }

    //FloorPlan Panel Functions
    toggleRooms(e) {
        // visibility of the various rooms so slice
       const visible = this.state.visible.slice();
       visible[e] = !this.state.visible[e];
       this.setState({
           visible: visible,
       });
    }

    //Colour of the room depends on the
    getRoomColour() {
        let values = new Array();
        const avgs = this.state.avgs.slice();
        for (var i = 0; i < avgs.length; i ++) {
            values[i] = "hsla(" + 220 + ",100%,70%,"+ 0.3 + ")";
        }
        return values;
    }

    //Control Panel Functions
    updateDuration(newDuration) {
        const { duration } = this.state;
        if (newDuration !== duration) {this.state.duration.set(newDuration);}
    }

    updateSampleRate(newSampleRate) {
        const { sampleRate } = this.state;
        if(newSampleRate !== sampleRate)this.setState({sampleRate: newSampleRate});
    }

    updateSampleRateMax(newSampleRateMax) {
        const { sampleRateMax } = this.state;
        if(newSampleRateMax !== sampleRateMax) this.setState({sampleRateMax: newSampleRateMax});
    }

    render() {
        const {sampleRate, duration, sampleRateMax} = this.state;
        // console.log(duration.get());
        // console.log(totalTimeRange.duration());
        // console.log(sampleRate.get());
        // const totalSamples = Math.round(totalTimeRange.duration() / duration.get() * sampleRate.get());
        return (
            <div>
                <h1>Hello</h1>
                <div className="container">
                <GraphControlPanel sampleRateMin={this.state.range[0]} sampleRateMax={sampleRateMax}
                                   sampleRate={sampleRate} duration={duration}
                                   durationHandler={this.updateDuration} sampleRateHandler={this.updateSampleRate} sampleRateMaxHandler={this.updateSampleRateMax}
                />
                </div>

                <div className={"main_floorplan"}>
                    <FloorPlan
                        visible={this.state.visible}
                        rooms={this.getRoomColour()}
                        onClick={(i) => this.toggleRooms(i)}
                    />
                </div>

            </div>
        )
    }
}