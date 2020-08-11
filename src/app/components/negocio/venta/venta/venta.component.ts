import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from './../../../../services/usuario.service';

import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  providers:[
    VentaService,
    UsuarioService
  ]
})
export class VentaComponent implements OnInit {

  public p: number;
  public page_title: string;
  public url;
  public ventas;
  public venta; 
  public identity;
  public token;

  //auth0 jwt
  public helper = new JwtHelperService();
  public decodedToken;
  public expirationDate;
  public isExpired;
  //

  constructor(
    private _ventaService: VentaService, 
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService 
    ) { 
      this.page_title ="VENTAS";
      this.url = global.url;
      this.venta = new Venta(1,1,'','',1,1,0,1,1,1,1,[]);
      this.ventas= Array<Venta>();
      this.identity = _usuarioService.getIdentity();
      this.token = _usuarioService.getToken();

      this.decodedToken  = this.helper.decodeToken(this.token);
      this.expirationDate = this.helper.getTokenExpirationDate(this.token);
      this.isExpired     = this.helper.isTokenExpired(this.token);
  
  }

    ngOnInit() {
      this.getventas();
      this.isExpiredToken();
    }


    isExpiredToken(){
      if(this.isExpired){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this._router.navigate(['login']);
      }
    }

    getventas(){
      this._ventaService.getventas().subscribe(
        response=>{
          if(response.status == 'success'){
            this.ventas = response.Ventas; 
          }
        },
        error=>{
          console.log(error);
        }
      );
    }
  

    buscarventa(buscar,event){
      event.preventDefault();
    
      this._ventaService.buscarventa(buscar).subscribe(
        response =>{
          if(response.status == 'success'){
            this.ventas = response.Ventas;
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
        this._ventaService.anular(id).subscribe(
          response => {
            this.getventas();

            //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Venta anulada',
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
