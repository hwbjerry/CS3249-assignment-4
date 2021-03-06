import React from 'react';
import PropTypes from "prop-types";
import {bitToDecimal} from "../api/Model/constant";

class FloorPlan extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: [true, true, true, true, true, true, true]
        }

        this.updateVisible = this.updateVisible.bind(this);
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

    getAvg(dataset) {
        var room_datapoints = [0, 0, 0, 0, 0, 0, 0];
        var room_counter = [0, 0, 0, 0, 0, 0, 0];
		const visible = this.mapVisibility(this.props.visible);

        dataset.forEach(room => {
            if(visible[room._id]) {
                room.points.forEach(point => {
                    room_counter[room._id] += 1;
                    room_datapoints[room._id] += point.temperature;
                });
            }
        });
        for(let i=0; i<room_datapoints.length; i++) {
            room_datapoints[i] = room_datapoints[i] / room_counter[i];
        }

    	return room_datapoints;
    }

    changeColour(avg, room_id) {
        // When user clicks on the room and does not want the line graph to be shown, room colour changes to white too
        const visible = this.mapVisibility(this.props.visible);
        const {visibility} = this.state;
        let colour;
        if (visible[room_id] === false || visibility[room_id] === false)  {
            colour = "#ffffff";
        } else {
            colour = this.getRoomColour(avg);
        }
        return colour;
    }

    //Colour of the room depends on the
    getRoomColour(avgtemp) {
        const temperatureUpper = 32;
        const temperatureLower = 3;
        const temperatureRange = temperatureUpper - temperatureLower;
        const greenUpper = 255;
        const greenLower = 0;
        const greenRange = greenUpper - greenLower;
        const greenTemperatureScale = temperatureRange / greenRange;
        const blueUpper = 255;
        const blueLower = 95;
        const blueRange = blueUpper - blueLower;
        const blueTemperatureScale = temperatureRange / blueRange;

        const red = 0;
        const green = greenUpper - ((temperatureUpper - avgtemp) / greenTemperatureScale).toFixed(0);
        const blue = blueUpper - ((temperatureUpper - avgtemp) / blueTemperatureScale).toFixed(0);
        const alpha = 0.9;

        return `rgba(${red.toString()}, ${green.toString()}, ${blue.toString()}, ${alpha.toString()})`;
    }

    mapVisibilityToDecimal(bits) {
        var count = 0;
        for (let i = 0; i < 7; i++) {
            if (bits[i] === true) count += bitToDecimal[i];
        }
        return count;
    }


    updateVisible(e) {
        const {visibleHandler, visible} = this.props;
        //Convert to array and toggle room
        const rooms_visibility = this.mapVisibility(visible);
        rooms_visibility[e] = !rooms_visibility[e];

        console.log(this.mapVisibilityToDecimal(rooms_visibility));
        console.log(rooms_visibility);

        const toggleValue = this.mapVisibilityToDecimal(rooms_visibility);
        if (toggleValue === 0) return;
        //Pass back updated list in decimal
        visibleHandler(toggleValue);

        //Update 'state' in array (for responsiveness)
        this.setState({visibility: rooms_visibility});
    }

    render() {
        const {dataset} = this.props;
        const avg_of_room = this.getAvg(this.props.dataset);

        return (
                //This replicates the floor plan with each room acting as toggle buttons that changes colour depend its temperature
                <svg
                viewBox = "0 0 900 700"
                xmlns="http://www.w3.org/2000/svg"
                style={{width: "30%", height: "auto",  margin: "auto",display: "block", padding: "10px"}}>
                    <g>
                        <rect id="Rectangle" stroke="#000000" strokeWidth="2" x="1" y="1" width="899" height="650" fill="white"></rect>
                        <text x="10" y="20" fill="red"> Floor Plan</text>


                        <rect id="Room 0" stroke="#000000" strokeWidth="2" x="15" y="39" width="300" height="200" fill={this.changeColour(avg_of_room[0], 0)} onClick={() => this.updateVisible(0)}></rect>
                        <rect id="Room 1" stroke="#000000" strokeWidth="2" x="6" y="396" width="148" height="255" fill={this.changeColour(avg_of_room[1], 1)} onClick={() => this.updateVisible(1)}></rect>
                        <rect id="Room 2" stroke="#000000" strokeWidth="2" x="154" y="396" width="148" height="255" fill={this.changeColour(avg_of_room[2], 2)} onClick={() => this.updateVisible(2)}></rect>
                        <rect id="Room 3" stroke="#000000" strokeWidth="2" x="302" y="396" width="148" height="255" fill={this.changeColour(avg_of_room[3], 3)} onClick={() => this.updateVisible(3)}></rect>
                        <rect id="Room 4" stroke="#000000" strokeWidth="2" x="450" y="396" width="148" height="255" fill={this.changeColour(avg_of_room[4], 4)} onClick={() => this.updateVisible(4)}></rect>
                        <rect id="Room 5" stroke="#000000" strokeWidth="2" x="598" y="396" width="148" height="255" fill={this.changeColour(avg_of_room[5], 5)} onClick={() => this.updateVisible(5)}></rect>
                        <rect id="Room 6" stroke="#000000" strokeWidth="2" x="746" y="396" width="148" height="255" fill={this.changeColour(avg_of_room[6], 6)} onClick={() => this.updateVisible(6)}></rect>

                        <text id="R0" fontWeight="bold" fill="black" x="115" y="200" fontSize="20px"> Room 0</text>
                        <text id="R1" fontWeight="bold" fill="black" x="75" y="620" fontSize="20px">R1</text>
                        <text id="R2" fontWeight="bold" fill="black" x="225" y="620" fontSize="20px">R2</text>
                        <text id="R3" fontWeight="bold" fill="black" x="375" y="620" fontSize="20px">R3</text>
                        <text id="R4" fontWeight="bold" fill="black" x="525" y="620" fontSize="20px">R4</text>
                        <text id="R5" fontWeight="bold" fill="black" x="675" y="620" fontSize="20px">R5</text>
                        <text id="R6" fontWeight="bold" fill="black" x="825" y="625" fontSize="20px">R6</text>
                        <rect stroke="#000000" strokeWidth="3" x="100" y="35" width="40" height="10" fill="white" ></rect>
                        <rect stroke="#000000" strokeWidth="3" x="275" y="35" width="40" height="10" fill="white" ></rect>
                        <path d="M5,27 L325,27" id="Line" stroke="#000000" strokeWidth="6" strokeLinecap="square"></path>
                        <line x1="325.5" y1="120" x2="325.5" y2="30" stroke="#000000" strokeWidth="5"></line>
                        <path d="M330,117 L900,117" id="Line" stroke="#000000" strokeWidth="6" strokeLinecap="square"></path>
                        <line x1="7" y1="310" x2="7" y2="30" stroke="#000000" strokeWidth="3"></line>
                        <path d="M328,135 L900,135" id="Line" stroke="#000000" strokeWidth="3" strokeLinecap="square"></path>
                        <path d="M10,308.5 L325,308.5" id="Line" stroke="#000000" strokeWidth="3" strokeLinecap="square"></path>
                        <line x1="325.5" y1="310" x2="325.5" y2="133.5" stroke="#000000" strokeWidth="3"></line>
                        <rect stroke="#000000" strokeWidth="2" x="15" y="245" width="40" height="58" fill="white" rx="5" ></rect>
                        <rect stroke="#000000" strokeWidth="2" x="65" y="245" width="90" height="58" fill="white" rx="5" ></rect>
                        <rect stroke="#000000" strokeWidth="2" x="165" y="245" width="150" height="58" fill="white" rx="5" ></rect>
                        <rect stroke="#000000" strokeWidth="3" x="100" y="305" width="40" height="10" fill="white" ></rect>
                        <rect stroke="#000000" strokeWidth="3" x="275" y="303" width="40" height="10" fill="white" ></rect>
                        <line x1="480" y1="250" x2="480" y2="133.5" stroke="#000000" strokeWidth="5"></line>
                        <path d="M480,250 L490,250" id="Line" stroke="#000000" strokeWidth="5" strokeLinecap="square"></path>
                        <rect stroke="#000000" strokeWidth="3" x="675" y="128" width="40" height="10" fill="white"></rect>
                        <rect stroke="#000000" strokeWidth="3" x="862" y="128" width="35" height="10" fill="white"></rect>
                        <rect stroke="#000000" strokeWidth="3" x="630" y="298" width="267" height="10" fill="white"></rect>
                        <path d="M595,305 L629,305" id="Line" stroke="#000000" strokeWidth="5" strokeLinecap="square"></path>
                        <line x1="594" y1="306" x2="594" y2="295" stroke="#000000" strokeWidth="5"></line>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M17,187 a50,50 0 0,1 50,50" />
                            <path d="M20,236 L67,236" id="Line" stroke="#000000" strokeWidth="2" strokeLinecap="square"></path>
                            <line x1="18" y1="188" x2="18" y2="236" stroke="#000000" strokeWidth="2"></line>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M377,148 a50,50 0 0,1 -50,50" />
                            <path d="M327,148 L376,148" id="Line" stroke="#000000" strokeWidth="2" strokeLinecap="square"></path>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M151,445 a50,50 0 0,1 -50,-50" />
                            <line x1="150" y1="395" x2="150" y2="446" stroke="#000000" strokeWidth="2"></line>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M298,445 a50,50 0 0,1 -50,-50" />
                            <line x1="298" y1="395" x2="298" y2="446" stroke="#000000" strokeWidth="2"></line>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M355,395 a50,50 0 0,1 -50,50" />
                            <line x1="306" y1="395" x2="306" y2="446" stroke="#000000" strokeWidth="2"></line>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M594,445 a50,50 0 0,1 -50,-50" />
                            <line x1="594" y1="395" x2="594" y2="446" stroke="#000000" strokeWidth="2"></line>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M742,445 a50,50 0 0,1 -50,-50" />
                            <line x1="742" y1="395" x2="742" y2="446" stroke="#000000" strokeWidth="2"></line>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M800.5,395 a50,50 0 0,1 -50,50" />
                            <line x1="750" y1="395" x2="750" y2="446" stroke="#000000" strokeWidth="2"></line>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M78,310 a20,20 0 0,1 -20,20" />
                            <line x1="57" y1="307" x2="57" y2="331" stroke="#000000" strokeWidth="2"></line>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M98,330 a20,20 0 0,1 -20,-20" />
                            <line x1="98" y1="308" x2="98" y2="331" stroke="#000000" strokeWidth="2"></line>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M185,310 a20,20 0 0,1 -20,20" />
                            <line x1="164" y1="307" x2="164" y2="331" stroke="#000000" strokeWidth="2"></line>
                        </g>
                        <g>
                            <path fill="none" stroke="#000000" strokeWidth="2" d="M205,330 a20,20 0 0,1 -20,-20" />
                            <line x1="205" y1="308" x2="205" y2="331" stroke="#000000" strokeWidth="2"></line>
                        </g>
                    </g>

                </svg>
        );
    }
}

export default FloorPlan;

FloorPlan.propTypes = {
    visible: PropTypes.number.isRequired,
    visibleHandler: PropTypes.func.isRequired,
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
    )
};
