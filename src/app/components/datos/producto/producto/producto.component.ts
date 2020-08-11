import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers:[
    ProductoService
  ]
})
export class ProductoComponent implements OnInit {

  public page_title: string;
  public url;
  public producto;
  public producto2;
  public p: number;


  constructor(
    private _productoService: ProductoService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "PRODUCTO";
    this.url = global.url;
    this.producto = Array<Producto>();
    this.producto2 = new Producto(1,'','',0,0,'','',1,1,0.0);
  }

  productoPdf(){
//    console.log(this.url+'/productosPdf');
    window.open(this.url+'/productosPdf');
  }

  ngOnInit() {
    this.getproducto();  
  }


  getproducto(){
    this._productoService.getproducto().subscribe(
      response=>{
        if(response.status == 'success'){
          this.producto = response.Producto; 
   //       console.log(this.producto);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }




  buscarproducto(buscar,event){
    event.preventDefault();

    this._productoService.buscarproductonombre(buscar).subscribe(
      response =>{
        if(response.status == 'success'){
          this.producto = response.Producto;
        }
      },error=>{
        console.log(error.status);
        if(error.status == 404){
//            this.autores.autor ="No hay el autor";
        }
      }
    );
  }




  
  activardesactivarproducto(id){
    this._productoService.activardesactivar(id).subscribe(
      response => {
        this.getproducto();
      },
      error=>{
        console.log(error);
        
      }
    );
  }



}
