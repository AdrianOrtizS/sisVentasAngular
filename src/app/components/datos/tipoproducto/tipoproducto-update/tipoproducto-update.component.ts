import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TipoProducto } from 'src/app/models/tipoproducto';
import { TipoproductoService } from 'src/app/services/tipoproducto.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-tipoproducto-update',
  templateUrl: './tipoproducto-update.component.html',
  styleUrls: ['./tipoproducto-update.component.css'],
  providers:[
    TipoproductoService
  ]
})
export class TipoproductoUpdateComponent implements OnInit {

  public url;
  public page_title: string;
  public tipoproducto: TipoProducto;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _tipoproductoService: TipoproductoService 
  ) 
  { 
    this.page_title = "TIPO PRODUCTO";
    this.url = global.url;
  }

  ngOnInit() {
    this.gettipoproducto();
  }


  gettipoproducto(){
    this._route.params.subscribe(params => {
    let id = params['id'];
    
      this._tipoproductoService.vertipoproducto(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.tipoproducto = response.Tipoproducto;
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




onSubmit(tipoproductoForm){
    
  this._tipoproductoService.actualizartipoproducto(this.tipoproducto,this.tipoproducto.id).subscribe(
    response =>{

      if(response.status == 'success'){
        this.tipoproducto = response.Tipoproducto;
        this.status = 'success';

          //Alert///
         // Swal.fire({
         //   position: 'top-end',
         //   icon: 'success',
         //   title: 'Informacion de persona actualizada!!',
         //   showConfirmButton: false,
        //    timer: 2000
        //  })
          ///////////

        this._router.navigate(['/tipoproducto']);
        tipoproductoForm.reset();
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
