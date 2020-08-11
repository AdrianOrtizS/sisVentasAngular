import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoproductoService } from 'src/app/services/tipoproducto.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-producto-show',
  templateUrl: './producto-show.component.html',
  styleUrls: ['./producto-show.component.css'],
  providers:[
    ProductoService,
    TipoproductoService
  ]
})
export class ProductoShowComponent implements OnInit {

  public page_title: string;
  public producto;
  public url;

  constructor(
    private _productoService: ProductoService,
    private _tipoproductoService: TipoproductoService,
    
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "Ver tipo producto";
    this.url = global.url;
   
  }

  ngOnInit() {
    this.verproducto();
  }


  verproducto(){
    this._route.params.subscribe(params => {
    let id = params['id'];
    
      this._productoService.verproducto(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.producto = response.Producto;
//            console.log(this.producto);
          }else{
            this._router.navigate(['inicio']);
          }
        },
        error =>{
          this._router.navigate(['inicio']);
        }
      );
    });
  }



}
