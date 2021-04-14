import React from 'react';
import PropTypes from "prop-types";
import {sampleRange} from "../api/Model/constant";


class SampleRateRangeController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sampleRate: this.props.sampleRate,
            sampleRateMax: this.props.sampleRateMax
        };

        this.sampleRateMouseUpHandler = this.sampleRateMouseUpHandler.bind(this);
        this.sampleRateUpdate = this.sampleRateUpdate.bind(this);
    }

    //When change happens on slider. Need to show responsiveness.

      sampleRateUpdate(rate) {
        this.setState({sampleRate: parseInt(rate)});
      }

    //Only when mouse up so won't constantly be logged when user drags slider
    sampleRateMouseUpHandler() {
        const {sampleRateHandler} =this.props;
        const {sampleRate} = this.state;
        sampleRateHandler(sampleRate);

        console.log("WHY! ME");
    }

    render() {
        return (
            <div>
                <span><b>Sample Range: </b></span>
                <span>{this.props.sampleRateMin}</span>
                <input type="range"
                       step="1"
                       min= {this.props.sampleRateMin}
                       max={this.props.sampleRateMax}
                       value={this.props.sampleRate}
                       onChange={e => this.sampleRateUpdate(e.target.value)}
                       onMouseUp={() => this.sampleRateMouseUpHandler()}
                />
                <span>{this.props.sampleRateMax}</span>
                <br></br>
                <span><b>Current samples: </b> {this.props.sampleRate}</span>
            </div>
        )
    }
}

SampleRateRangeController.propTypes = {
    sampleRateMin: PropTypes.number.isRequired,
    sampleRateMax: PropTypes.number.isRequired,
    sampleRate: PropTypes.number.isRequired,
    sampleRateHandler: PropTypes.func.isRequired
};

export default SampleRateRangeController;