import { Injectable }    from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import Any = jasmine.Any;
import {GoogleMapGeocoding} from "../components/geolocalization/pojos/google-map-geocoding";

@Injectable()
export class GoogleMapGeocodingService {

    private googleMapGeocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json';  // URL to web api

    constructor(private http: Http) { }

    getGeocoding(address: string): Promise<GoogleMapGeocoding> {
        let params = new URLSearchParams();
        params.set('address', address);
        return this.http.get(this.googleMapGeocodingUrl, { search: params }).map(response => response.json())
            .toPromise();
    }

}
