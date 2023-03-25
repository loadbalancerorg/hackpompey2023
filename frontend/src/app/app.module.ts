import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './pages/login/login.module';
import { LandingPageModule } from './pages/landing/landing.module';
import { HomePageModule } from './pages/home/home.module';
import { ChatPageModule } from './pages/chat/chat.module';
import { BreathPageModule } from './pages/breath/breath.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        LoginPageModule,
        LandingPageModule,
        HomePageModule,
        ChatPageModule,
        BreathPageModule
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        }
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule {
}
