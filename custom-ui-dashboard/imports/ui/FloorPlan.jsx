import React from 'react';

class FloorPlan extends React.Component {
    constructor(props) {
        super(props);
    }

    changeColour(e) {
        // When user clicks on the room and does not want the line graph to be shown, room colour changes to white too
        if (this.props.visible[e] === false)  {
            return "#ffffff";
        } else {
            return this.props.rooms[e];
        }
    }
    render() {
        return (
            <svg
                viewBox = "0 0 900 700"
                xmlns="http://www.w3.org/2000/svg"
                style={{width: "930px", height: "600px", marginTop: "150px"}}>

                <g>
                    <rect id="Rectangle" stroke="#000000" strokeWidth="2" x="1" y="1" width="930" height="650" fill="white"></rect>
                    <text x="10" y="20" fill="red"> Floor Plan</text>
                    <rect id="Room 0" stroke="#000000" strokeWidth="2" x="15" y="39" width="300" height="200" fill={this.changeColour(0)} onClick={() => this.props.onClick(0)}></rect>
                    <rect id="Room 1" stroke="#000000" strokeWidth="2" x="15" y="396" width="150" height="255" fill={this.changeColour(1)} onClick={() => this.props.onClick(1)}></rect>
                    <rect id="Room 2" stroke="#000000" strokeWidth="2" x="165" y="396" width="150" height="255" fill={this.changeColour(2)} onClick={() => this.props.onClick(2)}></rect>
                    <rect id="Room 3" stroke="#000000" strokeWidth="2" x="315" y="396" width="150" height="255" fill={this.changeColour(3)} onClick={() => this.props.onClick(3)}></rect>
                    <rect id="Room 4" stroke="#000000" strokeWidth="2" x="465" y="396" width="150" height="255" fill={this.changeColour(4)} onClick={() => this.props.onClick(4)}></rect>
                    <rect id="Room 5" stroke="#000000" strokeWidth="2" x="615" y="396" width="150" height="255" fill={this.changeColour(5)} onClick={() => this.props.onClick(5)}></rect>
                    <rect id="Room 6" stroke="#000000" strokeWidth="2" x="765" y="396" width="150" height="255" fill={this.changeColour(6)} onClick={() => this.props.onClick(6)}></rect>
                    <text id="Room_0" fontWeight="bold" fill="black" x="115" y="200" fontSize="20px"> Room 0</text>
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
                    <rect stroke="#000000" strokeWidth="3" x="862" y="128" width="40" height="10" fill="white"></rect>
                    <rect stroke="#000000" strokeWidth="3" x="630" y="298" width="277" height="10" fill="white"></rect>
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
                        <path fill="none" stroke="#000000" strokeWidth="2" d="M160,445 a50,50 0 0,1 -50,-50" />
                        <line x1="161" y1="395" x2="161" y2="446" stroke="#000000" strokeWidth="2"></line>
                    </g>
                    <g>
                        <path fill="none" stroke="#000000" strokeWidth="2" d="M310,445 a50,50 0 0,1 -50,-50" />
                        <line x1="311" y1="395" x2="311" y2="446" stroke="#000000" strokeWidth="2"></line>
                    </g>
                    <g>
                        <path fill="none" stroke="#000000" strokeWidth="2" d="M368.5,395 a50,50 0 0,1 -50,50" />
                        <line x1="319.5" y1="395" x2="319.5" y2="446" stroke="#000000" strokeWidth="2"></line>
                    </g>
                    <g>
                        <path fill="none" stroke="#000000" strokeWidth="2" d="M610,445 a50,50 0 0,1 -50,-50" />
                        <line x1="611" y1="395" x2="611" y2="446" stroke="#000000" strokeWidth="2"></line>
                    </g>
                    <g>
                        <path fill="none" stroke="#000000" strokeWidth="2" d="M760,445 a50,50 0 0,1 -50,-50" />
                        <line x1="761" y1="395" x2="761" y2="446" stroke="#000000" strokeWidth="2"></line>
                    </g>
                    <g>
                        <path fill="none" stroke="#000000" strokeWidth="2" d="M818.5,395 a50,50 0 0,1 -50,50" />
                        <line x1="769.5" y1="395" x2="769.5" y2="446" stroke="#000000" strokeWidth="2"></line>
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