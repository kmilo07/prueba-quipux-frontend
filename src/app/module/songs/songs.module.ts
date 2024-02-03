import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: SongsComponent }];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class SongsRoutingModule{}

@NgModule({
  declarations: [
    SongsComponent
  ],
  imports: [
    CommonModule,
    SongsRoutingModule
  ]
})
export class SongsModule { }
