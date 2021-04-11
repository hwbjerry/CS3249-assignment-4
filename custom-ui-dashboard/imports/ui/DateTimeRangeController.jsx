import React from "react";
import { FormControl} from "react-bootstrap";
import moment from "moment-timezone";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import DateRangePicker from "react-bootstrap-daterangepicker";

class DateTimeRangeController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: this.props.start,
      end: this.props.end,
      timezone: "Singapore Standard Time"
    };

    this.onClick = this.onClick.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
  }

  applyCallback(startDate, endDate) {
    console.log("Apply Callback");
    console.log(startDate.format("DD-MM-YYYY HH:mm:ss"));
    console.log(endDate.format("DD-MM-YYYY HH:mm:ss"));
    this.setState({
      start: startDate,
      end: endDate
    });
  }

  rangeCallback(index, value) {
    console.log(index, value);
  }

  onClick() {
    let newStart = moment(this.state.start);
    // console.log("On Click Callback");
    // console.log(newStart.format("DD-MM-YYYY HH:mm"));
    this.setState({ start: newStart });
  }

  renderVanillaPicker(local, maxDate, range, style) {
    let value = `${this.state.start.format(
      "DD-MM-YYYY HH:mm:ss"
    )} - ${this.state.end.format("DD-MM-YYYY HH:mm:ss")}`;
    let disabled = true;
    return (
      <div>
        <div onClick={this.onClick}>Click Me to test the smart mode picker</div>
        <div>
            Select Range: {" "}

            <DateRangePicker
                initialSettings={{
                    timePicker: true,
                    startDate: new Date('2013-10-02T05:00:00'),
                    endDate: new Date('2013-12-03T15:30:00'),
                    maxDate: new Date('2013-12-03T15:30:00'),
                    minDate: new Date('2013-10-02T05:00:00'),
                    locale: {
                        format: 'DD/MM/YYYY hh:mm:ss',
                    },
                }}
            >
                <input type="text" className="form-control col-4"/>
            </DateRangePicker>
        </div>
      </div>
    );
  }

  render() {
    let start = moment(new Date('2013-10-02T05:00:00'));
    let end = moment(new Date('2013-12-03T15:30:00'));
    let local = {
      format: "DD-MM-YYYY HH:mm:ss",
      sundayFirst: false,
      fromDate: '2013-10-02T05:00:00',
      toDate: '2013-12-03T15:30:00',
      selectingFrom: '2013-10-02T05:00:00',
      selectingTo: '2013-12-03T15:30:00',
      close: 'Close',
    };
    let range = {
      "Custom Range" : [moment(start), moment(end)]
    };
    let style = {
      // fromDot: {backgroundColor: 'rgb(100, 0, 34)'},
      // toDot: {backgroundColor: 'rgb(0, 135, 255)'},
      // fromDate: {color: 'rgb(0, 255, 100)', backgroundColor: 'rgb(255, 100, 100)'},
      // toDate: {backgroundColor: 'rgb(40, 90, 75)'},
      // betweenDates: {color: 'rgb(200, 0, 34)', backgroundColor: 'rgb(200, 150, 100)'},
      customRangeButtons: {backgroundColor: 'rgb(40, 90, 75)'},
      customRangeSelected: {backgroundColor: 'rgb(100, 90, 200)'},
      hoverCell: {color: 'rgb(200, 0, 34)'},
      standaloneLayout:{display:'flex', maxWidth:'fit-content'}
    };
    let maxDate = moment(end);
    let pickersRender = (
      <div>
        <br />
        {this.renderVanillaPicker(local, maxDate, range, style)}
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
export default DateTimeRangeController;
