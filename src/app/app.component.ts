/* eslint-disable no-unused-vars, no-undef */

import { Component } from '@angular/core'
import { ElectronService } from 'ngx-electron'

@Component({
  selector: 'app-root',
  template: `
  <div class="container-fluid">
    <div class="row">
      <nav [hidden]="!showSidebar" class="col-2 bg-dark sidebar">
        <img class="sidebar-logo" src="assets/img/logo.png"/>
        <h1 class="pl-1 mt-1">Fair Chair</h1>
        <div class="pl-1">
          Making chairing easy.
        </div>
        <hr style="border-color:inherit" />
        <ul class="nav nav-pills flex-column sidebar-nav" id="mainNav" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" routerLink="/home-page" routerLinkActive="active">
              <fa-icon [icon]="['fas', 'home']" [fixedWidth]="true"></fa-icon> Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/lists-page" routerLinkActive="active">
              <fa-icon [icon]="['fas', 'list']" [fixedWidth]="true"></fa-icon> Lists
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/guide-page" routerLinkActive="active">
              <fa-icon [icon]="['fas', 'book']" [fixedWidth]="true"></fa-icon> Guide
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/settings-page" routerLinkActive="active">
              <fa-icon [icon]="['fas', 'cog']" [fixedWidth]="true"></fa-icon> Settings
            </a>
          </li>
        </ul>
        <div class="sidebar-footer">
          <fa-icon [icon]="['fas', 'code']"></fa-icon>
          <fa-icon [icon]="['fas', 'heart']" style="color:tomato"></fa-icon>
          <a (click)="openLink('https://github.com/malsf21/fair-chair/')">
            <fa-icon [icon]="['fab', 'github']"></fa-icon>
          </a>
          <span (click)="openLink('https://matthewwang.me')"><u>by Matthew Wang</u>
          </span>
        </div>
      </nav>
      <main role="main" [ngClass]="{'col-10': showSidebar, 'col-12': !showSidebar }" class="mt-3 app-main">
      <a class="sidebar-toggle-button" (click)="toggleSidebar()">
        <div [hidden]="!showSidebar">
          <fa-icon [icon]="['fas', 'caret-left']" style="color:white;" size="2x"></fa-icon>
        </div>
        <div [hidden]="showSidebar">
          <fa-icon [icon]="['fas', 'caret-right']" size="2x"></fa-icon>
        </div>
      </a>
      <router-outlet></router-outlet>
      </main>
    </div>
  </div>
  `
  })
export class AppComponent {
  showSidebar: boolean;
  constructor (private electronService: ElectronService) {
    this.showSidebar = true
  }
  toggleSidebar () {
    this.showSidebar = !this.showSidebar
  }
  openLink (link: string) {
    this.electronService.shell.openExternal(link)
  }
}
