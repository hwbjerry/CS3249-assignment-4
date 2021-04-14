import React from 'react';
import {sampleRange, timeRange, totalTimeRange, rooms} from '../api/Model/constant';
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
// import * as Session from "fibers";
import * as PropTypes from "prop-types";


class AppModel extends React.Component {
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
            avgs: [0, 0, 0, 0, 0, 0, 0],
        };

        this.updateDuration = this.updateDuration.bind(this);
        this.updateSampleRate = this.updateSampleRate.bind(this);
        this.updateSampleRateMax = this.updateSampleRateMax.bind(this);
        this.updateDateTimeRange = this.updateDateTimeRange.bind(this);
        this.toggleRooms = this.toggleRooms.bind(this);
    }


    //FloorPlan Panel Functions
    toggleRooms(e) {
       const {visibleHandler, visible} = this.props;
       visible[e] = !visible[e];
       visibleHandler(visible);
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
    updateDuration(duration) {
        const { durationHandler } = this.props;
        durationHandler(duration);
    }

    updateSampleRate(sampleRate) {
        const { sampleRateHandler } = this.props;
        sampleRateHandler(sampleRate);
    }

    updateSampleRateMax(sampleRateMax) {
        const { sampleRateMaxHandler } = this.props;
        sampleRateMaxHandler(sampleRateMax);
    }

    updateDateTimeRange(dateTimeRange) {
        console.log(dateTimeRange);
        const { dateTimeRangeHandler } = this.props;
        dateTimeRangeHandler(dateTimeRange);
    }

    hello() {
        console.log("hello");
    }


    render() {
        if(this.props.loading) {
            return (

                <div></div>
            );
        }
        else{
            const {sampleRate, duration, sampleRateMax, rawData} = this.props;
            const {visible, dateTimeRange} = this.props;
            return (
                <div>
                    {/*<h1>Hello</h1>*/}
                    <div className="container">
                    <GraphControlPanel sampleRateMin={sampleRange[0]} sampleRateMax={sampleRateMax}
                                       sampleRate={sampleRate} duration={duration}
                                       dateTimeRange={dateTimeRange} dateTimeRangeHandler={this.updateDateTimeRange}
                                       durationHandler={this.updateDuration}
                                       sampleRateHandler={this.updateSampleRate} sampleRateMaxHandler={this.updateSampleRateMax}
                    />
                    </div>
                    <div>
                        <Graph visibility={visible} dataset={rawData}
                                sampleRateMin={sampleRange[0]} sampleRateMax={sampleRateMax}
                                       sampleRate={sampleRate} duration={duration}
                                       dateTimeRange={dateTimeRange} dateTimeRangeHandler={this.updateDateTimeRange}
                                       durationHandler={this.updateDuration}
                                       sampleRateHandler={this.updateSampleRate} sampleRateMaxHandler={this.updateSampleRateMax}>
                        </Graph>
                    </div>

                    <div className={"main_floorplan"}>
                        <FloorPlan
                            visible={visible}
                            rooms={this.getRoomColour()}
                            onClick={(i) => this.toggleRooms(i)}
                        />
                    </div>

                </div>
            )
        }
    }
}

export default withTracker(({sampleRate, sampleRateMax, duration, visible, dateTimeRange}) => {
    // console.log(dateTimeRange);
    const start = dateTimeRange.begin().toString();
    const end = dateTimeRange.end().toString();
    // console.log(start);

    const handle = Meteor.subscribe('temperature_data', {
        sampleRate: sampleRate,
        duration: duration,
        visible: visible,
        dateTimeRangeBegin: start,
        dateTimeRangeEnd: end
    });
    // if(handle.ready()) {
    const rawData = temperature_data.find({}).fetch();
    const loading = rawData.length === 0;
    // }


    return {
        rawData: rawData,
        loading: loading,
        sampleRate: sampleRate,
        sampleRateMax: sampleRateMax,
        duration: duration,
        visible: visible,
        dateTimeRange: dateTimeRange
    };
})(AppModel);

AppModel.propTypes = {
    loading: PropTypes.bool.isRequired,
    rawData: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.number.isRequired,
          points: PropTypes.arrayOf(
            PropTypes.shape({
              timestamp: PropTypes.instanceOf(Date).isRequired,
              temperature: PropTypes.number.isRequired
            })
          ).isRequired
        })
    ),
    sampleRate: PropTypes.number.isRequired,
    sampleRateHandler: PropTypes.func.isRequired,
    sampleRateMax: PropTypes.number.isRequired,
    sampleRateMaxHandler: PropTypes.func.isRequired,
    durationHandler: PropTypes.func.isRequired,

    visible: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
    dateTimeRange: PropTypes.instanceOf(TimeRange).isRequired,
    visibleHandler: PropTypes.func.isRequired,
    dateTimeRangeHandler: PropTypes.func.isRequired
};

AppModel.defaultProps = {
    rawData: rooms.map(x =>({
        _id: x, points:[]
        })
    )
}