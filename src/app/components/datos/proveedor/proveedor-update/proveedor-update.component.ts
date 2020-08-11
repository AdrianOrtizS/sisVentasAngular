import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { global }  from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor-update',
  templateUrl: './proveedor-update.component.html',
  styleUrls: ['./proveedor-update.component.css'],
  providers:[
    ProveedorService,
   
  ]
})
export class ProveedorUpdateComponent implements OnInit {

  model;
  public resetVar;
  public url;
  public page_title:string;
  public proveedor;
  public tipoproveedor;
  public status;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _proveedorService: ProveedorService 

  ){ 
    this.page_title = "EDITAR";
    this.url = global.url;
  }


  ngOnInit() {
      this.proveedor = new Proveedor(1,'','','','','',1,'');
      this.getproveedor();
  }




  getproveedor(){
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



onSubmit(proveedorForm){

  this._proveedorService.actualizarproveedor(this.proveedor,this.proveedor.id).subscribe(
    response =>{

      if(response.status == 'success'){
        this.proveedor = response.Proveedor;
        this.status = 'success';

          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Informacion de proveedor actualizada!!',
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
      afterUploadMsg_success: 'Foto registrada  !',
      afterUploadMsg_error: 'Fallo al subir foto !'
    }
  };



  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.proveedor.foto = image_data.image;
  }

}
