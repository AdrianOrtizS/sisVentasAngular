import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TipoProducto } from 'src/app/models/tipoproducto';
import { TipoproductoService } from 'src/app/services/tipoproducto.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-tipoproducto-show',
  templateUrl: './tipoproducto-show.component.html',
  styleUrls: ['./tipoproducto-show.component.css'],
  providers:[
    TipoproductoService
  ]
})
export class TipoproductoShowComponent implements OnInit {

  public page_title: string;
  public tipoproducto;
  public url;

  constructor(
    private _tipoproductoService: TipoproductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = "TIPO PRODUCTO";
    this.url = global.url;
    this.tipoproducto = new TipoProducto(1,'',1);
   }

  ngOnInit() {
    this.vertipoproducto();
  }

  vertipoproducto(){
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


}
