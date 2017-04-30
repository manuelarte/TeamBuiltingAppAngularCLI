/**
    * @author Manuel
    * @since 22/11/2016
    */
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {GoogleMapGeocodingService} from "../../services/google-map-geocoding.service";
import {Player} from "../../player";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-player-cud',
    templateUrl: 'player-cud.component.html',
    styleUrls: [ 'player-cud.component.scss' ],
    providers: [ GoogleMapGeocodingService ]
})
export class PlayerCudComponent implements OnInit {
    @Input() model: Player = new Player();
    @Input() editing = false;

    playerForm = new FormGroup({
        name: new FormControl({disabled: !this.editing}, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])),
        nickname: new FormControl({disabled: !this.editing}, Validators.compose([Validators.minLength(2), Validators.maxLength(20)])),
        bornAddress: new FormControl({disabled: !this.editing}, Validators.compose([Validators.minLength(6), Validators.maxLength(200)])),
        imageLink: new FormControl({disabled: !this.editing}, Validators.required),
    });

    @Output() form: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    constructor(
    ) {}

    ngOnInit(): void {
    }

    sendForm(): void {
        this.form.emit(this.playerForm);
    }

}
