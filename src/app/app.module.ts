/* eslint-disable no-unused-vars */

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'

import { HomePageComponent } from '../pages/home/home'
import { GuidePageComponent } from '../pages/guide/guide'
import { ListsPageComponent } from '../pages/lists/lists'
import { SettingsPageComponent } from '../pages/settings/settings'
import { PageNotFoundComponent } from '../pages/not-found/not-found'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRight,
  faBan,
  faBook,
  faCaretLeft,
  faCaretRight,
  faCode,
  faCog,
  faEdit,
  faExchangeAlt,
  faFolderOpen,
  faGraduationCap,
  faHeart,
  faHome,
  faList,
  faPause,
  faPlay,
  faPlus,
  faRedo,
  faSave,
  faStrikethrough,
  faTimes,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub
} from '@fortawesome/free-brands-svg-icons'

// Importing FA5 icons using "library" method. See at https://github.com/FortAwesome/angular-fontawesome

let iconList = [
  faArrowRight,
  faBan,
  faBook,
  faCaretLeft,
  faCaretRight,
  faCode,
  faCog,
  faEdit,
  faExchangeAlt,
  faFolderOpen,
  faGithub,
  faGraduationCap,
  faHeart,
  faHome,
  faList,
  faPause,
  faPlay,
  faPlus,
  faRedo,
  faSave,
  faStrikethrough,
  faTimes,
  faUser
]

for (let i = 0; i < iconList.length; i++) {
  library.add(iconList[i])
}

@NgModule({
  imports: [
  BrowserModule,
  FontAwesomeModule,
  FormsModule,
  AppRoutingModule
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
