import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import { Artist } from 'src/app/models/artist';

@Injectable()

export class ArtistService{
    public url: string;


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


    getArtists(token,page){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
           });

           let options = new RequestOptions({headers:headers});
           return this._http.get(this.url+'artists/'+page,options)
            .map(res=> res.json());
    }

    getArtist(token,_id :string){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
           });

           let options = new RequestOptions({headers:headers});
           return this._http.get(this.url+'artist/'+_id,options)
            .map(res=> res.json());
    }


    editArtist(token,_id: string, artist: Artist){

        let params = JSON.stringify(artist);

        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
           });

        return this._http.put(this.url+'artist/'+_id, params, {headers:headers})
        .map(res => res.json());

    }

    deleteArtist(token,_id){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':token
           });

           let options = new RequestOptions({headers:headers});
           return this._http.delete(this.url+'artists/'+_id,options)
            .map(res=> res.json());

    }

}