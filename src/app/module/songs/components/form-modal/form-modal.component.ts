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
    if(this.form.valid){
      this.songsService.savePlayList(this.form.value).subscribe(
        {
          complete() {
            window.location.reload();
          },
        }
      )
    }
    else{
      alert("Faltan campos por llenar")
    }
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
      titulo: ['',Validators.required],
      artista: ['',Validators.required],
      album: ['',Validators.required],
      anno: ['',Validators.required],
      genero: ['',Validators.required],
    })
  }

  get canciones(): FormArray{
    return this.form.get('canciones') as FormArray
  } 
}
