import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-fluid">
    <div class="row">
      <nav class="col-sm-2 d-none d-sm-block bg-dark sidebar">
        <h1 class="sidebar-title">Fair Chair</h1>
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
            <a class="nav-link" routerLink="/settings-page" routerLinkActive="active">
              <i class="fa fa-fw fa-cog"></i> Settings
            </a>
          </li>
        </ul>
        <div class="sidebar-footer">
          <i class="fa fa-fw fa-code"></i> <i class="fa fa-fw fa-heart" style="color:tomato;"></i> <i class="fab fa-fw fa-github"></i> by Matthew Wang
        </div>
      </nav>
      <main role="main" class="col-sm-10 ml-sm-auto pt-3">
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>
  `
})
export class AppComponent {
}
