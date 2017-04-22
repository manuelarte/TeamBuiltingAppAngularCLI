import {Injectable} from '@angular/core';
/**
 * Created by manuel.doncel.martos on 14-3-2017.
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
}
