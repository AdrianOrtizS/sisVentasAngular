import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ingreso } from 'src/app/models/ingreso';
import { Detalleingreso } from 'src/app/models/detalleingreso';

import { IngresoService } from 'src/app/services/ingreso.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { global }  from 'src/app/services/global';


@Component({
  selector: 'app-ingreso-show',
  templateUrl: './ingreso-show.component.html',
  styleUrls: ['./ingreso-show.component.css'],
  providers:[
    IngresoService
  ]
})
export class IngresoShowComponent implements OnInit {

  public page_title: string;
  public ingreso;
  public detalle;
  public url;
  public subtotal;
  public iva;
  public total;



  constructor(
    private _ingresoService: IngresoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "VER INGRESO";
    this.url = global.url;
   
  }


  
  ngOnInit() {
    this.veringreso();
  }


  veringreso(){
    this._route.params.subscribe(params => {
    let id = params['id'];
    
      this._ingresoService.veringreso(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.ingreso = response.Ingreso;
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



