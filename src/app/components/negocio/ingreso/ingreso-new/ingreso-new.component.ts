import { Component, OnInit } from '@angular/core';
import { Ingreso } from 'src/app/models/ingreso';
import { IngresoService } from 'src/app/services/ingreso.service';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';

import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

import { JwtHelperService } from "@auth0/angular-jwt";
import { NgSelectConfig } from '@ng-select/ng-select';


@Component({
  selector: 'app-ingreso-new',
  templateUrl: './ingreso-new.component.html',
  styleUrls: ['./ingreso-new.component.css'],
  providers:[
    IngresoService,
    ProveedorService,
    UsuarioService,
    ProductoService,
    ConfiguracionService
  ]
})
export class IngresoNewComponent implements OnInit {


  public p: number;
  public status;
  public fecha;
  public producto ;
  public productos;
  public proveedores;
  
  public page_title:string;
  public url;
  public proveedor;
  public ingreso  ;
  public arrayDetalle=[];
  public cantidad2;
  public precio2;
  public validarproducto;
  public validarprecio;
  public validarcantidad;
  public Ingresos;
  public subtotal;
  public iva;
  public total;
  public valExiste ;
  public numeroIngreso;
  public thereare;
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
      private _proveedorService: ProveedorService, 
      private _userService : UsuarioService,
      private _productoService: ProductoService, 
      private _configuracionService: ConfiguracionService,
        
      private _route: ActivatedRoute,
      private _router: Router
    ) 
    { 
        this.page_title = "NUEVO INGRESO";
        this.url = global.url;
        this.token = _userService.getToken();
        this.producto = new Producto('','','',0,0,'','',0,0,0);
        this.ingreso = new Ingreso('','','','',1,1,1,'',0,[]);        //   this.detalleingreso = [];
        this.proveedor = new Proveedor(1,'','','','','',1,'');
        this.validarproducto  =0;
        this.validarprecio    =0;
        this.validarcantidad  =0;

        this.decodedToken  = this.helper.decodeToken(this.token);
        this.expirationDate = this.helper.getTokenExpirationDate(this.token);
        this.isExpired     = this.helper.isTokenExpired(this.token);
  

  }

 

  ngOnInit() {
    this.getproveedor();
    this.getiva();
    this.isExpiredToken();

  }


  isExpiredToken(){
    if(this.isExpired){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this._router.navigate(['login']);
    }
  }


  getiva(){
    this._configuracionService.getiva().subscribe(
      response =>{
        this.iva = response.Iva.valor;
    //    console.log(this.iva);

      },error=>{
        console.log(error);
      }
      
    );
  }


  onSubmit(ingresoForm){

    this.ingreso.subtotal   = this.subtotal;
    this.ingreso.iva   = (this.subtotal*this.iva)/100;
    this.ingreso.total   = this.ingreso.subtotal+this.ingreso.iva;
    this.ingreso.detalles   = this.arrayDetalle;

    
    this._ingresoService.create(this.ingreso, this.token).subscribe(
      response =>{
        if(response.status == 'success'){
          this.status = 'success';

          this._router.navigate(['/ingreso']);
          ingresoForm.reset();
       
          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ingreso registrado!!!',
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


  agregardetalle(event){
    //preiene recargar la pagina
    event.preventDefault();
    
    //verifica si esta seleccionado producto, cantidad , precio
    if(!this.producto.codigo){
      this.validarproducto=1;
    }else{this.validarproducto=0}


    if(!this.precio2){
      this.validarprecio++;
    }else{this.validarprecio=0;}
    if(!this.cantidad2){
      this.validarcantidad++;
    }else{this.validarcantidad=0;}

    if(this.validarproducto==0 && this.validarprecio==0 && this.validarcantidad==0 && this.producto.nombre !="No hay el producto"){


    this.verificaExiste(this.producto.codigo);
    
    if(this.valExiste==0){
            
            this.arrayDetalle.push({
              idproducto: this.producto.id,
              codproducto: this.producto.codigo,
              producto:   this.producto.nombre,
              cantidad:   this.cantidad2,
              precio:     this.precio2
            });
    
            this.encerar();
          }else{

              ///Modal sweet alert/////      
              Swal.fire({
              icon: 'error',
              title: 'Producto ya agregado!',
              text: 'verifique y vuelva a intentar'
              })
              ///Fin modal sweet alert/////      
      

          }
    }
  }



  verificaExiste(codigo){
  this.valExiste =0;
    for(let i=0; i < this.arrayDetalle.length; i++){
      if(codigo == this.arrayDetalle[i].codproducto){
        this.valExiste=1;
      }
    }
  }



  get valsubtotal() {
    this.subtotal=0.0;
    //this.iva =0.0;
    //this.total=0.0;

    for(var i=0;i<this.arrayDetalle.length;i++)
    {
        this.subtotal=this.subtotal+(this.arrayDetalle[i].precio*this.arrayDetalle[i].cantidad);
    }
    return this.subtotal;
  }


  encerar(){
    this.producto.id = '';
    this.producto.nombre ='';
    this.cantidad2  ='';
    this.precio2    ='';
  }



  eliminardetalle(ind){
          //quitar posicion de indice , solo 1
    this.arrayDetalle.splice(ind,1);
  }


  buscarproductocodigo(codigo){
    this._ingresoService.buscarproductocodigo(codigo).subscribe(
      response =>{
        this.producto = response.Producto;
       
      },error=>{
        console.log(error.status);
        if(error.status == 404){
     //     this.producto.nombre ="No hay el producto";
        }
      }
    );
  }

  buscarproductonombre(nombre, event){
    event.preventDefault();
    this._ingresoService.buscarproductonombre(nombre).subscribe(
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

  buscarproveedorombre(nombre, event){
    event.preventDefault();
    this._proveedorService.buscarproveedornombre(nombre).subscribe(
      response =>{
        
        this.proveedores = response.Proveedor;
     
//        console.log(response);
      },error=>{
        console.log(error.status);
        if(error.status == 404){
     //     this.producto.nombre ="No hay el producto";
        }
      }
    );
  }


  agregarProveedorModal(prov){
//    console.log(prov.nombre);
    this.proveedor = prov;
    this.ingreso.idproveedor = this.proveedor.id;
  }

  
  agregarDetalleModal(pro){
    this.verificaExiste(pro.codigo);
    if(this.valExiste==0){
        this.arrayDetalle.push({
          idproducto: pro.id,
          codproducto: pro.codigo,
          producto:   pro.nombre,
          cantidad:   1,
          precio:     1
        });
            this.encerar();
    }else{
            ///Modal sweet alert/////      
            Swal.fire({
              icon: 'error',
              title: 'Producto ya agregado!',
              text: 'verifique y vuelva a intentar'
            })
            ///Fin modal sweet alert/////      
    }
  }



  getproveedor(){
    this._proveedorService.getproveedor().subscribe(
      response =>{
        this.proveedor = response.Proveedor;
     //   console.log(response);
      },error=>{
        console.log(error);
      }
    );
  }


}
