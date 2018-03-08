import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { FsService } from 'ngx-fs';

@Component({
  selector: 'page-settings',
  template: `
  <div class="card border-primary">
    <div class="card-body">
      <h1>Settings</h1>
      <hr />
      <div class="row">
        <div class="col">
          <h2>Import/Export Saves</h2>
        </div>
        <div class="col text-right">
          <button class="btn btn-primary" (click)="importList()"><i class="fa fa-download"></i> Import Lists</button>
          <button class="btn btn-primary" (click)="exportList()"><i class="fa fa-upload"></i> Export Lists</button>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col">
          <h2>Clear LocalStorage</h2>
        </div>
        <div class="col text-right">
          <button class="btn btn-danger" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-times"></i> Clear All Data</button>
        </div>
      </div>
    </div>
  </div>
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

  constructor (private electronService: ElectronService, private fsService: FsService){
  }

  importList(){
    let filepath = this.electronService.remote.dialog.showOpenDialog({
      properties: ['openFile', 'createDirectory'],
      filters: [
        {
          name: 'JSON File',
          extensions: ['json']
        }
      ]
    })
    if (filepath){
      let filepathStr = filepath[0]
      this.fsService.fs.readFile(filepathStr, 'utf8', (err: any, data: any) => {
          if (err) {
            let failureNotification = new Notification('Export Failed', {
              body: 'Uh oh, file import has failed. Try again!'
            })
          }
          else {
            let dataJSON = JSON.parse(data)
            console.log(dataJSON)
            localStorage.setItem("currentId", dataJSON["appState"]["currentId"])
            localStorage.setItem("listArr", JSON.stringify(dataJSON["listsArray"]))
            let successNotification = new Notification('Export Successful', {
              body: 'Great success! Your savefile has imported!'
            })
          }
      });
    }
  }

  exportList(){
    let filepath = this.electronService.remote.dialog.showSaveDialog({
      defaultPath: "fair-chair-savefile.json",
      filters: [
        {
          name: 'JSON File',
          extensions: ['json']
        }
      ]
    })
    if (filepath){
      let constructedObject = {
        appState: {
          currentId: localStorage["currentId"]
        },
        listsArray: JSON.parse(localStorage["listArr"])
      };
      console.log(constructedObject);
      this.fsService.fs.writeFile(filepath, JSON.stringify(constructedObject), 'utf8', (err: any) => {
        if (err){
          let failureNotification = new Notification('Export Failed', {
            body: 'Uh oh, file export has failed. Try again!'
          })
        }
        else{
          let successNotification = new Notification('Export Successful', {
            body: 'Great success! Your savefile has exported!'
          })
        }
      });
    }
  }

  deleteLocalStorage(){
    localStorage.removeItem("currentId");
    localStorage.removeItem("listArr")
    let successNotification = new Notification('All Data Deleted!', {
      body: 'Say your goodbyes, all your data is gone!'
    })
  }

}
