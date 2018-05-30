/* eslint-disable no-unused-vars, no-undef */

import { Component } from '@angular/core'

@Component({
  template: `
    <h2>Page not found</h2>
    <p>
      This means that something went wrong. If you can, please submit an issue on our GitHub repository.
    </p>
    <button class="btn btn-danger" (click)="openLink('https://github.com/malsf21/fair-chair/')">
      <fa-icon [icon]="['fab', 'github']"></fa-icon>
      GitHub Repository
    </button>
  `
  })
export class PageNotFoundComponent {
  openLink () {
    // this.electronService.shell.openExternal(link)
  }
}
