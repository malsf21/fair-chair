import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomePageComponent } from '../pages/home/home';
import { ListsPageComponent } from '../pages/lists/lists';
import { SettingsPageComponent } from '../pages/settings/settings';
import { PageNotFoundComponent } from '../pages/not-found/not-found';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    ListsPageComponent,
    SettingsPageComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
