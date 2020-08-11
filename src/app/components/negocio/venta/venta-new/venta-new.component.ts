import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/venta';
import { Producto } from 'src/app/models/producto';
import { VentaService } from 'src/app/services/venta.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-venta-new',
  templateUrl: './venta-new.component.html',
  styleUrls: ['./venta-new.component.css'],
  providers:[
    VentaService,
    PersonaService,
    UsuarioService,
    ProductoService,
    DatePipe,
    ConfiguracionService
  ]
})
export class VentaNewComponent implements OnInit {

  public p: number;
  public status;
  public numcomprobante;
  public fecha;
  public producto ;
  public productos;
  public page_title:string;
  public url;
  public persona;
  public venta  ;
  public arrayDetalle=[];
  public cantidad2;
  public precio2;
  public validarproducto;
  public validarprecio;
  public validarcantidad;
  public Ventas;
  public subtotal;
  public iva;
  public impuesto;
  public impuesto0;
  public total;
  public desc;
  public valExiste ;
  public numeroVenta;
  public thereare;
  public identity;
  public token;
  myDate = new Date();

  //auth0 jwt
  public helper = new JwtHelperService();
  public decodedToken;
  public expirationDate;
  public isExpired;
  //

  constructor( 
    private datePipe: DatePipe,

      private _ventaService: VentaService, 
      private _personaService: PersonaService, 
      private _userService : UsuarioService,
      private _productoService: ProductoService, 
      private _configuracionService: ConfiguracionService,
    
      private _route: ActivatedRoute,
      private _router: Router
    ) 
    { 
        this.page_title = "NUEVA VENTA";
        this.fecha = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
       
        this.url = global.url;
        this.token = _userService.getToken();
        this.producto = new Producto('','','',0,0,'','',0,0,0);
        this.venta = new Venta(1,1,'','',1,1,0,1,1,1,1,[]);        //   this.detalleingreso = [];
        this.validarproducto  =0;
        this.validarprecio    =0;
        this.validarcantidad  =0;

        this.decodedToken  = this.helper.decodeToken(this.token);
        this.expirationDate = this.helper.getTokenExpirationDate(this.token);
        this.isExpired     = this.helper.isTokenExpired(this.token);
  
  }


  ngOnInit() {
    this.getpersona();
    this.numcomprobanteventa();
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


  agregardetalle(event){
    //previene recargar la pagina
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
              precio:     this.producto.precio,
              iva:        this.producto.iva,   //true false
              descuento: 0
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
    this.desc=0.0;
    this.impuesto =0.0;
    this.impuesto0= 0.0;
    this.total=0.0;

    for(var i=0; i<this.arrayDetalle.length; i++)
    {
        this.subtotal = this.subtotal + (this.arrayDetalle[i].precio*this.arrayDetalle[i].cantidad);
        this.desc     = this.desc + ((this.arrayDetalle[i].precio * this.arrayDetalle[i].cantidad) * this.arrayDetalle[i].descuento)/100;
        
        if(this.arrayDetalle[i].iva){
          this.impuesto = (((this.subtotal - this.desc)-this.impuesto0) * this.iva)/100;
        }else{
          this.impuesto0 = this.impuesto0 + (this.arrayDetalle[i].precio*this.arrayDetalle[i].cantidad)-((this.arrayDetalle[i].precio * this.arrayDetalle[i].cantidad) * this.arrayDetalle[i].descuento)/100;
        }

        this.total    = (this.subtotal-this.desc) + this.impuesto;
    }

    return [this.subtotal, this.desc, this.impuesto0,this.impuesto, this.total];
  }



  encerar(){
    this.producto.id = '';
    this.producto.nombre ='';
    this.producto.codigo ='';
    this.cantidad2  ='';
    this.precio2    ='';
    this.desc = '';
  }



  eliminardetalle(ind){
     //quitar posicion de indice , solo 1
    this.arrayDetalle.splice(ind,1);
  }


  numcomprobanteventa(){
    this._ventaService.numcomprobante().subscribe(
      response =>{
        this.numcomprobante = response.Numventa;
        this.venta.numcomprobante = this.numcomprobante;
      
      },error=>{
        console.log(error.status);
        if(error.status == 404){
     //     this.producto.nombre ="No hay el producto";
        }
      }
    );
  }




  buscarproductocodigo(codigo){
    this._ventaService.buscarproductocodigo(codigo).subscribe(
      response =>{
        this.producto = response.Producto;
       this.precio2 = this.producto.precio;


      },error=>{
        console.log(error.status);
        if(error.status == 404){
      //    this.producto.nombre ="No hay el producto";
        }
      }
    );
  }

  buscarproductonombre(nombre, event){
    event.preventDefault();
    this._ventaService.buscarproductonombre(nombre).subscribe(
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

  
  agregarDetalleModal(pro){

    this.verificaExiste(pro.codigo);
    if(this.valExiste==0){
        this.arrayDetalle.push({
          idproducto:   pro.id,
          codproducto:  pro.codigo,
          producto:     pro.nombre,
          cantidad:     1,
          precio:       pro.precio,
          iva:       pro.iva,
          descuento: 0
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


  getpersona(){
    this._personaService.getpersona().subscribe(
      response =>{
        this.persona = response.Persona;
      },error=>{
        console.log(error);
      }
    );
  }


  onSubmit(ventaForm){

    this.venta.subtotal   = this.subtotal;
    this.venta.descuento  = this.desc;
    this.venta.iva        = this.impuesto;
    this.venta.iva0        = this.impuesto0;
    
    this.venta.total      = this.total;
    this.venta.detalles   = this.arrayDetalle;
   
    this._ventaService.create(this.venta,this.token).subscribe(
      response =>{
        if(response.status == 'success'){
          this.status = 'success';
       
          this._router.navigate(['/venta']);
          ventaForm.reset();
       
          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Venta registrada!!!',
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
