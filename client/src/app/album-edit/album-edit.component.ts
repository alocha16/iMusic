import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {AlbumService} from '../services/album.service';
import {UploadService} from '../services/upload.service';
import {GLOBAL} from '../services/global';
import { User } from '../models/user';
import {Artist} from '../models/artist';
import {Album} from '../models/album';

@Component({
  selector: 'app-album-edit',
  templateUrl: '../album-add/album-add.component.html',
  styleUrls: ['../album-add/album-add.component.css'],
  providers:[ArtistService,UserService,AlbumService,UploadService]
})

export class AlbumEditComponent implements OnInit {


  public page_title: string;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alert: string;
  public is_edit = true;
  public albumId;
  public filesToUpload: Array<File>;


  constructor( 
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _albumService:AlbumService,
    private _artistService:ArtistService,
    private _uploadService:UploadService) { 

      this.page_title = 'Editar Album';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.album = new Album('','',2018,'','');
    }

  ngOnInit() {
      this.getAlbum();
  }

  getAlbum(){

    this._route.params.forEach((params: Params) =>{
    let id = params['id']; 

    this._albumService.getAlbum(this.token, id).subscribe(
      response =>{
        if(!response.album){
          this._router.navigate(['/']);
        }else{
          this.album = response.album;
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
  
fileChangeEvent(fileInput: any){
  this.filesToUpload = <Array<File>>fileInput.target.files;
  console.log(this.filesToUpload);
}

editAlbum(){
  this._route.params.forEach((params: Params) =>{

    let id = params['id']; 

this._albumService.editAlbum(this.token,id ,this.album).subscribe(
  response => {
  console.log(response);
    if(!response.album){
      this.alert ="error al actualizar el album en el servidor"; 
    }else{
      this.album = response.album;
      this.alert = "Album actualizado correctamente "+this.album.title;
      this._uploadService.makeFileRequest(this.url+'upload-image-album/'+id,[],this.filesToUpload,this.token,'image')
                .then(
                  result=>{
                    //this._router.navigate(['/artista',id]);
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
);
  });
}

onSubmit(){
  this.editAlbum();
}


}
