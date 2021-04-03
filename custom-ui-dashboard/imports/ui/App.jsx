import React from 'react';
import { totalTimeRange } from '../api/Model/constant';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sampleRate: new ReactiveVar(1024),
            duration: new ReactiveVar(totalTimeRange.duration())
        };
    }

    render() {
        const sampleRate = this.state.sampleRate;
        const duration = this.state.duration;
        console.log(duration);
        const totalSamples = Math.round(totalTimeRange.duration() / duration * sampleRate);
        return (
            <div>
                <h1>Hello</h1>
                <h2>{duration}</h2>
            </div>
        )
    }
}