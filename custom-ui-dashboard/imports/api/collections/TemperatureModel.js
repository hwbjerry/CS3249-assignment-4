import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import { totalTimeRange } from '../Model/constant'
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';

const temperature_data = new Mongo.Collection('temperature_data');

// https://docs.meteor.com/api/pubsub.html
if (Meteor.isServer) {
    Meteor.publish('temperature_data', function callback({duration, sampleRate}){
        check(duration, Number);
        check(sampleRate, Number);

        const totalSamples = Math.round(totalTimeRange.duration() / duration * sampleRate);

        const pipeline = [
        {
        $group: {
          _id: '$_id.RoomId',
          points: {
            $push: {
              timestamp: '$_id.timestamp',
              temperature: '$temperature'
            }
          }
        }
        }
        ];
        ReactiveAggregate(this, temperature_data, pipeline);
    });
}

export default temperature_data;