import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import {UserService} from './services/user.service';
import {GLOBAL} from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'iMusic';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url: string;

  constructor(
    private _userService:UserService
  ){
    this.user = new User('','','','','','ROLE_USER','null');
    this.user_register = new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
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
                    this.user = new User('','','','','','ROLE_USER','');
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

  onSubmitRegister(){

    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;

        if(!user._id){
          this.alertRegister ="error al registrrase"; 
        }else{
          this.alertRegister = "Registro correcto. Inicia sesion con "+this.user_register.email;
          this.user_register = new User('','','','','','ROLE_USER','');        }
        

      },
      error => {
        var errorMessage  = <any> error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alertRegister = body.message;

          console.log(error);
        }
      }
    )
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

}
