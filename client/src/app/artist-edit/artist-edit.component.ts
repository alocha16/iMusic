import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {GLOBAL} from '../services/global';
import { User } from '../models/user';
import {Artist} from '../models/artist';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css'],
  providers: [UserService,ArtistService]
})
export class ArtistEditComponent implements OnInit {

  public title: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alert: string;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _artistService:ArtistService) { 

      this.title = 'Editar Artista';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.artist = new Artist('','','','');
    }

  ngOnInit() {
  }

}
