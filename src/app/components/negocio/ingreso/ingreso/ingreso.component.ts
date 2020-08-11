import { Component, OnInit } from '@angular/core';
import { Ingreso } from 'src/app/models/ingreso';
import { IngresoService } from 'src/app/services/ingreso.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import Echo from 'laravel-echo';

import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css'],
  providers:[
    IngresoService,
    UsuarioService
  ]
})
export class IngresoComponent implements OnInit {

  public p: number;
  public page_title: string;
  public url;
  public ingresos;
  public ingreso; 
  public echo: Echo ;
  public identity;
  public token;

  //auth0 jwt
  public helper = new JwtHelperService();
  public decodedToken;
  public expirationDate;
  public isExpired;
  //
  

  constructor(
    private _ingresoService: IngresoService, 
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsuarioService
    ) { 
      this.page_title ="INGRESOS";
      this.url = global.url;
      this.ingreso = new Ingreso(1,1,'','',1,1,1,1,1,[]);
      this.ingresos= Array<Ingreso>();
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      
      this.decodedToken  = this.helper.decodeToken(this.token);
      this.expirationDate = this.helper.getTokenExpirationDate(this.token);
      this.isExpired     = this.helper.isTokenExpired(this.token);

  }

    ngOnInit() {
      this.getingresos();
      this.isExpiredToken();
    }


    isExpiredToken(){
      if(this.isExpired){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this._router.navigate(['login']);
      }
    }


    getingresos(){
      this._ingresoService.getingresos().subscribe(
        response=>{
          if(response.status == 'success'){
            this.ingresos = response.Ingresos; 
          }
        },
        error=>{
          console.log(error);
        }
      );
    }



    buscaringreso(buscar,event){
      event.preventDefault();
    
      this._ingresoService.buscaringreso(buscar).subscribe(
        response =>{
          if(response.status == 'success'){
            this.ingresos = response.Ingresos;
          }
        },error=>{
          console.log(error.status);
          if(error.status == 404){
  //            this.autores.autor ="No hay el autor";
          }
        }
      );
    }
  
  
    anular(id){
        this._ingresoService.anular(id).subscribe(
          response => {
            this.getingresos();
          
            //Alert//
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Ingreso anulado',
              showConfirmButton: false,
              timer: 2000
            })
            ///////////

          },
          error=>{
            console.log(error);
            
          }
        );
    }


}
