import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PedidoService } from './../../../../services/pedido.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

import { Pedido } from './../../../../models/pedido';
import { JwtHelperService } from "@auth0/angular-jwt";
import { isEmpty } from 'rxjs/operators';

import * as Mapboxgl from 'mapbox-gl';

import { FormControl } from '@angular/forms';
declare var paypal;


@Component({
  selector: 'app-pedido-cliente-carrito',
  templateUrl: './pedido-cliente-carrito.component.html',
  styleUrls: ['./pedido-cliente-carrito.component.css'],
  providers:[
    UsuarioService,
    ProductoService,
    DatePipe,
    PedidoService,
    ConfiguracionService
  ]
})
export class PedidoClienteCarritoComponent implements OnInit {

  @ViewChild('paypal',{static: true}) paypayElement: ElementRef;


  //tipo de pago
  Efectivo = true;
  Otro = false;
  template = true;
  paypalShow = 0;

  //paypal aprove
  fpAprove :boolean;



  mapa: Mapboxgl.Map;

  public arrayDetalle=[];
  public iva;
  public subtotal;
  public impuesto;
  public impuesto0;
  public total;
  public url;
  public page_title;
  public long;
  public lati;
  public usuario;
  public pedido;
  public status;
  public token;
  
  public pagoExito;


  constructor(
    private _usuarioService:UsuarioService,
    private _configuracionService: ConfiguracionService,
    private _pedidoService: PedidoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) 
  { 
    this.usuario = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = global.url;
    this.page_title = "CARRITO DE COMPRAS";
    this.iva=0.0;
    this.subtotal=0.0;
    this.impuesto =0.0;
    this.impuesto0= 0.0;
    this.total=0.0;
    this.pedido = new Pedido("","","","","","","","","","",[]);

    this.fpAprove = false;

  }




  ngOnInit() {
    this.recogerdatos();
    this.getiva();
    this.map();

    document.getElementById('efectivo').click();
  }


  //para ocultar div paypal
  e =0;

  efectivo(){
    //console.log("efectivo");
    this.fpAprove = true;
    //ocultar div paypal
    if(this.e == 1){
      var x = document.getElementById("paypal2");
      x.style.display = "none"
    }

    this.e=1;
  }


  otro(){
    var x = document.getElementById("paypal2");
        x.style.display = "block"
    //console.log("otro");

    this.fpAprove = false;

      if(this.paypalShow==0){
        paypal.Buttons(
          {
            createOrder: (data, actions)=>{
              return actions.order.create({
                purchase_units:[
                  {
                    description: 'parabrisas',
                    amount:{
                      currency_code: 'USD',
                      value: parseFloat(this.total).toFixed(2)
                    }
                  }
                ]
              })
            },

            onApprove: async (data, actions)=>{
              const order = await actions.order.capture();
             // console.log(order);
              this.fpAprove = true;

              var x = document.getElementById("chkEfec");
                  x.style.display = "none"
            },
            onError: err =>{
              this.fpAprove = false;
              console.log(err);
            }
          }
        ).render(this.paypayElement.nativeElement);
      }

      this.paypalShow = 1
    
  }




  map(){
    (Mapboxgl as any).accessToken = 'pk.eyJ1IjoiYWRyaWFuLTIyMjIiLCJhIjoiY2tlbjZyM25oMGQxcjMwdDV4N3A4bTlxYyJ9.rzxxvEKme9GycNYTDjZOaw';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.mapa = new Mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [position.coords.longitude, position.coords.latitude], // [long , lat]  -  starting position
            zoom: 16 // starting zoom
        });
        // Add zoom and rotation controls to the map.
        this.mapa.addControl(new Mapboxgl.NavigationControl());
  


        this.lati = position.coords.latitude;
        this.long = position.coords.longitude;

        var marker = new Mapboxgl.Marker({
          draggable: true
          }).setLngLat([this.long, this.lati])
            .addTo(this.mapa);
        marker.on('drag', ()=>{
          var position = marker.getLngLat()
          this.pedido.lat = position.lat;
          this.pedido.long = position.lng;

          console.log(this.pedido);


        });
  
        
  
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }

  }


  

  recogerdatos(){
    this.arrayDetalle = JSON.parse(localStorage.getItem('prodselect'));
    //console.log(this.arrayDetalle);
  }


  getiva(){
    this._configuracionService.getiva().subscribe(
      response =>{
        this.iva = response.Iva.valor;
      },error=>{
        console.log(error);
      }
    );
  }


  eliminardetalle(ind){
   //quitar posicion de indice , solo 1
  //  this.arrayDetalle.splice(ind,1);
   this.arrayDetalle = JSON.parse(localStorage.getItem('prodselect'));
   this.arrayDetalle.splice(ind,1);
   localStorage.setItem('prodselect', JSON.stringify(this.arrayDetalle) );

  }


  get valsubtotal() {
    this.subtotal=0.0;
    this.impuesto =0.0;
    this.impuesto0= 0.0;
    this.total=0.0;

      for(var i=0; i<this.arrayDetalle.length; i++)
      {
          this.subtotal = this.subtotal + (this.arrayDetalle[i].precio*this.arrayDetalle[i].cantidad);
        // this.desc     = this.desc + ((this.arrayDetalle[i].precio * this.arrayDetalle[i].cantidad) * this.arrayDetalle[i].descuento)/100;
          
          if(this.arrayDetalle[i].iva){
            this.impuesto = ((this.subtotal -this.impuesto0) * this.iva)/100;
          }else{
            this.impuesto0 = this.impuesto0 + (this.arrayDetalle[i].precio*this.arrayDetalle[i].cantidad);
          }

          this.total    = this.subtotal + this.impuesto;
      }

    return [this.subtotal, this.impuesto0,this.impuesto, this.total];
  }


  onSubmit(pedidoForm){
    this.pedido.subtotal = this.subtotal;
    this.pedido.iva      = this.impuesto;
    this.pedido.iva0     = this.impuesto0;
    this.pedido.total    = this.total;
   
    this.pedido.detalles = this.arrayDetalle;
    // console.log("PEDIDO");
    // console.log(this.pedido);
    
    this._pedidoService.create(this.pedido, this.token).subscribe(
      response =>{
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/mispedidos']);
          localStorage.removeItem('prodselect');
          pedidoForm.reset();
       
          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pedido registrado!!!',
            showConfirmButton: false,
            timer: 2200
          })
          ///////////
       
        }else{
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error yayayaya';
        console.log(<any>error);
      }
    );






  }
  

}
