import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
// import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { ReactiveAggregate } from 'meteor/jcbernack:reactive-aggregate';
import { totalTimeRange } from '../Model/constant';
import {schema} from '../Model/schema';


const temperature_data = new Mongo.Collection('temperature_data');
temperature_data.attachSchema(schema);

// https://docs.meteor.com/api/pubsub.html
if (Meteor.isServer) {
    Meteor.publish('temperature_data', function callback({duration, sampleRate}){
        check(duration, Number);
        check(sampleRate, Number);

        const totalSamples = Math.round(totalTimeRange.duration() / duration * sampleRate);
        /**
         * Ref: https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/
         * Ref: https://docs.mongodb.com/manual/reference/operator/aggregation/bucketAuto/
         */

        const pipeline = [
        {
            $group: {
              _id: '$_id.timestamp',
              points: {
                $push: {
                  timestamp: '$_id.roomId',
                  temperature: '$temperature'
                }
              }
            }
        }
        ];

        const test_single_datetime_pipeline = [
          {
            '$group': {
              '_id': {
                'timestamp': '$timestamp'
              },
              'points': {
                '$push': {
                  'timestamp': '$_id.timestamp',
                  'temperature': '$temperature'
                }
              }
            }
          }, {
            '$match': {
              '_id.timestamp': {
                '$gte': new Date('Wed, 02 Oct 2013 05:00:00 GMT'),
                '$lt': new Date('Wed, 02 Oct 2013 05:30:00 GMT')
              }
            }
          }
        ];

        const new_pipeline = [
        {
          $bucketAuto: {
            groupBy: '$timestamp',
            buckets: 2997,
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