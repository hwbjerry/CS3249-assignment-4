import { Meteor } from 'meteor/meteor';
import temperature_data from '../imports/api/collections/TemperatureModel.js';
import Papa from 'papaparse'
import fs from 'fs';

function populateDB() {
    const csv = Assets.absoluteFilePath('room-temperatures.csv');
    Papa.parse(fs.createReadStream(csv), {
    header: true,
    complete: Meteor.bindEnvironment(results =>
      temperature_data.batchInsert(
        results.data.map(temperature_row => ({
          RoomId: Number(temperature_row.RoomId),
          timestamp: new Date(temperature_row.timestamp),
          temperature: Number(temperature_row.temperature)
        }))
      )
    )
  });
}

Meteor.startup(() => {
    if (temperature_data.find().count() == 0) {
        populateDB();
        temperature_data.rawCollection().createIndex({
            RoomId: 1,
            timestamp: 1
        });
    }
});