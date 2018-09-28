import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import {UserService} from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'iMusic';
  public user: User;
  public identity;
  public token;
  public errorMessage;

  constructor(
    private _userService:UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
    //this.identity = true;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);
  }

  public onSubmit(){
    //console.log(this.user);

    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;
        if(!this.identity._id){
          alert("El usuario no esta identificado");
        }else{
              localStorage.setItem('identity',JSON.stringify(identity));

              this._userService.signup(this.user, 'true').subscribe(
                  response => {  
                  let token = response.token;
                  this.token = token;
                  if(this.token.length <= 0){
                    alert("El Token no se ha generado");
                  }else{
                    localStorage.setItem('token',token);
                  }
                },
                error => {
                  var errorMessage  = <any> error;
                  if(errorMessage != null){
                    var body = JSON.parse(error._body);
                    this.errorMessage = body.message;
                  }
                }
              );
          }
      },
      error => {
        var errorMessage  = <any> error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
        }
      }
    );
  }


  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

}
