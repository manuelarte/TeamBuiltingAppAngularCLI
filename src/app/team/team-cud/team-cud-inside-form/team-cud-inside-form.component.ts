import {Component, OnInit, Input}      from '@angular/core';
import {FormGroup} from "@angular/forms";
import {GoogleMapGeocodingService} from "../../../services/google-map-geocoding.service";
import {TeamSport} from "../../../team-sports";
import {Team} from "../../../team";
import {GoogleMapGeocodingResultGeometryLocation} from "../../../google-map-geocoding-result-geometry-location";
import {DatesService} from "../../../services/dates-service";

@Component({
    selector: 'team-cud-inside-form',
    templateUrl: 'team-cud-inside-form.component.html',
    styleUrls: [ 'team-cud-inside-form.component.scss' ],
    providers: [ GoogleMapGeocodingService, DatesService ]
})
export class TeamCudInsideFormComponent implements OnInit {
    @Input() sports: TeamSport[] = [];

    @Input() stillActive: boolean = true;

    @Input() model: Team = new Team();
    location: GoogleMapGeocodingResultGeometryLocation;
    private validLocation: boolean = false;

    @Input() teamForm: FormGroup;

    constructor(
        private googleMapGeocodingService: GoogleMapGeocodingService,
        private datesService: DatesService,
    ) {}

    ngOnInit(): void {
        console.log(this.model)
        if (this.model.location) {
            this.searchLocation(this.model.location)
            this.stillActive = this.model.toDate == null;
        }
    }

    invalidTeamName(name: string): boolean {
        return name.length === 0;
    }

    invalidFromDate(startDate: string): boolean {
        return startDate === null;
    }

    invalidToDate(): boolean {
        let bothDatesExists: boolean = this.model.toDate != null && this.model.fromDate != null;
        return  bothDatesExists && this.model.fromDate.getTime() < this.model.toDate.getTime();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    searchLocation(address: string): void {
        this.googleMapGeocodingService.getGeocoding(address).then(geocoding => {
            this.location = geocoding.results[0].geometry.location;
            this.validLocation = true;
        });
    }

    getCenter(): GoogleMapGeocodingResultGeometryLocation {
        return this.isValidLocation() ? this.location : {lat: 0, lng: 0};
    }

    isValidLocation(): boolean {
        return this.validLocation && this.location != null;
    }

    getMinimumToDate(): Date {
        return this.model.fromDate ? this.model.fromDate : new Date(-2208992400);
    }

    getFromDate(): string {
        if (this.model) {
            return this.datesService.dateToString(this.model.fromDate);
        }
        return "";
    }

    getToDate(): string {
        if (this.model && this.model.toDate) {
            return this.datesService.dateToString(this.model.toDate);
        }
        return "";
    }

}
