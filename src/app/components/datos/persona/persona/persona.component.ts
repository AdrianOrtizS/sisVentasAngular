import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  providers:[
    PersonaService
  ]
})
export class PersonaComponent implements OnInit {

  public page_title: string;
  public url;
  public persona;
  public persona2;
  public p: number;


  constructor(
    private _personaService: PersonaService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "PERSONA";
    this.url = global.url;
    this.persona = Array<Persona>();
    this.persona2 = new Persona(1,'','',1,'','','',1,'');
  }

  ngOnInit() {
    this.getpersona();
  }


  getpersona(){
    this._personaService.getpersona().subscribe(
      response=>{
        if(response.status == 'success'){
          this.persona = response.Persona; 
        }
      },
      error=>{
        console.log(error);
      }
    );
  }




  buscarpersona(buscar,event){
    event.preventDefault();

    this._personaService.buscarpersonanombre(buscar).subscribe(
      response =>{
        if(response.status == 'success'){
          this.persona = response.Persona;
        }
      },error=>{
        console.log(error.status);
        if(error.status == 404){
//            this.autores.autor ="No hay el autor";
        }
      }
    );
  }




  
  activardesactivarpersona(id){
    this._personaService.activardesactivar(id).subscribe(
      response => {
        this.getpersona();
      },
      error=>{
        console.log(error);
        
      }
    );
  }



}
