import React from 'react';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import {sampleRange, timeRange, totalTimeRange} from './../api/Model/constant';

import moment from "moment";
import {CanvasJSChart} from "canvasjs-react-charts";
import * as PropTypes from "prop-types";
import {TimeRange} from "pondjs";



const keys = ['0', '1', '2', '3', '4', '5', '6'];

class Graph extends React.Component {
    constructor(props) {
        super(props);

        // this.dateTimeRangeHandler = this.dateTimeRangeHandler.bind(this);
        this.updateDateTimeRange = this.updateDateTimeRange.bind(this);
        this.updateSampleRate = this.updateSampleRate.bind(this);
        this.updateSampleRateMax = this.updateSampleRateMax.bind(this);
    }

	mapDataset(dataset){
    	var room_datapoints = [[],[],[],[],[],[],[]];
		const visibility = this.props.visibility;

    	dataset.forEach(room => {
			room.points.forEach(point => {
				// console.log(room_datapoints[roomId]);
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

	// dateTimeRangeHandler(start, end) {
    //     const {dateTimeRangeHandler} =this.props;
    //     if (start && end) {
    //       dateTimeRangeHandler(new TimeRange(start, end));
    //     }
    // }

    updateDateTimeRange(dateTimeRange) {
        // const { durationHandler } = this.props;
        // durationHandler(dateTimeRange.duration());
        // const { dateTimeRangeHandler } = this.props;
        // console.log(dateTimeRange);
        // dateTimeRangeHandler(dateTimeRange);
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
        // for now make max 2555
        const { dateTimeRange } = this.props;
        // const x = 2555; // use total.duration()
        const y = (Math.round( dateTimeRange.duration() / totalTimeRange.duration() * sampleRange[1]));
        const x = (y < 0) ? 2 : Math.round( dateTimeRange.duration()/totalTimeRange.duration() * sampleRange[1]);
        this.updateSampleRateMax(x);
        // console.log(this.state.maxRange);
        // console.log(this.state.currentRange);

        if (x < this.props.sampleRate) {
            this.updateSampleRate(x);
        }
    }

    render() {
    	var that = this;
    	const { visibility } = this.props;
		const chart_datapoints = this.mapDataset(this.props.dataset);
        const options = {
			theme: "light1", // "light1", "dark1", "dark2"
			rangeChanged: function (e) {
                if(e.trigger === "reset") {
                    that.updateDateTimeRange(new TimeRange(new Date("2013-10-02T05:00:00"), new Date("2013-12-03T15:30:00")));
                } else {
                    that.updateDateTimeRange(new TimeRange(new Date(e.axisX[0].viewportMinimum),new Date(e.axisX[0].viewportMaximum)));
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
				horizontalAlign: "left", // "center" , "right"
			   verticalAlign: "center",  // "top" , "bottom"
			   fontSize: 15
			},
			tooltip: {
				shared: true,
				// contentFormatter: function (e) {
				// 	var content = " ";
				// 	for (var i = 0; i < e.entries.length; i++) {
				// 		content += e.entries[i].dataSeries.name + " " + "<strong>" + e.entries[i].dataPoint.y + "°C</strong>";
				// 		content += "<br/>";
				// 	}
				// 	return content;
				// },
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
					type: "line",
					showInLegend: true,
					name: "room 0",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[0]
				},
				{
					visible: visibility[1],
					type: "line",
					showInLegend: true,
					name: "room 1",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[1]
				},
				{
					visible: visibility[2],
					type: "line",
					showInLegend: true,
					name: "room 2",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[2]
				},
				{
					visible: visibility[3],
					type: "line",
					showInLegend: true,
					name: "room 3",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[3]
				},
				{
					visible: visibility[4],
					type: "line",
					showInLegend: true,
					name: "room 4",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[4]
				},
				{
					visible: visibility[5],
					type: "line",
					showInLegend: true,
					name: "room 5",
					xValueFormatString: "DD/MM/YY hh:mm tt",
					yValueFormatString: "##.#####",
					dataPoints: chart_datapoints[5]
				},
				{
					visible: visibility[6],
					type: "line",
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
                <CanvasJSChart className={'chartContainer'}
							   options = {options}
				 onRef={ref => this.chart = ref}
				/>
            </div>
        );
    }

    componentDidMount(){
        const chart = this.chart;
        chart.render();
		/*
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
	visibility: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,

	sampleRateMin: PropTypes.number.isRequired,
    sampleRateMax: PropTypes.number.isRequired,
    sampleRate: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    dateTimeRange: PropTypes.instanceOf(TimeRange).isRequired,

    //Handlers for active data
    sampleRateHandler: PropTypes.func.isRequired,
    sampleRateMaxHandler: PropTypes.func.isRequired,
    durationHandler: PropTypes.func.isRequired,
    dateTimeRangeHandler: PropTypes.func.isRequired
}