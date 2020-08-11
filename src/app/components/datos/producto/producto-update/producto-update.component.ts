import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoproductoService } from 'src/app/services/tipoproducto.service';
import { global }  from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css'],
  providers:[
    ProductoService,
    TipoproductoService
  ]
})
export class ProductoUpdateComponent implements OnInit {

  model;
  public resetVar;
  public url;
  public page_title:string;
  public producto;
  public tipoproducto;
  public status;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService ,
    private _tipoproductoService: TipoproductoService

  ){ 
    this.page_title = "EDITAR";
    this.url = global.url;
  }


  
  ngOnInit() {
      this.gettipoproducto();
      this.producto = new Producto(1,'','',0,0,'','',1,1,0.0);
      this.getproducto();
  }



  getproducto(){
    this._route.params.subscribe(params => {
    let id = params['id'];
    
      this._productoService.verproducto(id).subscribe(
        response =>{

          if(response.status == 'success'){
            this.producto = response.Producto;
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



onSubmit(productoForm){

  this._productoService.actualizarproducto(this.producto,this.producto.id).subscribe(
    response =>{

      if(response.status == 'success'){
        this.producto = response.Producto;
        this.status = 'success';

          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Informacion de producto actualizada!!',
            showConfirmButton: false,
            timer: 2000
          })
          ///////////

        this._router.navigate(['/producto']);
        productoForm.reset();
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

 
  gettipoproducto(){
    this._tipoproductoService.gettipoproducto().subscribe(
      response =>{
        this.tipoproducto = response.Tipoproducto;
      },error=>{
        console.log(error);
      }
      
    );
  }

 
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url+'/producto/image/upload',
      headers: {
        // "Authorization" : ""
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Selecciona imagen',
    replaceTexts: {
      selectFileBtn: 'Seleccione foto',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Selecciona imagen...',
      afterUploadMsg_success: 'Imagen registrada  !',
      afterUploadMsg_error: 'Fallo al subir imagen !'
    }
  };



  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.producto.foto = image_data.image;
  }

}
