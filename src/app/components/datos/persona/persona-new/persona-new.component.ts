import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { global } from '../../../../services/global';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-persona-new',
  templateUrl: './persona-new.component.html',
  styleUrls: ['./persona-new.component.css'],
  providers:[
    PersonaService,
  ]
})
export class PersonaNewComponent implements OnInit {

  model;
  public resetVar;
  public url;
  public page_title: string;
  public persona: Persona;
  public status;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _personaService: PersonaService ,
    
  ){ 
    this.page_title = "NUEVA PERSONA";
    this.persona = new Persona(0,'','',0,'','','',0,'');
    this.url = global.url;
       
  }

  ngOnInit() {
  }



  onSubmit(personaForm){
    this._personaService.create(this.persona).subscribe(
      response =>{
        if(response.status == 'success'){
          this.persona = response.Persona;
          this.status = 'success';

          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Persona agregada',
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
      afterUploadMsg_success: 'Imagen registrada  !',
      afterUploadMsg_error: 'Fallo al subir imagen !'
    }
    
  };

  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.persona.foto = image_data.image;
  }




}
