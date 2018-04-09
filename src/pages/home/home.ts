/* eslint-disable no-unused-vars, no-undef */

import { Component, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { ElectronService } from 'ngx-electron'

@Component({
  selector: 'page-home',
  template: `
  <div class="jumbotron">
    <h1 class="display-3">Welcome to Fair Chair!</h1>
    <p class="lead">A desktop application that makes chairing Model UN committees easy.</p>
    <hr class="my-4">
    <p class="lead">
      <button class="btn btn-primary btn-lg" (click)="toList()">Try it now</button>
      <button class="btn btn-warning btn-lg" (click)="toGuide()">Learn how it works</button>
    </p>
  </div>
  <div class="card-deck">
    <div class="card border-success">
      <div class="card-body">
        <h2 class="card-title text-success"><i class="fa fa-smile"></i> Chairing Made Easy</h2>
        <p class="card-text">
          Fair Chair aims to make chairing simple and easy. No more annoyances with sizing and styling Google Docs, no more separate phone timer, no more managing multiple documents; instead, just use Fair Chair's list view that puts everything you need all in one place, and saves all of your lists in the app.
        </p>
      </div>
      <div class="card-footer">
        <button class="btn btn-success" (click)="toList()">
          <fa-icon [icon]="['fas', 'arrow-right']"></fa-icon>
          Try Now
        </button>
      </div>
    </div>
    <div class="card border-primary">
      <div class="card-body">
        <h2 class="card-title text-primary"><i class="fa fa-gavel"></i> Committees Made Fair</h2>
        <p class="card-text">
          Fair Chair also makes judging and participating in committees transparent and fair. You can project the list view to a large screen, and let everybody in the committee know who's on the speaker's list and how much time the current speaker has left. Plus, easily retain previous lists - no more arguing about who the last speaker in the list was!
        </p>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" (click)="toGuide()">
          <fa-icon [icon]="['fas', 'graduation-cap']"></fa-icon>
          Learn more
        </button>
      </div>
    </div>
    <div class="card border-danger">
      <div class="card-body">
        <h2 class="card-title text-danger"><i class="fa fa-heart"></i> Chairs That Care</h2>
        <p class="card-text">
          Fair Chair was originally developed by a seasoned committee chair to be used in their committee, and we want to make this an application that you'd use at your conference. We're always looking for your feedback to make Fair Chair better - if you have any questions, suggestions, or concerns, drop an issue on our GitHub repository.
        </p>
      </div>
      <div class="card-footer">
        <button class="btn btn-danger" (click)="openLink('https://github.com/malsf21/fair-chair/')">
          <fa-icon [icon]="['fab', 'github']"></fa-icon> 
          GitHub Repository
        </button>
      </div>
    </div>
  </div>
  `
  })

export class HomePageComponent {
  constructor (private router: Router, private electronService: ElectronService, private zone: NgZone) {
    this.electronService.ipcRenderer.on('to-home', (event: any) => {
      console.log(event)
      this.toHome()
    })
    this.electronService.ipcRenderer.on('to-lists', (event: any) => {
      console.log(event)
      this.toList()
    })
    this.electronService.ipcRenderer.on('to-guide', (event: any) => {
      console.log(event)
      this.toGuide()
    })
    this.electronService.ipcRenderer.on('to-settings', (event: any) => {
      console.log(event)
      this.toSettings()
    })
  }

  toHome () {
    this.zone.run(() => this.router.navigate(['/home-page']))
  }

  toList () {
    this.zone.run(() => this.router.navigate(['/lists-page']))
  }

  toGuide () {
    this.zone.run(() => this.router.navigate(['/guide-page']))
  }

  toSettings () {
    this.zone.run(() => this.router.navigate(['/settings-page']))
  }

  openLink (link: string) {
    this.electronService.shell.openExternal(link)
  }
}
