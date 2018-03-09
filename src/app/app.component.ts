import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-fluid">
    <div class="row">
      <nav class="col-sm-2 d-none d-sm-block bg-dark sidebar">
        <img class="sidebar-logo" src="assets/img/logo.png"/>
        <h1 class="sidebar-title mt-1">Fair Chair</h1>
        <div class="sidebar-subtitle">
          Making chairing easy.
        </div>
        <hr style="border-color:inherit" />
        <ul class="nav nav-pills flex-column sidebar-nav" id="mainNav" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" routerLink="/home-page" routerLinkActive="active">
              <i class="fa fa-fw fa-home"></i> Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/lists-page" routerLinkActive="active">
              <i class="fa fa-fw fa-list"></i> Lists
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/guide-page" routerLinkActive="active">
              <i class="fa fa-fw fa-book"></i> Guide
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/settings-page" routerLinkActive="active">
              <i class="fa fa-fw fa-cog"></i> Settings
            </a>
          </li>
        </ul>
        <div class="sidebar-footer">
          <i class="fa fa-fw fa-code"></i> <i class="fa fa-fw fa-heart" style="color:tomato;"></i> <a (click)="openLink('https://github.com/malsf21/fair-chair/')"><i class="fab fa-fw fa-github"></i></a> <span (click)="openLink('https://matthewwang.me')"><u>by Matthew Wang</u></span>
        </div>
      </nav>
      <main role="main" class="col-sm-10 ml-sm-auto mt-3 app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>
  `
})
export class AppComponent {
  constructor (private electronService: ElectronService){
  }
  openLink(link: string){
    this.electronService.shell.openExternal(link);
  }
}
