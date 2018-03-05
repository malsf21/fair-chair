import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  template: `
  <div class="jumbotron">
    <h1 class="display-3">Welcome to Fair Chair</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <p class="lead">
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </p>
  </div>
  `
})

export class HomePageComponent { }
