/* eslint-disable no-unused-vars, no-undef */

import { Component } from '@angular/core'
import { ElectronService } from 'ngx-electron'
import { FsService } from 'ngx-fs'

@Component({
  selector: 'page-settings',
  template: `
  <div class="card border-primary">
    <div class="card-body">
      <h1>Settings</h1>
      <hr />
      <div class="row">
        <div class="col">
          <h2>Save/Load</h2>
        </div>
        <div class="col text-right">
          <button class="btn btn-primary" (click)="exportList()">
            <fa-icon [icon]="['fas', 'save']"></fa-icon>
            Save Lists
          </button>
          <button class="btn btn-primary" (click)="importList()">
            <fa-icon [icon]="['fas', 'folder-open']"></fa-icon>
            Load Lists
          </button>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col">
          <h2>Clear LocalStorage</h2>
        </div>
        <div class="col text-right">
          <button class="btn btn-danger" data-toggle="modal" data-target="#deleteModal">
            <fa-icon [icon]="['fas', 'times']"></fa-icon>
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="card border-primary mt-2">
    <div class="card-body">
      <h1>App Info</h1>
      <hr />
      <p>
        Fair Chair was developed by <a (click)="openLink('https://matthewwang.me/')" href="#">Matthew Wang</a>, a three-time conference chair, computer lover, and professional procrastinator. It was originally developed for <a (click)="openLink('https://omun.ca/')" href="#">Ontario Model United Nations</a>.
      </p>
      <p>
        Fair Chair was made with <a (click)="openLink('https://electronjs.org/')" href="#">Electron</a>, <a (click)="openLink('https://electronforge.io/')" href="#">Electron Forge</a>, <a (click)="openLink('https://angular.io/')" href="#">Angular</a>, <a (click)="openLink('https://getbootstrap.com/')" href="#">Bootstrap</a>, and the <a (click)="openLink('https://bootswatch.com/materia/')" href="#">Materia Bootstrap theme</a>. You can find the full dependency list and learn more about how Fair Chair was made on the <a (click)="openLink('https://github.com/malsf21/fair-chair/')" href="#">GitHub repo</a>.
      </p>
    </div>
  </div>
  <ul class="list-group mt-2">
    <li class="list-group-item d-flex justify-content-between align-items-center">
      App Version
      <span class="badge badge-primary badge-pill">{{ appVersion }}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Electron Version
      <span class="badge badge-primary badge-pill">{{ electronVersion }}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Chrome Version
      <span class="badge badge-primary badge-pill">{{ chromeVersion }}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Node Version
      <span class="badge badge-primary badge-pill">{{ nodeVersion }}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      App Path
      <span class="badge badge-primary badge-pill">{{ appPath }}</span>
    </li>
  </ul>
  <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Confirm Delete All Data</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete all your data? Once deleted, it's unrecoverable.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal" (click)="deleteLocalStorage()">Delete</button>
        </div>
      </div>
    </div>
  </div>
  `
  })

export class SettingsPageComponent {
  appVersion: string;
  appPath: string;
  electronVersion: string;
  chromeVersion: string;
  nodeVersion: string;

  constructor (private electronService: ElectronService, private fsService: FsService) {
    this.appVersion = this.electronService.remote.app.getVersion()
    this.appPath = this.electronService.remote.app.getAppPath()
    this.electronVersion = this.electronService.process.versions.electron
    this.chromeVersion = this.electronService.process.versions.chrome
    this.nodeVersion = this.electronService.process.versions.node

    this.electronService.ipcRenderer.on('export-savefile', (event: any) => {
      console.log(event)
      this.exportList()
    })

    this.electronService.ipcRenderer.on('import-savefile', (event: any) => {
      console.log(event)
      this.importList()
    })
  }

  importList () {
    let filepath = this.electronService.remote.dialog.showOpenDialog({
      properties: ['openFile', 'createDirectory'],
      filters: [
        {
          name: 'JSON File',
          extensions: ['json']
        }
      ]
    })
    if (filepath) {
      let filepathStr = filepath[0]
      this.fsService.fs.readFile(filepathStr, 'utf8', (err: any, data: any) => {
        if (err) {
          let failureNotification = new Notification('Export Failed', {
            body: 'Uh oh, file import has failed. Try again!'
          })
        } else {
          let dataJSON = JSON.parse(data)
          console.log(dataJSON)
          localStorage.setItem('currentId', dataJSON['appState']['currentId'])
          localStorage.setItem('listArr', JSON.stringify(dataJSON['listsArray']))
          let successNotification = new Notification('Export Successful', {
            body: 'Great success! Your savefile has imported!'
          })
        }
      })
    }
  }

  exportList () {
    let filepath = this.electronService.remote.dialog.showSaveDialog({
      defaultPath: 'fair-chair-savefile.json',
      filters: [
        {
          name: 'JSON File',
          extensions: ['json']
        }
      ]
    })
    if (filepath) {
      let constructedObject = {
        appState: {
          currentId: localStorage['currentId']
        },
        listsArray: JSON.parse(localStorage['listArr'])
      }
      console.log(constructedObject)
      this.fsService.fs.writeFile(filepath, JSON.stringify(constructedObject), 'utf8', (err: any) => {
        if (err) {
          let failureNotification = new Notification('Export Failed', {
            body: 'Uh oh, file export has failed. Try again!'
          })
        } else {
          let successNotification = new Notification('Export Successful', {
            body: 'Great success! Your savefile has exported!'
          })
        }
      })
    }
  }

  deleteLocalStorage () {
    localStorage.removeItem('currentId')
    localStorage.removeItem('listArr')
    let successNotification = new Notification('All Data Deleted!', {
      body: 'Say your goodbyes, all your data is gone!'
    })
  }

  openLink (link: string) {
    this.electronService.shell.openExternal(link)
  }
}
