import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-persona-show',
  templateUrl: './persona-show.component.html',
  styleUrls: ['./persona-show.component.css'],
  providers:[
    PersonaService,
  ]
})
export class PersonaShowComponent implements OnInit {

  public page_title: string;
  public persona;
  public url;

  constructor(
    private _personaService: PersonaService,
    
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "VER PERSONA";
    this.url = global.url;
   
  }

  ngOnInit() {
    this.verpersona();
  }


  verpersona(){
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



}
