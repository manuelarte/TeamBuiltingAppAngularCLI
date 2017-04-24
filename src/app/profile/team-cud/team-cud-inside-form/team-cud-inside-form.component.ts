import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GoogleMapGeocodingService} from '../../../services/google-map-geocoding.service';
import {TeamSport} from '../../../team-sports';
import {Team} from '../../../team';
import {GoogleMapGeocodingResultGeometryLocation} from '../../../google-map-geocoding-result-geometry-location';
import {DatesService} from '../../../services/dates-service';
import {TeamSportService} from '../../../services/sports-service';

@Component({
    selector: 'app-team-cud-inside-form',
    templateUrl: 'team-cud-inside-form.component.html',
    styleUrls: [ 'team-cud-inside-form.component.scss' ],
    providers: [ GoogleMapGeocodingService, DatesService, TeamSportService ]
})
export class TeamCudInsideFormComponent implements OnInit {

    @Input() model: Team = new Team();

    sports: TeamSport[] = [];
    isBusy = true;
    stillActive = true;
    location: GoogleMapGeocodingResultGeometryLocation;
    private validLocation = false;

    teamForm = new FormGroup({
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])),
        sport: new FormControl('', Validators.required),
        bio: new FormControl('', Validators.maxLength(500)),
        fromDate: new FormControl('', Validators.required),
        toDate: new FormControl({disabled: this.stillActive}, ),
        emblemLink: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(500)])),
        location: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(200)])),
    });

    @Output() form: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    constructor(
        private teamSportService: TeamSportService,
        private googleMapGeocodingService: GoogleMapGeocodingService,
        private datesService: DatesService,
    ) {}

    ngOnInit(): void {
        if (this.model.location) {
            this.searchLocation(this.model.location);
            this.stillActive = this.model.toDate == null;
        }
        this.teamSportService.getTeamSportsAvailable().then(sports => {
            this.sports = sports;
            this.isBusy = false;
        }).catch(error => {
            this.isBusy = false;
        });
    }

    searchLocation(address: string): void {
        this.validLocation = false;
        this.googleMapGeocodingService.getGeocoding(address).then(geocoding => {
            this.location = geocoding.results[0].geometry.location;
            this.validLocation = true;
        });
    }

    public getCenter(): GoogleMapGeocodingResultGeometryLocation {
        return this.isValidLocation() ? this.location : {lat: 0, lng: 0};
    }

    isValidLocation(): boolean {
        return this.validLocation && this.location != null;
    }

    public getFromDate(): string {
        if (this.model && this.model.fromDate) {
            return this.datesService.dateToString(new Date(this.model.fromDate));
        }
        return '';
    }

    public getToDate(): string {
        if (this.model && this.model.toDate) {
            return this.datesService.dateToString(this.model.toDate);
        }
        return '';
    }

    emitForm(): void {
        this.form.emit(this.teamForm);
    }

}
