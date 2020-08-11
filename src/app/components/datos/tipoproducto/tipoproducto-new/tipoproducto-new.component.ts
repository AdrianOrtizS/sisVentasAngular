import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TipoProducto } from 'src/app/models/tipoproducto';
import { TipoproductoService } from 'src/app/services/tipoproducto.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-tipoproducto-new',
  templateUrl: './tipoproducto-new.component.html',
  styleUrls: ['./tipoproducto-new.component.css'],
  providers:[
    TipoproductoService
  ]
})
export class TipoproductoNewComponent implements OnInit {

  public url;
  public page_title:string;
  public tipoproducto: TipoProducto;
  public status;



  constructor(
    private _tipoproductoservice: TipoproductoService,    
    private _route: ActivatedRoute,
    private _router: Router
  ) 
  {
    this.page_title = "TIPO PRODUCTO";
    this.tipoproducto = new TipoProducto(1,'',1);
    this.url = global.url;
   }

  ngOnInit() {
  }


 
  onSubmit(tipoproductoForm){
    this._tipoproductoservice.create(this.tipoproducto).subscribe(
      response =>{
        if(response.status == 'success'){
          this.tipoproducto = response.Tipoproducto;
          this.status = 'success';

          //Alert///
          //Swal.fire({
          //  position: 'top-end',
          //  icon: 'success',
          //  title: 'Persona agregada',
          //  showConfirmButton: false,
          //  timer: 2000
          //})
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


