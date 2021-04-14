import React from 'react';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import {timeRange, totalTimeRange} from './../api/Model/constant';

import moment from "moment";
import {CanvasJSChart} from "canvasjs-react-charts";



const keys = ['0', '1', '2', '3', '4', '5', '6'];

class Graph extends React.Component {
    constructor(props) {
        super(props);
    }

	mapDataset(dataset){
    	var chart_datapoints = [];
    	var room_datapoints = [[],[],[],[],[],[],[]];
    	const type = "spline";
    	const showInLegend = true;
    	var roomId;

    	dataset.forEach(room => {
			roomId = room._id;
			room.points.forEach(point => {
				// console.log(room_datapoints[roomId]);
				room_datapoints[roomId].push({"y": point.temperature, "x": new Date(point.timestamp), "roomID": roomId})
			});
		});

    	return room_datapoints;
	}

    render() {
    	var that = this;
    	const { visibility } = this.props;
		const chart_datapoints = this.mapDataset(this.props.dataset);
        const options = {
			theme: "light1", // "light1", "dark1", "dark2"
			rangeChanged: function (e) {
                if(e.trigger === "reset") {
                    that.handleChangeInStartDate(new Date("2013-10-02T05:00:00"));
                    that.handleChangeInEndDate(new Date("2013-12-03T15:30:00"));
                } else {
                    that.handleChangeInStartDate(new Date(e.axisX[0].viewportMinimum));
                    that.handleChangeInEndDate(new Date(e.axisX[0].viewportMaximum));
                }
            },
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Temperature Sensor",
				fontFamily: "Roboto",
                fontWeight: "bold",
                fontSize: 50,
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
				viewportMinimum: timeRange[0],
				viewportMaximum: timeRange[1]
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
                <CanvasJSChart className='line-graph'
							   options = {options}
				 onRef={ref => this.chart = ref}
				/>
            </div>
        );
    }

    componentDidMount(){
        const chart = this.chart;
        chart.render();

    }
}

export default Graph;