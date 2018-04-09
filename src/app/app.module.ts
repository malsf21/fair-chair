/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
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

import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faStrikethrough } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

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
