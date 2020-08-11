import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Venta } from 'src/app/models/venta';
import { Detalleventa } from 'src/app/models/detalleventa';

import { VentaService } from 'src/app/services/venta.service';
import { global }  from 'src/app/services/global';


@Component({
  selector: 'app-venta-show',
  templateUrl: './venta-show.component.html',
  styleUrls: ['./venta-show.component.css'],
  providers:[
    VentaService
  ]
})
export class VentaShowComponent implements OnInit {

  public page_title: string;
  public venta;
  public detalle;
  public url;
  public subtotal;
  public iva;
  public total;



  constructor(
    private _ventaService: VentaService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "VER VENTA";
    this.url = global.url;
   
  }


  
  ngOnInit() {
    this.verventa();
  }


  verventa(){
    this._route.params.subscribe(params => {
    let id = params['id'];
    
      this._ventaService.verventa(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.venta = response.Venta;
            this.detalle = response.Detalle;
          
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


 /* get valsubtotal() {
    this.subtotal=0.0;
    this.iva =0.0;
    this.total=0.0;

    for(var i=0;i<this.detalle.length;i++)
    {
        this.subtotal=this.subtotal+(this.detalle[i].precio*this.detalle[i].cantidad);
    }
    return this.subtotal;
  }
*/

}



