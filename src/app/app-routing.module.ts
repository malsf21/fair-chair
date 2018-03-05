import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { HomePageComponent } from '../pages/home/home';
import { ListsPageComponent } from '../pages/lists/lists';
import { SettingsPageComponent } from '../pages/settings/settings';
import { PageNotFoundComponent } from '../pages/not-found/not-found';

const appRoutes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'lists-page', component: ListsPageComponent },
  { path: 'settings-page', component: SettingsPageComponent },
  { path: '',   redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
