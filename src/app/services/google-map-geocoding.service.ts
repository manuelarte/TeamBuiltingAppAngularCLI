import { Injectable }    from '@angular/core';

import {GoogleMapGeocoding} from "../google-map-geocoding";
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class GoogleMapGeocodingService {

    private googleMapGeocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json';  // URL to web api

    constructor(private httpClient: HttpClient) { }

    getGeocoding$(address: string): Observable<GoogleMapGeocoding> {
        const params: HttpParams = new HttpParams();
        params.append('address', address);
        return this.httpClient.get<GoogleMapGeocoding>(this.googleMapGeocodingUrl + "?address=" + address);
    }

}
