import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { from } from 'rxjs';
import { global } from 'src/app/services/global';
import { TipoProducto } from 'src/app/models/tipoproducto';
import { TipoproductoService } from 'src/app/services/tipoproducto.service';

@Component({
  selector: 'app-tipoproducto',
  templateUrl: './tipoproducto.component.html',
  styleUrls: ['./tipoproducto.component.css'],
  providers:[
    TipoproductoService
  ]
})
export class TipoproductoComponent implements OnInit {

  public p: number;

  public page_title:string;
  public url;
  public tipoproductos;
  public tipoproducto;

  constructor(    
    private _tipoproductoService: TipoproductoService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "TIPO PRODUCTO";
    this.url = global.url;
    this.tipoproducto = new TipoProducto(1,'',1);
    this.tipoproductos= Array<TipoProducto>();
  }

  ngOnInit() {
    this.gettipoproducto();
  }


  gettipoproducto(){
    this._tipoproductoService.gettipoproducto().subscribe(
      response=>{
        if(response.status == 'success'){
          this.tipoproductos = response.Tipoproducto; 
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  
  

  buscartipoproducto(buscar,event){
    event.preventDefault();

    this._tipoproductoService.buscartipoproductonombre(buscar).subscribe(
      response =>{
        if(response.status == 'success'){
          this.tipoproductos = response.Tipoproducto;
        }
      },error=>{
        console.log(error);
        if(error.status == 404){
          console.log(<any>error);
        }
      }
    );
  }




    activardesactivartipoproducto(id){
      this._tipoproductoService.activardesactivartipoproducto(id).subscribe(
        response => {
          this.gettipoproducto();
        },
        error=>{
          console.log(error);
          
        }
      );
    }
  
  

}
