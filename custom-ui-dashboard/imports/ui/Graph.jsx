import React from 'react';
// import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import {bitToDecimal, sampleRange, timeRange, totalTimeRange} from './../api/Model/constant';

import moment from "moment";
import {CanvasJSChart} from "canvasjs-react-charts";
import * as PropTypes from "prop-types";
import {TimeRange} from "pondjs";

class Graph extends React.Component {
    constructor(props) {
        super(props);

        //These functions binds component updates from the child
        this.updateDateTimeRange = this.updateDateTimeRange.bind(this);
        this.updateSampleRate = this.updateSampleRate.bind(this);
        this.updateSampleRateMax = this.updateSampleRateMax.bind(this);
    }

    mapVisibility(visible) {
		var roomsSelected = [false, false, false, false, false, false, false];
        var visibilityChecker = visible;
        for(let i = 0; i < 7; i++) {
            if(visibilityChecker >= bitToDecimal[i]) {
                roomsSelected[i] = true;
                visibilityChecker -= bitToDecimal[i];
            }
        }
        return roomsSelected;
	}

    //This function maps the dataset to the graph UI format
	mapDataset(dataset){
    	var room_datapoints = [[],[],[],[],[],[],[]];
		const visibility = this.mapVisibility(this.props.visibility);

    	dataset.forEach(room => {
			room.points.forEach(point => {
				if(visibility[room._id]) {
					room_datapoints[room._id].push({
						"y": point.temperature,
						"x": new Date(point.timestamp),
						"roomID": room._id
					})
				}
			});
		});

    	return room_datapoints;
	}

	//Callback Functions (to retrieve child modifications)
    updateDateTimeRange(dateTimeRange) {
        const { dateTimeRangeHandler } = this.props;
        dateTimeRangeHandler(dateTimeRange);
        this.updateMaxSamplePoints();
    }

    updateSampleRate(sampleRate) {
        const { sampleRateHandler } = this.props;
        sampleRateHandler(sampleRate);
    }

    updateSampleRateMax(sampleRateMax) {
        const { sampleRateMaxHandler } = this.props;
        sampleRateMaxHandler(sampleRateMax);
    }

    updateMaxSamplePoints = () => {
        //select from bucket generated based on room selected
        const { dateTimeRange } = this.props;
        const y = (Math.round( dateTimeRange.duration() / totalTimeRange.duration() * sampleRange[1]));
        const x = (y < 0) ? 2 : Math.round( dateTimeRange.duration()/totalTimeRange.duration() * sampleRange[1]);
        this.updateSampleRateMax(x);

        if (x < this.props.sampleRate) {
            this.updateSampleRate(x);
        }
    }

    render() {
    	//This resolves the issue with regards canvasjs rangeChange callback function
    	var that = this;
    	const visibility = this.mapVisibility(this.props.visibility);
		const chart_datapoints = this.mapDataset(this.props.dataset);
        const options = {
			theme: "light1",
			rangeChanged: function (e) {
                if(e.trigger === "reset") {
                    that.updateDateTimeRange(totalTimeRange);
                }
            },
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Temperature Sensor",
				fontFamily: "tahoma",
                fontWeight: "bold",
				fontColour: "grey",
                fontSize: 50,
			},
			legend: {
				horizontalAlign: "centre",
			   verticalAlign: "bottom",
			   fontSize: 15
			},
			tooltip: {
				shared: true,
				content:"{name}: Timestamp: {x}, Temperature: {y}°C"
			},

			axisX: {
				title: "Time",
				viewportMinimum: this.props.dateTimeRange.begin(),
				viewportMaximum: this.props.dateTimeRange.end()
			},
			axisY: {
				title: "Temperature",
				suffix: "°C",
				includeZero: false
			},
			data:[
				{
					visible: visibility[0],
					type: "spline",
					showInLegend: true,
					name: "room 0",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[0]
				},
				{
					visible: visibility[1],
					type: "spline",
					showInLegend: true,
					name: "room 1",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[1]
				},
				{
					visible: visibility[2],
					type: "spline",
					showInLegend: true,
					name: "room 2",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[2]
				},
				{
					visible: visibility[3],
					type: "spline",
					showInLegend: true,
					name: "room 3",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[3]
				},
				{
					visible: visibility[4],
					type: "spline",
					showInLegend: true,
					name: "room 4",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[4]
				},
				{
					visible: visibility[5],
					type: "spline",
					showInLegend: true,
					name: "room 5",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[5]
				},
				{
					visible: visibility[6],
					type: "spline",
					showInLegend: true,
					name: "room 6",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[6]
				},
			]
		}


        return (
            <div>
                <CanvasJSChart className={'chartContainer'} options = {options}
							   onRef={ref => this.chart = ref}
				/>
            </div>
        );
    }

    componentDidMount(){
        const chart = this.chart;
        chart.render();
		/* For scroll and Wheel no time to complete
        document.getElementsByClassName("chartContainer")[0].addEventListener("wheel", function(e){
		  e.preventDefault();

		  if(e.clientX < chart.plotArea.x1 || e.clientX > chart.plotArea.x2 || e.clientY < chart.plotArea.y1 || e.clientY > chart.plotArea.y2)
			return;

		  var axisX = chart.axisX[0];
		  var viewportMin = axisX.get("viewportMinimum"),
			  viewportMax = axisX.get("viewportMaximum"),
			  interval = axisX.get("minimum");

		  var newViewportMin, newViewportMax;

		  if (e.deltaY < 0) {
			newViewportMin = viewportMin + interval;
			newViewportMax = viewportMax - interval;
		  }
		  else if (e.deltaY > 0) {
			newViewportMin = viewportMin - interval;
			newViewportMax = viewportMax + interval;
		  }

		  if(newViewportMin >= chart.axisX[0].get("minimum") && newViewportMax <= chart.axisX[0].get("maximum") && (newViewportMax - newViewportMin) > (2 * interval)){
			chart.axisX[0].set("viewportMinimum", newViewportMin, false);
			chart.axisX[0].set("viewportMaximum", newViewportMax);
		  }

		});
		*/

    }
}

export default Graph;

Graph.propTypes = {
	dataset: PropTypes.arrayOf(
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
	visibility: PropTypes.number.isRequired,

	sampleRateMin: PropTypes.number.isRequired,
    sampleRateMax: PropTypes.number.isRequired,
    sampleRate: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    dateTimeRange: PropTypes.instanceOf(TimeRange).isRequired,
}