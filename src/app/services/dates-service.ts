import {Injectable} from '@angular/core';
/**
    * @author manuel.doncel.martos
    * @since 14-3-2017
    */
@Injectable()
export class DatesService {

    constructor() { }

    /**
     * @param date
     * @return the date in string format 'yyy-mm-dd'
     */
    public dateToString(date: Date): string {
        if (date == null) {
            throw new Error('Date cannot be null');
        }
        return date.toISOString().substr(0, 10);
    }

    public getTimeBetweenTwoDates(date1: Date, date2: Date): {years: number, months: number, days: number} {
        if (!date1 || !date2) {
            throw new Error('Dates cannot be null')
        }
        const diff = Math.floor(date1.getTime() - date2.getTime());
        const day = 1000 * 60 * 60 * 24;

        const days = Math.floor(diff/day);
        const months = Math.floor(days/31);
        const years = Math.floor(months/12);
        return {years: years, months: months, days: days};
    }

}
