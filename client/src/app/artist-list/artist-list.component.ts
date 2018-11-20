import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {GLOBAL} from '../services/global';
import { User } from '../models/user';
import {Artist} from '../models/artist';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers:[UserService,ArtistService]
})

export class ArtistListComponent implements OnInit {

  public title: string;
  public artists: Artist[];
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;
  public alert;
  public confirmado;
  public removeId;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userSevice:UserService,
    private _artistSevice:ArtistService) { 

      this.title = 'Artistas';
      this.identity = this._userSevice.getIdentity();
      this.token = this._userSevice.getToken();
      this.url = GLOBAL.url;
      this.next_page =1;
      this.prev_page =1;
    }

  ngOnInit() {
    this.getArtists();
  }

  getArtists(){
    this._route.params.forEach((params: Params) =>{
      let page = +params['page']; 

      if(!page){
        page = 1;
      }else{
        this.next_page = page+1;
        this.prev_page = page-1;

        if (this.prev_page ==0){
          this.prev_page = 1;
        }
      }

      this._artistSevice.getArtists(this.token,page).subscribe(
        response =>{
          if(!response.artists){
            this._router.navigate(['/']);
          }else{
            this.artists = response.artists;
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
    });
  }

  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancel(id){
    this.confirmado = null;
  }

  onDeleteArtist(){

    this._artistSevice.deleteArtist(this.token,this.removeId).subscribe(
        response =>{
              if(!response.artist){
              alert("Error en el servidor")
            }else{
              this.getArtists();
            }
         },
        error => {
            var errorMessage  = <any> error;
            if(errorMessage != null){
              var body = JSON.parse(error._body);
              this.alert = body.message;
              console.log(error);
      }
    })
}


}
