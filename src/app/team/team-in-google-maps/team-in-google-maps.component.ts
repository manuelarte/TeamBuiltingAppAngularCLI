import {Component, Input, OnInit }      from '@angular/core';

import { GoogleMapGeocodingService } from '../../services/google-map-geocoding.service';
import {GoogleMapGeocodingResultGeometryLocation} from "../../google-map-geocoding-result-geometry-location";
import {Player} from "../../player";
import {Team} from "../../team";
import {LatLngBounds} from "angular2-google-maps/core";
import {Router} from "@angular/router";

@Component({
    selector: 'team-in-google-maps',
    templateUrl: 'team-in-google-maps.component.html',
    styleUrls: ['team-in-google-maps.component.scss'],
    providers: [ GoogleMapGeocodingService ]
})
export class TeamInGoogleMapsComponent implements OnInit  {

    @Input() players: Player[] = [];
    @Input() team: Team = new Team();
    markersInfoToDisplay: MarkerInfoToDisplay<Player>[] = [];
    center: GoogleMapGeocodingResultGeometryLocation = {lat: 38.0114236, lng: -3.3712457};

    constructor(
        private googleMapGeocodingService: GoogleMapGeocodingService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.googleMapGeocodingService.getGeocoding(this.team.location).then(geocoding => this.center = geocoding.results[0].geometry.location);
        for (let player of this.players) {
            this.googleMapGeocodingService.getGeocoding(player.bornAddress).then(geocoding => this.markersInfoToDisplay.push(this.createMarker(player, geocoding.results[0].geometry.location)));
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

    gotoPlayerDetails(player: Player): void {
        let link = ['/player', player.id];
        this.router.navigate(link);
    }

    print(event: LatLngBounds) {
        console.log("north east", event.getNorthEast().lat(), event.getNorthEast().lng());
        console.log("south west", event.getSouthWest().lat(), event.getSouthWest().lng());
    }

}

export class MarkerInfoToDisplay<T> {
    object: T;
    location: GoogleMapGeocodingResultGeometryLocation;
}
