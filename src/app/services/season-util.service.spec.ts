import {SeasonUtilService} from "./season-utils.service";

describe('SeasonUtilService with TCB', function () {

  let service: SeasonUtilService = new SeasonUtilService();

    it('Should return all the years between the two years, inclusive', () => {
        let startYear: number = 2002;
        let endYear: number = 2010;
        let years = service.getYearsBetweenTwoYears(startYear, endYear);

        expect(years).toEqual([2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010]);
    });

    it('Should throw an exception', () => {
        let startYear: number = 2002;
        let endYear: number = 2010;
        expect(() => service.getYearsBetweenTwoYears(endYear, startYear)).toThrowError();
    });

});
