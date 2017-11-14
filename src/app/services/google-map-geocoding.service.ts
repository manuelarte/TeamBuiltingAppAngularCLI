import { Injectable }    from '@angular/core';

import 'rxjs/add/operator/toPromise';

import {GoogleMapGeocoding} from "../google-map-geocoding";
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class GoogleMapGeocodingService {

    private googleMapGeocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json';  // URL to web api

    constructor(private httpClient: HttpClient) { }

    getGeocoding(address: string): Promise<GoogleMapGeocoding> {
        let params = new HttpParams();
        params.set('address', address);
        return this.httpClient.get<GoogleMapGeocoding>(this.googleMapGeocodingUrl, { params: params })
            .toPromise();
    }

}
