import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers:[
    ProveedorService
  ]
})
export class ProveedorComponent implements OnInit {

  public page_title: string;
  public url;
  public proveedor;
  public proveedor2;
  public p: number;


  constructor(
    private _proveedorService: ProveedorService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "PROVEEDOR";
    this.url = global.url;
    this.proveedor = Array<Proveedor>();
    this.proveedor2 = new Proveedor(1,'','','','','',1,'');
  }

  ngOnInit() {
    this.getproveedor();
  }


  getproveedor(){
    this._proveedorService.getproveedor().subscribe(
      response=>{
        if(response.status == 'success'){
          this.proveedor = response.Proveedor; 
        }
      },
      error=>{
        console.log(error);
      }
    );
  }




  buscarproveedor(buscar,event){
    event.preventDefault();

    this._proveedorService.buscarproveedornombre(buscar).subscribe(
      response =>{
        if(response.status == 'success'){
          this.proveedor = response.Proveedor;
        }
      },error=>{
        console.log(error.status);
        if(error.status == 404){
//            this.autores.autor ="No hay el autor";
        }
      }
    );
  }




  
  activardesactivarproveedor(id){
    this._proveedorService.activardesactivar(id).subscribe(
      response => {
        this.getproveedor();
      },
      error=>{
        console.log(error);
        
      }
    );
  }



}
