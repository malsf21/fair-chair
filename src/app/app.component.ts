import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

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
      <main role="main" [ngClass]="{'col-10': showSidebar, 'col-12': !showSidebar }" class="mt-3 app-main">
      <a class="sidebar-toggle-button" (click)="toggleSidebar()">
        <div [hidden]="!showSidebar"><i class="fa fa-2x fa-caret-left" style="color:white;"></i></div>
        <div [hidden]="showSidebar"><i class="fa fa-2x fa-caret-right"></i></div>
      </a>
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>
  `
})
export class AppComponent {
  showSidebar: boolean;
  constructor (private electronService: ElectronService){
    this.showSidebar = true;
  }
  toggleSidebar(){
    this.showSidebar = !this.showSidebar;
  }
  openLink(link: string){
    this.electronService.shell.openExternal(link);
  }
}
