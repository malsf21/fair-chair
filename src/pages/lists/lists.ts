import { Component } from '@angular/core';

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
        <h2>19:89 PM</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-9">
        <div class="card border-secondary mb-2">
          <div class="card-body text-center">
            <div class="text-center pt-3 pb-3">
              <div class="text-muted">Topic</div>
              <h1 class="display-4">Post-Syria Reconstruction</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card border-secondary mb-2">
          <div class="card-body text-center">
            <h1 class="display-4">90s</h1>
            <button type="button" class="btn btn-success"><i class="fa fa-play"></i> Go</button>
            <button type="button" class="btn btn-danger"><i class="fa fa-redo"></i> Reset</button>
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
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Lorem</td>
            <td>ipsum</td>
            <td>dolor</td>
            <td>sit</td>
          </tr>
          <tr>
            <td>2</td>
            <td>amet</td>
            <td>consectetur</td>
            <td>adipiscing</td>
            <td>elit</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Integer</td>
            <td>nec</td>
            <td>odio</td>
            <td>Praesent</td>
          </tr>
          <tr>
            <td>4</td>
            <td>libero</td>
            <td>Sed</td>
            <td>cursus</td>
            <td>ante</td>
          </tr>
          <tr>
            <td>4</td>
            <td>libero</td>
            <td>Sed</td>
            <td>cursus</td>
            <td>ante</td>
          </tr>
          <tr>
            <td>4</td>
            <td>libero</td>
            <td>Sed</td>
            <td>cursus</td>
            <td>ante</td>
          </tr>
          <tr>
            <td>4</td>
            <td>libero</td>
            <td>Sed</td>
            <td>cursus</td>
            <td>ante</td>
          </tr>
          <tr>
            <td>4</td>
            <td>libero</td>
            <td>Sed</td>
            <td>cursus</td>
            <td>ante</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="list-input-footer row">
    <div class="input-group">
      <div class="input-group-addon"><i class="fa fa-user"></i></div>
      <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Add delegate...">
    </div>
  </div>
  `
})

export class ListsPageComponent { }
