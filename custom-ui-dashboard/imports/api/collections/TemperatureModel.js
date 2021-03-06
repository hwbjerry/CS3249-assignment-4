import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
// import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { ReactiveAggregate } from 'meteor/jcbernack:reactive-aggregate';
import {bitToDecimal, totalTimeRange} from '../Model/constant';
import {schema} from '../Model/schema';


const temperature_data = new Mongo.Collection('temperature_data');
temperature_data.attachSchema(schema);

// https://docs.meteor.com/api/pubsub.html
if (Meteor.isServer) {
    Meteor.publish('temperature_data', function callback({duration, sampleRate, visible, dateTimeRangeBegin, dateTimeRangeEnd}){
        check(duration, Number);
        check(sampleRate, Number);

        const totalSamples = Math.round( duration/totalTimeRange.duration() * sampleRate);
        /**
         * Ref: https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/
         * Ref: https://docs.mongodb.com/manual/reference/operator/aggregation/bucketAuto/
         */
        var roomsSelected = [];
        var visibilityChecker = visible;
        for(let i = 0; i < 7; i++) {
            if(visibilityChecker >= bitToDecimal[i]) {
                roomsSelected.push(i);
                visibilityChecker -= bitToDecimal[i];
            }
        }

        const new_pipeline = [
        {
            $match: {
              RoomId: {$in: roomsSelected},
                'timestamp': {
                    $gte: new Date(dateTimeRangeBegin),
                    $lt: new Date(dateTimeRangeEnd)
                }
            }
        },

        {
          $bucketAuto: {
            groupBy: '$timestamp',
            buckets: totalSamples,
            output: {
                count: {$sum:1},
              data: {
                $push: {
                  RoomId: '$RoomId',
                  temperature: '$temperature'
                }
              }
            }
          }
        },
        {
          $unwind: {
            path: '$data'
          }
        },
        {
          $group: {
            _id: {
              RoomId: '$data.RoomId',
              timestamp: '$_id.min'
            },
            temperature: {
              $avg: '$data.temperature'
            }
          }
        },
        {
          $sort: {
            '_id.timestamp': 1
          }
        },
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
        ReactiveAggregate(this, temperature_data, new_pipeline);
    });
}

export default temperature_data;


