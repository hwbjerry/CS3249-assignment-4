import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import * as PropTypes from "prop-types";
import { TimeRange } from 'pondjs';
import {totalTimeRange} from "../api/Model/constant";


class DateTimeRangeController extends React.Component {
  constructor(props) {
    super(props);

    this.dateTimeRangeHandler = this.dateTimeRangeHandler.bind(this);
  }

    /**
     * Child element unable to pass values back to parent only way is to utilise function and input callback foreach parameter
     * https://www.pluralsight.com/guides/how-to-pass-props-object-from-child-component-to-parent-component
     * Alternatively, create custom class prototype. And bind callback
     */
    dateTimeRangeHandler(start, end) {
        const {dateTimeRangeHandler} =this.props;
        if (start && end) {
          dateTimeRangeHandler(new TimeRange(start, end));
        }
    }



  handleCallBack = (start, end, label) => {
    this.dateTimeRangeHandler(start, end);
  }

  renderVanillaPicker() {
    return (
      <div>
        <div>
            Select Range: {" "}

            <DateRangePicker
                initialSettings={{
                    timePicker: true,
                    startDate: this.props.dateTimeRange.begin(),
                    endDate: this.props.dateTimeRange.end(),
                    minDate: totalTimeRange.begin(),
                    maxDate: totalTimeRange.end(),
                    locale: {
                        format: 'DD/MM/YYYY hh:mm A',
                    },
                }}
                onCallback={this.handleCallBack}
            >
                <input type="text" className="form-control col-5"/>
            </DateRangePicker>
        </div>
      </div>
    );
  }

  render() {

    let pickersRender = (
      <div>
        {this.renderVanillaPicker()}
      </div>
    );
    let pickers = pickersRender;
    return (
      <div className="container">
        {pickers}
      </div>
    );
  }
}

DateTimeRangeController.propTypes = {
    dateTimeRange: PropTypes.instanceOf(TimeRange).isRequired,
    dateTimeRangeHandler: PropTypes.func.isRequired
};

export default DateTimeRangeController;
