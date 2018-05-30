/* eslint-disable no-unused-vars, no-undef */

import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'page-lists',
  template: `
  <div class="list-view">
    <div class="row">
        <div class="col-9 mb-2 text-left">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#browseModal">
            <fa-icon [icon]="['fas', 'list']"></fa-icon>
            Browse
          </button>
          <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal">
            <fa-icon [icon]="['fas', 'edit']"></fa-icon>
            Edit
          </button>
          <button type="button" class="btn btn-success" data-toggle="modal" data-target="#newModal">
            <fa-icon [icon]="['fas', 'plus']"></fa-icon>
            New
          </button>
        </div>
      <div class="col-3 text-right">
        <h2>{{ currentTime }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-9">
        <div class="card mb-2">
          <div class="card-body text-center">
            <div class="text-center pt-3 pb-3">
              <h1 class="display-4">{{ title }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-2">
          <div class="card-body text-center">
            <h1 class="display-4">{{ timerTime }}s</h1>
            <button type="button" class="btn" [ngClass]="{'btn-success': !timerOn, 'btn-warning': timerOn }" (click)="toggleTimer()">
            <span [hidden]="timerOn"><fa-icon [icon]="['fas', 'play']"></fa-icon></span>
            <span [hidden]="!timerOn"><fa-icon [icon]="['fas', 'pause']"></fa-icon></span>
            </button>
            <button type="button" class="btn btn-danger" (click)="resetTimer()">
              <fa-icon [icon]="['fas', 'redo']"></fa-icon>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive list-table">
      <table class="table table-striped fa-2x">
        <thead>
          <tr>
            <th>#</th>
            <th>Delegate</th>
            <th class="text-right">
              <button class="btn btn-warning btn-sm" (click)="unstrikeAllDelegates()">
                <fa-icon [icon]="['fas', 'ban']"></fa-icon>
              </button>
              <button class="btn btn-success btn-sm" (click)="strikeAllDelegates()">
                <fa-icon [icon]="['fas', 'strikethrough']"></fa-icon>
              </button>
              <button class="btn btn-danger btn-sm" (click)="removeAllDelegates()">
                <fa-icon [icon]="['fas', 'times']"></fa-icon>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let delegate of delegateList; let i = index">
            <td [ngClass]="{'strikethrough': delegate[1]}">{{ i + 1 }}</td>
            <td [ngClass]="{'strikethrough': delegate[1]}">{{ delegate[0] }}</td>
            <td class="text-right">
              <button class="btn btn-success btn-sm" (click)="strikeDelegate(i)">
                <fa-icon [icon]="['fas', 'strikethrough']"></fa-icon>
              </button>
              <button class="btn btn-danger btn-sm" (click)="removeDelegate(i)">
                <fa-icon [icon]="['fas', 'times']"></fa-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="list-input-footer row">
    <div class="input-group">
      <div class="input-group-addon"><fa-icon [icon]="['fas', 'user']"></fa-icon></div>
      <input type="text" (keyup.enter)="addDelegate(delegateInput.value)" class="form-control list-input-text" placeholder="Add delegate..." id="delegateInput" #delegateInput />
    </div>
  </div>
  <div class="modal fade" id="browseModal" tabindex="-1" role="dialog" aria-labelledby="browseModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="browseModalLabel">Browse Lists</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Speaking Time</th>
                <th># on Speaker List</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let list of totalListArr; let i = index">
                <td>{{ list.title }}</td>
                <td>{{ list.timerTimeLimit }}</td>
                <td>{{ list.delegateList.length }}</td>
                <td class="text-right">
                  <button class="btn btn-primary btn-sm" (click)="switchToList(i)">
                    <fa-icon [icon]="['fas', 'exchange-alt']"></fa-icon>
                  </button>
                  <button class="btn btn-danger btn-sm" (click)="deleteList(i)">
                    <fa-icon [icon]="['fas', 'times']"></fa-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">Edit Current List</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form #f="ngForm" (ngSubmit)="updateList()">
          <div class="modal-body">
            <div class="form-group">
              <label for="title">List Title</label>
              <input class="form-control" type="text" name="newTitle" [(ngModel)]="newTitle" id="title" />
            </div>
            <div class="form-group">
              <label for="timerTimeLimit">Timer Max Time</label>
              <input class="form-control" type="number" name="newTimerTimeLimit" [(ngModel)]="newTimerTimeLimit" id="timerTimeLimit"/>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal fade" id="newModal" tabindex="-1" role="dialog" aria-labelledby="newModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newModalLabel">New List</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="newTitle">List Title</label>
            <input class="form-control" type="text" [(ngModel)]="newTitle" id="newTitle" />
          </div>
          <div class="form-group">
            <label for="newTimerTimeLimit">Timer Max Time</label>
            <input class="form-control" type="number" [(ngModel)]="newTimerTimeLimit" id="newTimerTimeLimit" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-success" data-dismiss="modal" (click)="createList()">Create List</button>
        </div>
      </div>
    </div>
  </div>
  `
  })

export class ListsPageComponent implements OnInit, OnDestroy {
  listId: any;
  totalListArr: any;
  title: string;
  currentTime: string;
  timerTime: number;
  timerTimeLimit: number;
  timerOn: boolean;
  timerObject: any;
  delegateList: any;
  newTitle: string;
  newTimerTimeLimit: number;
  timerAudio: any;

