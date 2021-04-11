import React from 'react';

class SampleRateRangeController extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <label>{this.props.minRange}</label>
                <input type="range"
                       step="1"
                       min={this.props.minRange}
                       max={this.props.maxRange}
                       value={this.props.currentRange}
                       onChange={this.props.onChangeValue}
                />
                <label>{this.props.maxRange}</label>
                <label> Samples </label>
            </div>
        )
    }
}

export default SampleRateRangeController;