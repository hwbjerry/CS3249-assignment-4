import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";

class DateTimeRangeController extends React.Component {
  constructor(props) {
    super(props);

    // this.handleEvent = this.handleEvent.bind(this);
  }

    /**
     * Child element unable to pass values back to parent only way is to utilise function and input callback foreach parameter
     * https://www.pluralsight.com/guides/how-to-pass-props-object-from-child-component-to-parent-component
     * @param start
     * @param end
     * @param label
     */

  handleEvent = (start, end, label) => {
    var startInput = document.querySelector('#startDateTime');
    var endInput = document.querySelector('#endDateTime');
    startInput.setAttribute("value", start.toDate().toString());
    endInput.setAttribute("value", end.toDate().toString());
    // console.log(startInput);
    startInput.click();
    endInput.click();
  }

  renderVanillaPicker() {
    return (
      <div>
        <div>
            Select Range: {" "}

            <DateRangePicker
                initialSettings={{
                    timePicker: true,
                    startDate: this.props.startDateTime,
                    endDate: this.props.endDateTime,
                    minDate: this.props.startDateTime,
                    maxDate: this.props.endDateTime,
                    locale: {
                        format: 'DD/MM/YYYY hh:mm:ss A',
                    },
                }}
                onCallback={this.handleEvent}
            >
                <input type="text" className="form-control col-4"/>
            </DateRangePicker>
            <input hidden={true} id='startDateTime' type="text" className="form-control col-4" onClick={this.props.onStartDateChangeValue}/>
            <input hidden={true} id='endDateTime' type="text" className="form-control col-4" onClick={this.props.onEndDateChangeValue}/>
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
export default DateTimeRangeController;
