import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import Echo from 'laravel-echo';

import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-pedido-cliente-user',
  templateUrl: './pedido-cliente-user.component.html',
  styleUrls: ['./pedido-cliente-user.component.css'],
  providers:[
    PedidoService,
    UsuarioService
  ]
})
export class PedidoClienteUserComponent implements OnInit {

  public p: number;
  public page_title: string;
  public url;
  public pedidos;
  public pedido; 
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
    private _pedidoService: PedidoService, 
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsuarioService
    ) { 
      this.page_title ="Tus pedidos";
      this.url = global.url;
      this.pedido = new Pedido(1,'','','','','','','','','',[]);
      this.pedidos= Array<Pedido>();
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      
      this.decodedToken  = this.helper.decodeToken(this.token);
      this.expirationDate = this.helper.getTokenExpirationDate(this.token);
      this.isExpired     = this.helper.isTokenExpired(this.token);

  }


  ngOnInit() {
    this.getpedidos();
    this.isExpiredToken();
  }


  isExpiredToken(){
    if(this.isExpired){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this._router.navigate(['login']);
    }
  }


  getpedidos(){
    this._pedidoService.getmispedidos(this.token).subscribe(
      response=>{

        if(response.status == 'success'){
          this.pedidos = response.Pedidos; 
         // console.log(this.pedidos);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

  anular(id){
    this._pedidoService.anular(id).subscribe(
      response =>{
        this.getpedidos();
          
        //Alert//
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Pedido anulado',
          showConfirmButton: false,
          timer: 2000
        })
        ///////////

      },
      error=>{

      }
    );
  }






}
