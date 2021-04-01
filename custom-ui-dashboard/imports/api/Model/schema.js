import SimpleSchema from 'simpl-schema';

const temperatures = new Mongo.Collection();

temperatures.schema = new SimpleSchema({
    roomId: {type: Number},
    timestamp: {type: Date},
    temperature: { type: Number}
});