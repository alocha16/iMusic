(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"identity\" class=\"navigation col-lg-1\">\n  <h1>\n    {{title}}\n  </h1>\n\n    <nav id=\"navigation\">\n\n      \n    </nav>\n\n    <nav id=\"user_logged\">\n        <span>{{identity.name}}</span>\n        <span class=\"btn btn-warning\" (click)=\"logout()\"> Cerrar Sesion</span>\n        <a href=\"#\">\n            <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n          Mis datos\n        </a>\n    </nav>\n</div>\n\n<div class=\"clearfix\"></div>\n\n    <div *ngIf=\"identity\" class=\"central col-lg-11\">\n      <p>Estas logeado en la app </p>\n      <app-edit-user></app-edit-user>\n    </div>\n\n\n<div class=\"container\" *ngIf=\"!identity\">\n    <div class=\"row\">\n      <div class=\"col-sm\">\n\n            <!--FORMULARIO DE LOGIN-->\n          <h1>Identificate</h1>\n          <div *ngIf=\"errorMessage\">\n            <div class=\"alert alert-info\" role=\"alert\">\n              <strong>Error</strong> {{errorMessage}}\n            </div>\n          </div>\n          <form  #loginForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" class=\"col-md-7\">\n            <p>\n              <label>Correo Electronico:</label>\n              <input type=\"email\" #email=\"ngModel\" name=\"email\" [(ngModel)]=\"user.email\" class=\"form-control\" required />\n              <span *ngIf=\"!email.valid && email.touched\">\n                  El email es requerido\n              </span>\n            </p>\n            <p>\n                <label>Password:</label>\n                <input type=\"password\" #password=\"ngModel\" name=\"password\" [(ngModel)]=\"user.password\" class=\"form-control\" required />\n            </p>\n              <input type=\"submit\" value=\"Entrar\" class=\"btn btn-primary\"/>\n          </form>\n      </div>\n      <div class=\"col-sm\">\n\n        <!--FORMULARIO DE REGISTRO-->\n\n          <h1>Registrate</h1>\n\n          <div *ngIf=\"alertRegister\">\n              <div class=\"alert alert-info\" role=\"alert\">\n                <strong>Error</strong> {{alertRegister}}\n              </div>\n          </div>\n          \n\n          <form #registerForm =\"ngForm\" (ngSubmit)=\"onSubmitRegister()\" class=\"col-md-10\">\n                <p>\n                    <label>Nombre:</label>\n                    <input type=\"text\" #name='ngModel' name =\"name\" [(ngModel)]=\"user_register.name\" class=\"form-control\" required />\n                    <span *ngIf=\"!name.valid && name.touched\">\n                        El nombre es requerido\n                    </span>\n                </p>\n\n                <p>\n                      <label>Apellidos:</label>\n                      <input type=\"text\" #surname='ngModel' name =\"surname\" [(ngModel)]=\"user_register.surname\" class=\"form-control\" required />\n                      <span *ngIf=\"!surname.valid && surname.touched\">\n                          Los apellidos son requeridos\n                      </span>   \n                </p>\n\n                <p>\n                    <label>Correo Electronico:</label>\n                    <input type=\"email\" #email=\"ngModel\" name=\"email\" [(ngModel)]=\"user_register.email\" class=\"form-control\" required />\n                    <span *ngIf=\"!email.valid && email.touched\">\n                        El email es requerido\n                    </span>\n                </p>\n\n                <p>\n                      <label>Password:</label>\n                      <input type=\"password\" #password=\"ngModel\" name=\"password\" [(ngModel)]=\"user_register.password\" class=\"form-control\" required />\n                      <span *ngIf=\"!password.valid && password.touched\">\n                          El password es requerido\n                      </span>\n                </p>\n\n                <input type=\"submit\" value=\"Registrarse\" class=\"btn btn-primary\"/>\n\n          </form>\n\n      </div>\n    </div>\n  </div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/user */ "./src/app/models/user.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(_userService) {
        this._userService = _userService;
        this.title = 'iMusic';
        this.user = new _models_user__WEBPACK_IMPORTED_MODULE_1__["User"]('', '', '', '', '', 'ROLE_USER', '');
        this.user_register = new _models_user__WEBPACK_IMPORTED_MODULE_1__["User"]('', '', '', '', '', 'ROLE_USER', '');
    }
    AppComponent.prototype.ngOnInit = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    };
    AppComponent.prototype.onSubmit = function () {
        //console.log(this.user);
        var _this = this;
        this._userService.signup(this.user).subscribe(function (response) {
            var identity = response.user;
            _this.identity = identity;
            if (!_this.identity._id) {
                alert("El usuario no esta identificado");
            }
            else {
                localStorage.setItem('identity', JSON.stringify(identity));
                _this._userService.signup(_this.user, 'true').subscribe(function (response) {
                    var token = response.token;
                    _this.token = token;
                    if (_this.token.length <= 0) {
                        alert("El Token no se ha generado");
                    }
                    else {
                        localStorage.setItem('token', token);
                        _this.user = new _models_user__WEBPACK_IMPORTED_MODULE_1__["User"]('', '', '', '', '', 'ROLE_USER', '');
                    }
                }, function (error) {
                    var errorMessage = error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        _this.errorMessage = body.message;
                    }
                });
            }
        }, function (error) {
            var errorMessage = error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                _this.errorMessage = body.message;
            }
        });
    };
    AppComponent.prototype.onSubmitRegister = function () {
        var _this = this;
        this._userService.register(this.user_register).subscribe(function (response) {
            var user = response.user;
            _this.user_register = user;
            if (!user._id) {
                _this.alertRegister = "error al registrrase";
            }
            else {
                _this.alertRegister = "Registro correcto. Inicia sesion con " + _this.user_register.email;
                _this.user_register = new _models_user__WEBPACK_IMPORTED_MODULE_1__["User"]('', '', '', '', '', 'ROLE_USER', '');
            }
        }, function (error) {
            var errorMessage = error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                _this.alertRegister = body.message;
                console.log(error);
            }
        });
    };
    AppComponent.prototype.logout = function () {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        localStorage.clear();
        this.identity = null;
        this.token = null;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./edit-user/edit-user.component */ "./src/app/edit-user/edit-user.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_5__["EditUserComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/edit-user/edit-user.component.css":
/*!***************************************************!*\
  !*** ./src/app/edit-user/edit-user.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/edit-user/edit-user.component.html":
/*!****************************************************!*\
  !*** ./src/app/edit-user/edit-user.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-6\" *ngIf=\"identity\">\n  <h1>{{title}}</h1>\n</div>"

/***/ }),

