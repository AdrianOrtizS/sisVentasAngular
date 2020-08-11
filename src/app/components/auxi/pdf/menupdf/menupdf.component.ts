import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { Ingreso } from 'src/app/models/ingreso';
import { IngresoService } from 'src/app/services/ingreso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-menupdf',
  templateUrl: './menupdf.component.html',
  styleUrls: ['./menupdf.component.css'],
  providers:[
    IngresoService,
    UsuarioService
  ]
})
export class MenupdfComponent implements OnInit {

  public url;
  public fecha;
  public ingresos: Array<Ingreso>;
  public ingreso2; 
  public identity;
  public token;

  //auth0 jwt
  public helper = new JwtHelperService();
  public decodedToken;
  public expirationDate;
  public isExpired;
  //
  

  constructor(
    private _ingresoService : IngresoService,
    private _userService: UsuarioService,
    private _router: Router
  ){ 
    this.url = global.url;
    this.ingreso2 = new Ingreso(1,1,'',1,1,1,1,1,1,[]);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
      
    this.decodedToken  = this.helper.decodeToken(this.token);
    this.expirationDate = this.helper.getTokenExpirationDate(this.token);
    this.isExpired     = this.helper.isTokenExpired(this.token);
  }

  ngOnInit() {
    this.isExpiredToken();
  }

  isExpiredToken(){
    if(this.isExpired){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this._router.navigate(['login']);
    }
  }

  productoPdf(){
    window.open(this.url+'/productosPdf');
  }

  ingresoPdf()
  {
    var fechaini = (<HTMLInputElement> document.getElementById("fechaini")).value;
    var fechafin = (<HTMLInputElement> document.getElementById("fechafin")).value;
    window.open(this.url+'/ingresosPdf?fechaini="'+fechaini+'"&fechafin="'+fechafin+'"');   
  }

  ventaPdf()
  {
    var fechainiv = (<HTMLInputElement> document.getElementById("fechainiv")).value;
    var fechafinv = (<HTMLInputElement> document.getElementById("fechafinv")).value;
    window.open(this.url+'/ventasPdf?fechaini="'+fechainiv+'"&fechafin="'+fechafinv+'"');   
  }

}
