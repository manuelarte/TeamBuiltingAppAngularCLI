import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Auth} from '../services/auth-service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private authService: Auth) {}

    canActivate() {
        return this.authService.isAuthenticated();
    }
}