/***/ "./src/app/edit-user/edit-user.component.ts":
/*!**************************************************!*\
  !*** ./src/app/edit-user/edit-user.component.ts ***!
  \**************************************************/
/*! exports provided: EditUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditUserComponent", function() { return EditUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(_userService) {
        this._userService = _userService;
        this.title = "Editar Usuario";
    }
    EditUserComponent.prototype.ngOnInit = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    };
    EditUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-user',
            template: __webpack_require__(/*! ./edit-user.component.html */ "./src/app/edit-user/edit-user.component.html"),
            styles: [__webpack_require__(/*! ./edit-user.component.css */ "./src/app/edit-user/edit-user.component.css")],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], EditUserComponent);
    return EditUserComponent;
}());



/***/ }),

/***/ "./src/app/models/user.ts":
/*!********************************!*\
  !*** ./src/app/models/user.ts ***!
  \********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User(_id, name, surname, email, password, role, image) {
        this._id = _id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.image = image;
    }
    return User;
}());



/***/ }),

/***/ "./src/app/services/global.ts":
/*!************************************!*\
  !*** ./src/app/services/global.ts ***!
  \************************************/
/*! exports provided: GLOBAL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLOBAL", function() { return GLOBAL; });
var GLOBAL = {
    url: 'http://localhost:3977/api/',
    ip: '127.0.0.1'
};


/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global */ "./src/app/services/global.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = /** @class */ (function () {
    function UserService(_http) {
        this._http = _http;
        this.url = _global__WEBPACK_IMPORTED_MODULE_3__["GLOBAL"].url;
    }
    UserService.prototype.signup = function (user_to_login, gethash) {
        if (gethash === void 0) { gethash = null; }
        if (gethash != null) {
            user_to_login.gethash = gethash;
        }
        var json = JSON.stringify(user_to_login);
        var params = json;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'login', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.register = function (user_to_register) {
        var params = JSON.stringify(user_to_register);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'register', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.updateUser = function (user_to_update) {
        var params = JSON.stringify(user_to_update);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Authorization': this.getToken,
            'Content-Type': 'application/json'
        });
        return this._http.put(this.url + 'update-user/' + user_to_update._id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.getIdentity = function () {
        var identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    };
    UserService.prototype.getToken = function () {
        var token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/alvarolopez/Desktop/iMusic/client/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map