import { Component, OnInit } from '@angular/core';
import { Peticion } from 'src/app/model/peticion';
import { SongsService } from 'src/app/service/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit {
  listPeticion: Peticion[] = [];
  ngOnInit(): void {
    this.getAllPlayList();
  }

  constructor(private songsService: SongsService) {}

  getAllPlayList(): void {
    this.songsService
      .getAllPlayList()
      .subscribe((list) => {
        this.listPeticion = [];
        this.listPeticion = list;
      });
  }

  getPlayList(name: string): void {
    if(name!=''){
      this.songsService.getPlayListByName(name).subscribe((value) => {
        this.listPeticion = [];
        this.listPeticion.push(value);
      });
    }else{
      this.getAllPlayList();
    }
  }

  deletePlayList(name: string): void{
    console.log(name);
    this.songsService.deletePlayList(name).subscribe({
      complete() {
        window.location.reload();
      },
    })
  }
}
