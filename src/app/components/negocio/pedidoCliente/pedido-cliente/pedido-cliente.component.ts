import { Component, OnInit ,ViewChild} from '@angular/core';
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

import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.component.html',
  styleUrls: ['./pedido-cliente.component.css'],
  providers:[
    UsuarioService,
    ProductoService,
    DatePipe,
    PedidoService,
    ConfiguracionService
  ]
})
export class PedidoClienteComponent implements OnInit {

  public productos;
  public page_title;
  public url;
  public p: number;
  public prodselec:Array<any>;
  public prodstorage=null;
  public valExiste;
  public recupstorag;
  public producto;




  constructor(
    private _userService: UsuarioService,
    private _productoService: ProductoService,
    private _configuracionService: ConfiguracionService,
    private _pedidoService: PedidoService
  ) 
  { 
    this.page_title = "Arma tu pedido";
    this.url = global.url;
    this.prodselec =[];
    this.recupstorag = null;
    this.producto = new Producto('','','',0,0,'','',0,0,0);
  }

  ngOnInit() {
    this.listarproductos();
    this.cargarstorage();

  }








  cargarstorage()
  {
      this.recupstorag = JSON.parse(localStorage.getItem('prodselect'));
  
      if(this.recupstorag != null){

        for(var i=0; i < this.recupstorag.length; i++){
          this.prodselec.push(this.recupstorag[i]);
        }
  
      }
  
  }


  agregaralcarrito(prod)
  {
      if(this.verifexiste(prod)== 1)
      {
         ///Modal sweet alert/////      
         Swal.fire({
          icon: 'error',
          title: 'Producto ya agregado!',
          text: 'verifique y vuelva a intentar'
          })
          ///Fin modal sweet alert/////      

      }else{
        this.prodselec.push(prod);
        localStorage.setItem('prodselect', JSON.stringify(this.prodselec) );
        this.prodstorage = JSON.parse(localStorage.getItem('prodselect'));
      }
      //console.log(this.prodstorage);  
  
  }


  verifexiste(prod)
  {
    this.valExiste =0;
    for(let i=0; i < this.prodselec.length; i++){
      if(prod.id == this.prodselec[i].id){
        this.valExiste=1;
      }
    }

    return this.valExiste;
  }





  listarproductos(){
    this._pedidoService.listarproductos().subscribe(
      response =>{
        this.productos = response.Producto;
      },error=>{
        console.log(error.status);
        if(error.status == 404){
     //     this.producto.nombre ="No hay el producto";
        }
      }
    );

  }



  buscarproductonombreotipo(nombre, event){
    event.preventDefault();
    this._pedidoService.buscarproductonombreotipo(nombre).subscribe(
      response =>{
        this.productos = response.Producto;
      },error=>{
        console.log(error.status);
        if(error.status == 404){
     //     this.producto.nombre ="No hay el producto";
        }
      }
    );
  }






  

}
