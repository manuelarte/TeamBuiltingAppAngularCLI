import {Component, Input, OnInit }      from '@angular/core';

import { GoogleMapGeocodingService } from '../../services/google-map-geocoding.service';
import {GoogleMapGeocodingResultGeometryLocation} from "../../google-map-geocoding-result-geometry-location";
import {Player} from "../../player";
import {Team} from "../../team";
import {RouterUtilsService} from "../../services/router-utils.service";

@Component({
    selector: 'team-in-google-maps',
    templateUrl: 'team-in-google-maps.component.html',
    styleUrls: ['team-in-google-maps.component.scss'],
    providers: [ GoogleMapGeocodingService, RouterUtilsService ]
})
export class TeamInGoogleMapsComponent implements OnInit  {

    @Input() players: Player[] = [];
    @Input() team: Team = new Team();
    markersInfoToDisplay: MarkerInfoToDisplay<Player>[] = [];
    center: GoogleMapGeocodingResultGeometryLocation = {lat: 38.0114236, lng: -3.3712457};

    constructor(
        private googleMapGeocodingService: GoogleMapGeocodingService,
        private routerUtilsService: RouterUtilsService,
    ) {}

    ngOnInit(): void {
        this.googleMapGeocodingService.getGeocoding$(this.team.location).subscribe(geocoding => this.center = geocoding.results[0].geometry.location);
        for (let player of this.players.filter(player => player.bornAddress)) {
            this.googleMapGeocodingService.getGeocoding$(player.bornAddress).subscribe(geocoding => this.markersInfoToDisplay.push(this.createMarker(player, geocoding.results[0].geometry.location)));
        }
    }

    private createMarker(player: Player, location: GoogleMapGeocodingResultGeometryLocation): MarkerInfoToDisplay<Player> {
        let locationToStore = location;
        while(this.existDuplicates(locationToStore)) {
            locationToStore = {lat: locationToStore.lat + Math.random() * 0.001, lng: locationToStore.lng + Math.random() * 0.001}
        }
        return {
            object: player,
            location: locationToStore
        };
    }

    private existDuplicates(newLocation: GoogleMapGeocodingResultGeometryLocation): boolean {
        return this.markersInfoToDisplay.filter(m => m.location.lat === newLocation.lat
        && m.location.lng === newLocation.lng).length > 0
    }


}

export class MarkerInfoToDisplay<T> {
    object: T;
    location: GoogleMapGeocodingResultGeometryLocation;
}
