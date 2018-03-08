import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-lists',
  template: `
  <div class="list-view">
    <div class="row">
        <div class="col mb-2 text-left">
          <button type="button" class="btn btn-primary"><i class="fa fa-list"></i> Browse Lists</button>
          <button type="button" class="btn btn-success"><i class="fa fa-plus"></i> New List</button>
          <button type="button" class="btn btn-warning"><i class="fa fa-edit"></i> Edit Current list</button>
        </div>
      <div class="col text-right">
        <h2>{{ currentTime }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-9">
        <div class="card border-secondary mb-2">
          <div class="card-body text-center">
            <div class="text-center pt-3 pb-3">
              <div class="text-muted">Topic</div>
              <h1 class="display-4">{{ title }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card border-secondary mb-2">
          <div class="card-body text-center">
            <h1 class="display-4">{{ timerTime }}s</h1>
            <button type="button" class="btn" [ngClass]="{'btn-success': !timerOn, 'btn-warning': timerOn }" (click)="toggleTimer()">
            <span [hidden]="timerOn"><i class="fa fa-play"></i> Go</span>
            <span [hidden]="!timerOn"><i class="fa fa-pause"></i> Pause</span>
            </button>
            <button type="button" class="btn btn-danger" (click)="resetTimer()"><i class="fa fa-redo"></i> Reset</button>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Delegate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let delegate of delegateList; let i = index" [ngClass]="{'strikethrough': delegate[1]}">
            <td>{{ i + 1 }}</td>
            <td>{{ delegate[0] }}</td>
            <td>
              <button class="btn btn-success btn-sm" (click)="strikeDelegate(i)"><i class="fa fa-strikethrough"></i></button>
              <button class="btn btn-danger btn-sm" (click)="removeDelegate(i)"><i class="fa fa-times"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="list-input-footer row">
    <div class="input-group">
      <div class="input-group-addon"><i class="fa fa-user"></i></div>
      <input type="text" (keyup.enter)="addDelegate(delegateInput.value)" class="form-control" placeholder="Add delegate..." id="delegateInput" #delegateInput>
    </div>
  </div>
  `
})

export class ListsPageComponent implements OnInit {
  title: string;
  currentTime: string;
  timerTime: number;
  timeLimit: number;
  timerOn: boolean;
  timerObject: any;
  delegateList: any;

  constructor (){
    this.title = "Post-Syria Reconstruction";
    this.timerTime = 90;
    this.timeLimit = 90;
    this.timerOn = false;
    this.delegateList = [
      ["China", false],
      ["United States", false],
      ["France", false]
    ]
  }

  toggleTimer(){
    if(this.timerOn) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.timerObject = setInterval(() => {
      this.timerTime --;
    }, 1000);
    this.timerOn = true;
  }

  stopTimer() {
    clearInterval(this.timerObject);
    this.timerOn = false;
  }

  resetTimer(){
    this.stopTimer();
    this.timerTime = this.timeLimit;
  }

  setTimer(time: number){
    this.timeLimit = time;
  }

  calculateTime(){
    let time = new Date()
    this.currentTime = ("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2)
  }

  addDelegate(delegate: string){
    if (delegate.replace(/ /g,'') != ""){
      this.delegateList.push([delegate, false])
    }
    (<HTMLInputElement>document.getElementById("delegateInput")).value = "";
  }

  strikeDelegate(delegateId: number){
    this.delegateList[delegateId][1] = !this.delegateList[delegateId][1];
  }

  removeDelegate(delegateId: number){
    this.delegateList.splice(delegateId, 1)
  }

  ngOnInit() {
    this.calculateTime();
    setInterval(() => {
      this.calculateTime()
    }, 30000);
  }
}