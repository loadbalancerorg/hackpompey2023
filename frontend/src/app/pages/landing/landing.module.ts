import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingPage } from './landing.page';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        LandingPage,
    ],
    exports: [RouterModule],
})
export class LandingPageModule {}
