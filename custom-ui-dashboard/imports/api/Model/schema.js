import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    roomId: SimpleSchema.Integer,
    timestamp: Date,
    temperature: Number
});


