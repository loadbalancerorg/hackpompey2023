import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-breath',
    templateUrl: 'breath.page.html',
    styleUrls: ['breath.page.scss']
})
export class BreathPage {
    constructor(
        private router: Router
    ) {}
}
