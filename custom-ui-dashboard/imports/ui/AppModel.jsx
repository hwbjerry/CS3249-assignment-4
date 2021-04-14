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
            visible: [true, true, true, true, true, true, true],
            avgs: [0, 0, 0, 0, 0, 0, 0],
            date: [timeRange[0], timeRange[1]],
            duration: this.props.duration,
            range: [sampleRange[0], sampleRange[1]],
        };

        this.updateDuration = this.updateDuration.bind(this);
        this.updateSampleRate = this.updateSampleRate.bind(this);
        this.updateSampleRateMax = this.updateSampleRateMax.bind(this);
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


    render() {
        if(this.props.loading) {
            return (

                <div></div>
            );
        }
        else{
            const {sampleRate, duration, sampleRateMax} = this.props;

            return (
                <div>
                    {/*<h1>Hello</h1>*/}
                    <div className="container">
                    <GraphControlPanel sampleRateMin={this.state.range[0]} sampleRateMax={sampleRateMax}
                                       sampleRate={sampleRate} duration={duration}
                                       durationHandler={this.updateDuration}
                                       sampleRateHandler={this.updateSampleRate} sampleRateMaxHandler={this.updateSampleRateMax}
                    />
                    </div>
                    <div>
                        <Graph visibility={this.state.visible} dataset={this.props.rawData}>
                        </Graph>
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
}

export default withTracker(({sampleRate, sampleRateMax, duration}) => {
    // console.log(duration);
    // console.log(sampleRate);
    // console.log(sampleRateMax);
    const handle = Meteor.subscribe('temperature_data', {
        sampleRate: sampleRate,
        duration: duration
    });
    // if(handle.ready()) {
    const rawData = temperature_data.find({}).fetch();
    const loading = rawData.length !== 7;
    // }

    console.log(loading);
    console.log(rawData);
    return {
        rawData: rawData,
        loading: loading,
        sampleRate: sampleRate,
        sampleRateMax: sampleRateMax,
        duration: duration
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
    durationHandler: PropTypes.func.isRequired
};

AppModel.defaultProps = {
    rawData: rooms.map(x =>({
        _id: x, points:[]
        })
    )
}