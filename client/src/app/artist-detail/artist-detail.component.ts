import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';
import { GLOBAL } from '../services/global';
import { User } from '../models/user';
import { Artist } from '../models/artist';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css'],
  providers:[UserService,ArtistService]
})
export class ArtistDetailComponent implements OnInit {


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

      this.title = 'Detalle Artista';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;

  }

ngOnInit() {
  this.getArtist();
  }


  getArtist(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._artistService.getArtist(this.token, id).subscribe(
          response =>{
            if(!response.artist){
              this._router.navigate(['/']);
            }else{
              this.artist = response.artist;
              //sacar los albums edl artista

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
        );
     });
  }

}