  constructor () {
    this.newTitle = 'Sample Caucas Topic'
    this.newTimerTimeLimit = 30
    if (!localStorage['currentId']) {
      console.log('No current list, found, generating sample')
      this.delegateList = [
        ['China', false],
        ['United States', false],
        ['France', false]
      ]
      this.createList()
    } else {
      this.switchToList(localStorage['currentId'])
    }
    this.timerTime = this.timerTimeLimit
    this.timerOn = false
    this.timerAudio = new Audio('./assets/sounds/timer-up.mp3')
  }

  addList (id?: number) {
    let tempListArr
    let listId
    let construct

    if (localStorage['listArr']) {
      tempListArr = JSON.parse(localStorage['listArr'])
    } else {
      tempListArr = []
    }

    construct = {
      'title': this.title,
      'timerTimeLimit': this.timerTimeLimit,
      'delegateList': this.delegateList
    }

    if (id) {
      listId = id
      tempListArr[id] = construct
    } else {
      listId = tempListArr.length
      tempListArr.push(construct)
    }
    console.log(tempListArr)
    localStorage.setItem('listArr', JSON.stringify(tempListArr))
    return listId
  }

  createList () {
    this.delegateList = []
    if (this.newTitle.replace(/ /g, '') === '') {
      this.newTitle = 'Title'
    }
    this.title = this.newTitle
    if (this.newTimerTimeLimit <= 1) {
      this.newTimerTimeLimit = 30
    }
    this.timerTimeLimit = this.newTimerTimeLimit
    this.switchToList(this.addList())
  }

  updateList () {
    if (this.newTitle.replace(/ /g, '') === '') {
      this.newTitle = 'Title'
    }
    this.title = this.newTitle
    if (this.newTimerTimeLimit <= 1) {
      this.newTimerTimeLimit = 30
    }
    this.timerTimeLimit = this.newTimerTimeLimit
    this.switchToList(this.addList(this.listId))
    // $('#editModal').modal('hide') // FIXME
  }

  switchToList (id: number) {
    this.listId = id
    localStorage.setItem('currentId', this.listId)
    console.log('Switching to list ' + this.listId)
    this.totalListArr = JSON.parse(localStorage['listArr'])
    console.log(this.totalListArr)
    let currentListArr = this.totalListArr[this.listId]
    this.title = currentListArr['title']
    this.timerTimeLimit = currentListArr['timerTimeLimit']
    this.newTitle = this.title
    this.newTimerTimeLimit = this.timerTimeLimit
    this.delegateList = currentListArr['delegateList']
    this.resetTimer()
  }

  deleteList (id: number) {
    let tempListArr
    tempListArr = JSON.parse(localStorage['listArr'])
    tempListArr.splice(id, 1)
    this.totalListArr = tempListArr
    localStorage.setItem('listArr', JSON.stringify(tempListArr))
    if (id === this.listId && tempListArr.length !== 0) {
      this.switchToList(0)
    } else if (id === this.listId) {
      this.newTitle = 'Sample Caucas Topic'
      this.newTimerTimeLimit = 30
      this.createList()
    }
  }

  deleteLists () {
    localStorage.removeItem('currentId')
    localStorage.removeItem('listArr')
  }

  toggleTimer () {
    if (this.timerOn) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  startTimer () {
    this.timerObject = setInterval(() => {
      if (this.timerTime === 0) {
        this.timerAudio.play()
        this.stopTimer()
      } else {
        this.timerTime--
      }
    }, 1000)
    this.timerOn = true
  }

  stopTimer () {
    clearInterval(this.timerObject)
    this.timerOn = false
  }

  resetTimer () {
    this.stopTimer()
    this.timerTime = this.timerTimeLimit
  }
  /*
  setTimer(time: number){
    this.timerTimeLimit = time;
  }
  */

  calculateTime () {
    let time = new Date()
    this.currentTime = ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2)
  }

  addDelegate (delegate: string) {
    if (delegate.replace(/ /g, '') !== '') {
      this.delegateList.push([delegate, false])
    }
    $('#delegateInput').val('')
    this.addList(this.listId)
  }

  strikeDelegate (delegateId: number) {
    this.delegateList[delegateId][1] = !this.delegateList[delegateId][1]
    this.addList(this.listId)
  }

  strikeAllDelegates () {
    for (let i = 0; i < this.delegateList.length; i++) {
      this.delegateList[i][1] = 1
    }
    this.addList(this.listId)
  }

  unstrikeAllDelegates () {
    for (let i = 0; i < this.delegateList.length; i++) {
      this.delegateList[i][1] = 0
    }
    this.addList(this.listId)
  }

  removeDelegate (delegateId: number) {
    this.delegateList.splice(delegateId, 1)
    this.addList(this.listId)
  }

  removeAllDelegates () {
    this.delegateList = []
    this.addList(this.listId)
  }

  ngOnInit () {
    this.calculateTime()
    setInterval(() => {
      this.calculateTime()
    }, 30000)
  }
  ngOnDestroy () {
    this.addList(this.listId)
  }
}
