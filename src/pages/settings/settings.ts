import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { FsService } from 'ngx-fs';

@Component({
  selector: 'page-settings',
  template: `
    <div class="row">
      <div class="col">
        <div class="card card-border-primary">
          <div class="card-body">
            <h1>Settings</h1>
            <hr />
            <button class="btn btn-primary" (click)="importList()"><i class="fa fa-download"></i> Import Lists</button>
            <button class="btn btn-primary" (click)="exportList()"><i class="fa fa-upload"></i> Export Lists</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card card-border-primary">
          <h1>Other Things!</h1>
        </div>
      </div>
    </div>
  `
})

export class SettingsPageComponent {

  constructor (private electronService: ElectronService, private fsService: FsService){
  }

  importList(){
    this.electronService.remote.dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
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

}
