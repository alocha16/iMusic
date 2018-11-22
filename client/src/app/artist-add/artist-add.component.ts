import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {UploadService} from '../services/upload.service';
import {GLOBAL} from '../services/global';
import { User } from '../models/user';
import {Artist} from '../models/artist';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers: [UserService,ArtistService,UploadService]
})
export class ArtistAddComponent implements OnInit {

  public title: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alert: string;
  public is_edit;
  public params_id;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _artistService:ArtistService,
    private _uploadService:UploadService) { 

      this.title = 'Agregar Artista';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.is_edit = false;
      this.artist = new Artist('','','','');
      
    }

  ngOnInit() {
      this._route.params.forEach((params: Params) =>{
      this.params_id = params['id?']; });
     
      if(this.params_id != 0){
        this.getArtist();
        this.is_edit = true;
        this.title = "Editar Artista";
      }else{
        this.artist = new Artist('','','','');
        this.is_edit = false;
        this.title = "Agregar Artista";
      }
  }


getArtist(){
  this._route.params.forEach((params: Params) =>{
      let id = params['id?'];
      this._artistService.getArtist(this.token, id).subscribe(
        response =>{
          if(!response.artist){
            this._router.navigate(['/']);
          }else{
            this.artist = response.artist;
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

addArtist(){
  
  this._artistService.addArtist(this.token,this.artist).subscribe(
    response => {
    
      if(!response.artist){
        this.alert ="Error al agregar el artista en el servidor"; 
      }else{
        this.artist = response.artist;
        this.alert = "Artista agregado correctamente "+this.artist.name;
        this.is_edit = true;
        this.title = "Editar Artista"
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

editArtist(){

  this._artistService.editArtist(this.token,this.artist._id,this.artist).subscribe(
    response => {
    
      if(!response.artist){
        this.alert ="error al actualizar el artista en el servidor"; 
      }else{
        this.artist = response.artist;
        this.alert = "Artista actualizado correctamente "+this.artist.name;
        this._uploadService.makeFileRequest(this.url+'upload-image-artist/'+this.params_id,[],this.filesToUpload,this.token,'image')
                  .then(
                    result=>{
                      this._router.navigate(['/artists',1]);
                    },
                    error =>{
                      console.log(error);
                    }
                  );
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

public filesToUpload: Array<File>;

fileChangeEvent(fileInput: any){
  this.filesToUpload = <Array<File>>fileInput.target.files;
  console.log(this.filesToUpload);
}

onSubmit(){
  if(!this.is_edit){
    this.addArtist();
  }else{
    this.editArtist()
      }
  }
}
