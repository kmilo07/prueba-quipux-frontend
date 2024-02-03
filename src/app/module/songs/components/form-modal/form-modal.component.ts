import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SongsService } from '../../../../service/songs.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit{
  
  form!: FormGroup;
  
  constructor(private builderForm:FormBuilder, private songsService: SongsService){}
  
  ngOnInit(): void {
    this.buildForm();
  }

  saveSong():void{
    console.log(this.form);
    this.songsService.savePlayList(this.form.value).subscribe(
      {
        complete() {
          window.location.reload();
        },
      }
    )
  }

  private buildForm(): void{
    this.form = this.builderForm.group({
      nombre: ['',Validators.required],
      descripcion: ['', Validators.required],
      canciones: this.builderForm.array([])
    })
  }

  addSong(): void{
    this.canciones.push(this.buildSong())
  }

  private buildSong(): FormGroup{
    return this.builderForm.group({
      titulo: '',
      artista: '',
      album: '',
      anno: '',
      genero: '',
    })
  }

  get canciones(): FormArray{
    return this.form.get('canciones') as FormArray
  } 
}
