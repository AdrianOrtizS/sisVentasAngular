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
import { Detallepedido } from './../../../../models/detallepedido';
import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-pedido-cliente-show',
  templateUrl: './pedido-cliente-show.component.html',
  styleUrls: ['./pedido-cliente-show.component.css'],
  providers:[
    PedidoService,
    UsuarioService
  ]
})
export class PedidoClienteShowComponent implements OnInit {

  mapa: Mapboxgl.Map;

  public page_title: string;
  public url;
  public pedido; 
  public detalles;
  public echo: Echo ;
  public identity;
  public token;

  //auth0 jwt
  public helper = new JwtHelperService();
  public decodedToken;
  public expirationDate;
  public isExpired;
  //

  public lati;
  public long;
  

  constructor(
    private _pedidoService: PedidoService, 
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsuarioService
    ) { 
      this.page_title ="Ver pedido";
      this.url = global.url;
      this.pedido = new Pedido(1,'','','','','','','','','',[]);
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      
      this.decodedToken  = this.helper.decodeToken(this.token);
      this.expirationDate = this.helper.getTokenExpirationDate(this.token);
      this.isExpired     = this.helper.isTokenExpired(this.token);

  }


  ngOnInit() {
    this.verpedido();
    this.isExpiredToken();
    
  }


  isExpiredToken(){
    if(this.isExpired){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this._router.navigate(['login']);
    }
  }


  verpedido(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      
        this._pedidoService.verpedido(id).subscribe(
          response =>{

            if(response.status == 'success'){
              this.pedido = response.Pedido;
              this.detalles = response.Detalles;
              
              this.lati = this.pedido.latitud;
              this.long = this.pedido.longitud;



              console.log(this.pedido);

              console.log(this.long);
              console.log(this.lati);



              this.map(this.long, this.lati);

            }else{
              this._router.navigate(['mispedidos']);
            }
          },
          error =>{
            this._router.navigate(['mispedidos']);
          }
        );
      });
  }



  map(long, lati){
    (Mapboxgl as any).accessToken = 'pk.eyJ1IjoiYWRyaWFuLTIyMjIiLCJhIjoiY2tlbjZyM25oMGQxcjMwdDV4N3A4bTlxYyJ9.rzxxvEKme9GycNYTDjZOaw';
 
          this.mapa = new Mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [long, lati], // [long , lati]  -  starting position
            zoom: 16 // starting zoom
          });
   
          // Add zoom and rotation controls to the map.
           this.mapa.addControl(new Mapboxgl.NavigationControl());
              
          this.crearMarcador(long, lati);
  }


  crearMarcador( lng: number, lat: number){
     var marker = new Mapboxgl.Marker({
        draggable: true
        }).setLngLat([lng, lat])
          .addTo(this.mapa);

      marker.on('drag', ()=>{
        console.log(marker.getLngLat());
      });
       
  }




}
