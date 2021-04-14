import { Meteor } from 'meteor/meteor';
import temperature_data from '../imports/api/collections/TemperatureModel.js';
import Papa from 'papaparse';
import fs from 'fs';

function populateCSVData() {
    const csv = Assets.absoluteFilePath('room-temperatures.csv');
    Papa.parse(fs.createReadStream(csv), {
    header: true,
    complete: Meteor.bindEnvironment(results =>
        {
            //Method 1: Assumes all static data in csv is of valid format. Uses external library batchInsert
            temperature_data.batchInsert(
                results.data.map(temperature_row => ({
                  RoomId: Number(temperature_row.RoomId),
                  timestamp: new Date(temperature_row.timestamp),
                  temperature: Number(temperature_row.temperature)
                }))
            )


            //Method 2: Insert to collection row by row check for invalid date *(Buggy)*
            /*
            const Z = '.000Z';
            const data = results.data;
            const data_keys = Object.keys(data);

            for(let i =0; i < data_keys.length; i++) {
                const row = data[data_keys[i]];
                const row_keys = Object.keys(row);
                // This line catches badDate error so the data in the csv will be fully loaded
                if(isNaN(Date.parse(row[row_keys[1]]))) continue;
                if(parseInt(row[row_keys[0]]) && parseFloat(row[row_keys[2]]) ) {
                    temperature_data.insert({
                        RoomId: parseInt(row[row_keys[0]]),
                        timestamp: new Date(row[row_keys[1]]),
                        temperature: parseFloat(row[row_keys[2]])
                    });
                }
            }
            */
        }
    )
  });
}

Meteor.startup(() => {
    if (temperature_data.find().count() === 0) {
        populateCSVData();
        temperature_data.rawCollection().createIndex({
            RoomId: 1,
            timestamp: -1
        });
    }
});