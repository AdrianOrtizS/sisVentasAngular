import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { from } from 'rxjs';
import { global } from 'src/app/services/global';
import { Configuracion } from 'src/app/models/configuracion';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  providers:[
    ConfiguracionService
  ]
})
export class ConfiguracionComponent implements OnInit {

  public p: number;

  public page_title:string;
  public url;
  public configuracion: Array<Configuracion>;
  

  constructor(    
    private _configuracionService: ConfiguracionService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "CONFIGURACION";
    this.url = global.url;
  }

  ngOnInit() {
    this.getconfiguracion();
  }


  getconfiguracion(){
    this._configuracionService.getconfiguracion().subscribe(
      response=>{
        if(response.status == 'success'){
          this.configuracion = response.Configuracion; 
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  
   
  

}
