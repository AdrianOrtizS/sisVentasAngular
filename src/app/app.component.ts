import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { UsuarioService} from 'src/app/services/usuario.service';
import { Usuario } from './models/usuario';
import { global } from '../app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';
import { IngresoService } from './services/ingreso.service';
import  Echo  from 'laravel-echo';

import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UsuarioService,
    IngresoService
  ]
})
export class AppComponent implements OnInit, DoCheck{

  navbarCollapsed = true;

  public title :string;
  public identity;
  public token;
  public url;
  public producto;
  public ingreso ;

  //auth0 jwt
  public helper = new JwtHelperService();
  public decodedToken;
  public expirationDate;
  public isExpired;
  //

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    public _userService: UsuarioService,
    public _ingresoService: IngresoService
  )
  {
      this.title = 'App titttlllleeee';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = global.url;
      this.producto = Array<Producto>();

      this.decodedToken  = this.helper.decodeToken(this.token);
      this.expirationDate = this.helper.getTokenExpirationDate(this.token);
      this.isExpired     = this.helper.isTokenExpired(this.token);
      
  }


  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken(); 
    
  }

  isExpiredToken(){
    if(this.isExpired){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this._router.navigate(['login']);
    }

  }
  
  ngOnInit(): void {
    console.log('WebApp cargado correctamente');
    this.isExpiredToken();
  }


  //al cerrar el navegador se elimina del localStorage
  // @HostListener("window:unload", [ "$event" ])
  // unloadHandler(event) {
  //   localStorage.removeItem('identity');
  //   localStorage.removeItem('token');            
  //   this._router.navigate(['login']);
  // }


}
