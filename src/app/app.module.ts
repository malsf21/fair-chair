/* eslint-disable no-unused-vars */

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { NgxElectronModule } from 'ngx-electron'
import { NgxFsModule } from 'ngx-fs'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'

import { HomePageComponent } from '../pages/home/home'
import { GuidePageComponent } from '../pages/guide/guide'
import { ListsPageComponent } from '../pages/lists/lists'
import { SettingsPageComponent } from '../pages/settings/settings'
import { PageNotFoundComponent } from '../pages/not-found/not-found'

@NgModule({
  imports: [
  BrowserModule,
  FormsModule,
  AppRoutingModule,
  NgxElectronModule,
  NgxFsModule
  ],
  declarations: [
  AppComponent,
  HomePageComponent,
  GuidePageComponent,
  ListsPageComponent,
  SettingsPageComponent,
  PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
  })
export class AppModule { }
