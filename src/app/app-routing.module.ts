import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SongsComponent } from './module/songs/songs.component';
//import { authGuard } from './guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // canActivate:[authGuard],
    children: [
      {
        path: '',
        component: SongsComponent
      },
      {
        path: 'songs',
        loadChildren: () =>
          import('./module/songs/songs.module').then((m) => m.SongsModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./module/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
