import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { global }  from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona-update',
  templateUrl: './persona-update.component.html',
  styleUrls: ['./persona-update.component.css'],
  providers:[
    PersonaService,
   
  ]
})
export class PersonaUpdateComponent implements OnInit {

  model;
  public resetVar;
  public url;
  public page_title:string;
  public persona;
  public status;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _personaService: PersonaService ,

  ){ 
    this.page_title = "EDITAR";
    this.url = global.url;
  }


  ngOnInit() {
      this.persona = new Persona(1,'','',1,'','','',1,'');
      this.getpersona();
  }




  getpersona(){
    this._route.params.subscribe(params => {
    let id = params['id'];
    
      this._personaService.verpersona(id).subscribe(
        response =>{

          if(response.status == 'success'){
            this.persona = response.Persona;
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



onSubmit(personaForm){

  this._personaService.actualizarpersona(this.persona,this.persona.id).subscribe(
    response =>{

      if(response.status == 'success'){
        this.persona = response.Persona;
        this.status = 'success';

          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Informacion de persona actualizada!!',
            showConfirmButton: false,
            timer: 2000
          })
          ///////////

        this._router.navigate(['/persona']);
        personaForm.reset();
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
      url: global.url+'/persona/image/upload',
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
    this.persona.foto = image_data.image;
  }

}
