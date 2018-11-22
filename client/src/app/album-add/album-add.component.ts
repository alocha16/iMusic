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
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css'],
  providers:[ArtistService,UserService,AlbumService,UploadService]
})
export class AlbumAddComponent implements OnInit {

  public page_title: string;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alert: string;
  public is_edit = false;
  public artist_id;
  public filesToUpload: Array<File>;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _albumService:AlbumService,
    private _artistService:ArtistService,
    private _uploadService:UploadService) { 

      this.page_title = 'Agregar Album';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.album = new Album('','',2018,'','');
    }

  ngOnInit() {
      this._route.params.forEach((params: Params) =>{
      this.artist_id = params['id?']; });
      this.album.artist = this.artist_id;
  }

  addAlbum(){

      this._albumService.addAlbum(this.token,this.album).subscribe(
        response =>{
          if(!response.album){
            console.log("Error en el servidor");
            //this._router
          }else{
            this.alert = "Album creado";
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
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  onSubmit(){
    this.addAlbum();
  }

}
