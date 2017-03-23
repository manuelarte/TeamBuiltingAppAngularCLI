import {Injectable} from "@angular/core";

export interface Season {
    startDate: Date,
    endDate: Date
}

@Injectable()
export class SeasonUtilService {

    getYearsBetweenTwoYears(startYear: number, endYear: number ): number[] {
        if (startYear > endYear) {
            throw "Start year must be before endYear";
        }
        let years: number[] = [];
        let isOver: boolean = false;
        let processingYear: number = startYear;
        while(!isOver){
            if (processingYear < endYear) {
                years.push(processingYear);
                processingYear++;
            }
            if (processingYear >= endYear) {
                years.push(processingYear);
                isOver = true;
            }

        }
        return years;
    }

    getSeasonForDate(date: Date, seasonStartsInMonth: number): Season {
        if(date.getMonth() < seasonStartsInMonth) {
            let startDate: Date = new Date(date);
            startDate.setFullYear(startDate.getFullYear() - 1);
            startDate.setMonth(seasonStartsInMonth);

            let endDate: Date = new Date(startDate);
            endDate.setFullYear(date.getFullYear());
            return {
                startDate: startDate,
                endDate: endDate
            }
        }  else {
            let startDate: Date = new Date(date);
            startDate.setMonth(seasonStartsInMonth);

            let endDate: Date = new Date(startDate);
            endDate.setFullYear(date.getFullYear() + 1);
            return {
                startDate: startDate,
                endDate: endDate
            }
        }
    }

}
