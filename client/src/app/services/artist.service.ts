import {Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import { Artist } from 'src/app/models/artist';

@Injectable()

export class ArtistService{
    public url: string;
    //public token;
    public identity;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    addArtist(token,new_artist: Artist){

        let params = JSON.stringify(new_artist);

        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
           });

        return this._http.post(this.url+'artist', params, {headers:headers})
        .map(res => res.json());

    }


// getIdentity(){
//    let identity = JSON.parse(localStorage.getItem('identity'));
//    if(identity != "undefined"){
//        this.identity = identity;
//    }else{
//        this.identity = null;
//    }
//    return this.identity;
// }

// getToken(){
//    let token = localStorage.getItem('token');
//    if(token != "undefined"){
//    this.token = token;
//    }else{
//        this.token = null;
//    }
//    return this.token
// }

}