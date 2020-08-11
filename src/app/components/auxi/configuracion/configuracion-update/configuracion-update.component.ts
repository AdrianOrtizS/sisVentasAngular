import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Configuracion } from 'src/app/models/configuracion';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { global }  from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion-update',
  templateUrl: './configuracion-update.component.html',
  styleUrls: ['./configuracion-update.component.css'],
  providers:[
    ConfiguracionService
  ]
})
export class ConfiguracionUpdateComponent implements OnInit {

  public url;
  public page_title: string;
  public configuracion: Configuracion;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _configuracionService: ConfiguracionService 
  ) 
  { 
    this.page_title = "ACTUALIZA CONFIGURACION";
    this.url = global.url;
  }

  ngOnInit() {
    this.getconfiguracion();
  }


  getconfiguracion(){
    this._route.params.subscribe(params => {
    let id = params['id'];
    
      this._configuracionService.verconfiguracion(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.configuracion = response.Configuracion;
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




onSubmit(configuracionForm){
    
  this._configuracionService.actualizarconfiguracion(this.configuracion,this.configuracion.id).subscribe(
    response =>{

      if(response.status == 'success'){
        this.configuracion = response.Configuracion;
        this.status = 'success';

          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Informacion de configuracion actualizada!!',
            showConfirmButton: false,
            timer: 2000
          })
          ///////////

        this._router.navigate(['/configuracion']);
        configuracionForm.reset();
      }else{
        this.status = 'error';
      }
    },
    error =>{
      this.status = 'error yayayaya';
      console.log(<any>error);
      console.log(this.status);
    }
  );

} 



}
