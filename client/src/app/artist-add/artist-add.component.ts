import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {GLOBAL} from '../services/global';
import { User } from '../models/user';
import {Artist} from '../models/artist';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers: [UserService,ArtistService]
})
export class ArtistAddComponent implements OnInit {

  public title: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alert: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _artistService:ArtistService) { 

      this.title = 'Agregar Artista';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.artist = new Artist('','','');
    }

  ngOnInit() {
  }

  onSubmit(){

    console.log('asass');
    this._artistService.addArtist(this.token,this.artist).subscribe(
      response => {
      
        if(!response.artist){
          this.alert ="error al agregar el artista en el servidor"; 
        }else{
          this. artist = response.artist;
          this.alert = "Artista agregado correctamente "+this.artist.name;
          //this.artist = new Artist('','','');   
          //this._router.navigate(['/editar-artista'],response.artist._id);
             }
      },
      error => {
        var errorMessage  = <any> error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alert = body.message;

          console.log(error);
        }
      }
    )

  }

}
