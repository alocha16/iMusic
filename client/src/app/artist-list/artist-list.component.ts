import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import { User } from '../models/user';
import {Artist} from '../models/artist';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers:[UserService]
})

export class ArtistListComponent implements OnInit {

  public title: string;
  public artists: Artist[];
  public identity;
  public token;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private _userSevice:UserService) { 

      this.title = 'Artistas';
      this.identity = this._userSevice.getIdentity();
      this.token = this._userSevice.getToken();
      this.url = GLOBAL.url;
    }

  ngOnInit() {
  }

}
