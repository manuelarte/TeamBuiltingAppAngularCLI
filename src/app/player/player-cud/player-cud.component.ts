/**
 * Created by Manuel on 22/11/2016.
 */
import {Component, OnInit, Input} from '@angular/core';
import {GoogleMapGeocodingService} from "../../services/google-map-geocoding.service";
import {Player} from "../../player";
import {GoogleMapGeocodingResultGeometryLocation} from "../../google-map-geocoding-result-geometry-location";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'player-cud',
    templateUrl: 'player-cud.component.html',
    styleUrls: [ 'player-cud.component.css' ],
    providers: [ GoogleMapGeocodingService ]
})
export class PlayerCudComponent implements OnInit {
    @Input() model: Player = new Player();
    location: GoogleMapGeocodingResultGeometryLocation;
    validLocation: boolean = false;

    @Input() playerForm = new FormGroup({
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])),
        nickname: new FormControl('', Validators.compose([Validators.minLength(2), Validators.maxLength(20)])),
        bornAddress: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(200)])),
        imageLink: new FormControl('', Validators.required),
    });

    constructor(
        private googleMapGeocodingService: GoogleMapGeocodingService,
    ) {}

    ngOnInit(): void {
        if (this.model && this.model.bornAddress) {
            this.searchLocation(this.model.bornAddress)
        }
    }

    searchLocation(address: string): void {
        this.googleMapGeocodingService.getGeocoding(address).then(geocoding => {
            this.location = geocoding.results[0].geometry.location;
            this.validLocation = true;
        }).catch(error => this.validLocation = false);
    }

    getCenter(): GoogleMapGeocodingResultGeometryLocation {
        return this.isValidLocation() ? this.location : {lat: 0, lng: 0};
    }

    isValidLocation(): boolean {
        return this.validLocation;
    }

}
