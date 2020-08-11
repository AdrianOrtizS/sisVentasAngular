import { Component, OnInit, DoCheck } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-producto-stockminimo',
  templateUrl: './producto-stockminimo.component.html',
  styleUrls: ['./producto-stockminimo.component.css'],
  providers:[
    ProductoService
  ]
})
export class ProductoStockminimoComponent implements OnInit {

  public page_title: string;
  public url;
  public producto;


  constructor(
    private _productoService: ProductoService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "Stock minimo";
    this.url = global.url;
    this.producto = Array<Producto>();
  }


  ngOnInit() {
    this.getproducto();  
  }


  getproducto(){
    this._productoService.stockminimo().subscribe(
      response=>{
        if(response.status == 'success'){
           this.producto = response.Productostockminimo; 
     //     console.log(this.producto);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }


}
