import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { RouterModule, Routes } from '@angular/router';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: SongsComponent }];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class SongsRoutingModule{}

@NgModule({
  declarations: [
    SongsComponent,
    FormModalComponent,

  ],
  imports: [
    CommonModule,
    SongsRoutingModule,
    ReactiveFormsModule
  ]
})
export class SongsModule { }
