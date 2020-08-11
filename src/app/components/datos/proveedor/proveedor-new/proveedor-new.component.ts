import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { global } from '../../../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor-new',
  templateUrl: './proveedor-new.component.html',
  styleUrls: ['./proveedor-new.component.css'],
  providers:[
    ProveedorService,
  ]
})
export class ProveedorNewComponent implements OnInit {

  model;
  public resetVar;
  public url;
  public page_title: string;
  public proveedor: Proveedor;
  public status;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _proveedorService: ProveedorService ,
    
  ){ 
    this.page_title = "NUEVA PROVEEDOR";
    this.proveedor = new Proveedor(0,'','','','','',0,'');
    this.url = global.url;
       
  }

  ngOnInit() {
  }



  onSubmit(proveedorForm){
    this._proveedorService.create(this.proveedor).subscribe(
      response =>{
        if(response.status == 'success'){
          this.proveedor = response.Proveedor;
          this.status = 'success';

          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Proveedor agregada',
            showConfirmButton: false,
            timer: 2000
          })
         ///////////

          this._router.navigate(['/proveedor']);
          proveedorForm.reset();
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
      url: global.url+'/proveedor/image/upload',
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
    this.proveedor.foto = image_data.image;
  }




}
