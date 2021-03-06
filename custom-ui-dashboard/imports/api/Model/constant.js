import { TimeRange } from 'pondjs';

export const totalTimeRange = Object.freeze(
    new TimeRange(new Date('2013-10-02T05:00:00'), new Date('2013-12-03T15:30:00'))
);
export const rooms = Object.freeze([0, 1, 2, 3, 4, 5, 6]);

export const timeRange = Object.freeze([new Date('2013-10-02T05:00:00'), new Date('2013-12-03T15:30:00')]);

export const sampleRange = Object.freeze([2,5994]);

//Decimal Representation of 1111111 (base 2) in array. Total in decimal = 127
export const bitToDecimal = Object.freeze([64, 32, 16, 8, 4, 2, 1]);

export const maxDecimalOfSevenBits = Object.freeze(127);