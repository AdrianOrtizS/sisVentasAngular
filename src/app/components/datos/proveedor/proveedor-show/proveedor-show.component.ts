import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-proveedor-show',
  templateUrl: './proveedor-show.component.html',
  styleUrls: ['./proveedor-show.component.css'],
  providers:[
    ProveedorService,
  ]
})
export class ProveedorShowComponent implements OnInit {

  public page_title: string;
  public proveedor;
  public url;

  constructor(
    private _proveedorService: ProveedorService,
    
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "VER PROVEEDOR";
    this.url = global.url;
   
  }

  ngOnInit() {
    this.verproveedor();
  }


  verproveedor(){
    this._route.params.subscribe(params => {
    let id = params['id'];
    
      this._proveedorService.verproveedor(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.proveedor = response.Proveedor;
                     
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
