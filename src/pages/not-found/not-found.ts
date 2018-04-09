/* eslint-disable no-unused-vars, no-undef */

import { Component } from '@angular/core'
import { ElectronService } from 'ngx-electron'

@Component({
  template: `
    <h2>Page not found</h2>
    <p>This means that something went wrong. If you can, please submit an issue on our GitHub repository.</p>
    <button class="btn btn-danger" (click)="openLink('https://github.com/malsf21/fair-chair/')"><i class="fab fa-github"></i> GitHub Repository</button>
  `
  })
export class PageNotFoundComponent {
  openLink (link: string) {
    this.electronService.shell.openExternal(link)
  }
}
