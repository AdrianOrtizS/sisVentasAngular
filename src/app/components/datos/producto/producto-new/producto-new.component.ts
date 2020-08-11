import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoproductoService } from 'src/app/services/tipoproducto.service';
import { global } from '../../../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-new',
  templateUrl: './producto-new.component.html',
  styleUrls: ['./producto-new.component.css'],
  providers:[
    ProductoService,
    TipoproductoService
  ]
})
export class ProductoNewComponent implements OnInit {


  model;
  public resetVar;
  public url;
  public page_title: string;
  public producto: Producto;
  public tipoproducto;
  public status;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService ,
    private _tipoproductoService: TipoproductoService,
    
  ){ 
    this.page_title = "NUEVO PRODUCTO";
    this.producto = new Producto(0,'','',0,0,'',0,0,0,0.0);
    this.url = global.url;
       
  }

  ngOnInit() {
    this.gettipoproducto();
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


  onSubmit(productoForm){
  
    this._productoService.create(this.producto).subscribe(
      response =>{
        if(response.status == 'success'){
          this.producto = response.Producto;
          this.status = 'success';

          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado',
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
    replaceTexts: {
      selectFileBtn: 'Seleccione foto',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Imagen registrada  !',
      afterUploadMsg_error: 'Fallo al subir imagen !'
    }
    
  };

  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.producto.foto = image_data.image;
  }




}
