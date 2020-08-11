import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfiguracionService} from 'src/app/services/configuracion.service';
import { Ingreso } from 'src/app/models/ingreso';
import { map } from 'rxjs/operators';
import { Chart } from '../../../../../node_modules/chart.js';
import Echo from 'laravel-echo';
import { UsuarioService } from 'src/app/services/usuario.service.js';
import { IngresoService } from 'src/app/services/ingreso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ConfiguracionService,
    UsuarioService,
    IngresoService
  ]
})
export class HomeComponent implements OnInit {

  public page_title;
  public varIngreso;
  public charIngreso;
  public ingresos;
  public varMesIngresos= new Array<number>();
  public varTotalIngresos= new Array<number>();

  public varVenta;
  public charVenta;
  public ventas;
  public varMesVentas= new Array<number>();
  public varTotalVentas= new Array<number>();
  public echo: Echo;
  public ingreso ;
  public identity;
  public token;
  public notificaciones;

  constructor(
    private _http: HttpClient,
    private _configuracionService : ConfiguracionService,
    private _userService: UsuarioService,
    private _ingresoService: IngresoService
  
    ) 
    { 
      this.page_title = "Reportes";
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }


    ngOnInit() {
      this.getIngresos();
      this.getVentas();
     
    }
  

  getIngresos(){
    this._configuracionService.dashboard().subscribe(
      response=>{
            this.ingresos= response.Ingresos;
            this.mesAletrasIngresos();
      
            var canvas = <HTMLCanvasElement> document.getElementById("ingresos");
            var ctx = canvas.getContext("2d");

            this.charIngreso = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: this.varMesIngresos,
                  datasets: [{
                      label: 'Ingresos',
                      data: this.varTotalIngresos,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          });







      },error=>{
        console.log(<any>error);
      }
    );
  }


  mesAletrasIngresos()
  {
    
    for(var i=0 ; i< this.ingresos.length ; i++)
    {
      if(this.ingresos[i].mes == 1)
      {
        this.ingresos[i].mes = "Enero"
      }
      if(this.ingresos[i].mes == 2)
      {
        this.ingresos[i].mes = "Febrero"
      }
      if(this.ingresos[i].mes == 3)
      {
        this.ingresos[i].mes = "Marzo"
      }
      if(this.ingresos[i].mes == 4)
      {
        this.ingresos[i].mes = "Abril"
      }
      if(this.ingresos[i].mes == 5)
      {
        this.ingresos[i].mes = "Mayo"
      }
      if(this.ingresos[i].mes == 6)
      {
        this.ingresos[i].mes = "Junio"
      }
      if(this.ingresos[i].mes == 7)
      {
        this.ingresos[i].mes = "Julio"
      }
      if(this.ingresos[i].mes == 8)
      {
        this.ingresos[i].mes = "Agosto"
      }
      if(this.ingresos[i].mes == 9)
      {
        this.ingresos[i].mes = "Septiembre"
      }
      if(this.ingresos[i].mes == 10)
      {
        this.ingresos[i].mes = "Octubre"
      }
      if(this.ingresos[i].mes == 11)
      {
        this.ingresos[i].mes = "Noviembre"
      }
      if(this.ingresos[i].mes == 12)
      {
        this.ingresos[i].mes = "Diciembre"
      }

      this.varMesIngresos.push(this.ingresos[i].mes)   ;
      this.varTotalIngresos.push(this.ingresos[i].total);
    }


  } 



  getVentas()
  {
    this._configuracionService.dashboard().subscribe(
      response=>{
            this.ventas= response.Ventas;
            
            this.mesAletrasVentas();
      
            var canvas = <HTMLCanvasElement> document.getElementById("ventas");
            var ctx = canvas.getContext("2d");


            this.charVenta = new Chart(ctx, {
              type: 'pie',
              data: {
                  labels: this.varMesVentas,
                  datasets: [{
                      label: 'Ventas',
                      data: this.varTotalVentas,
                      backgroundColor: ['rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          });

      },error=>{
        console.log(<any>error);
      }
    );
  }


  mesAletrasVentas(){
    
    for(var i=0 ; i< this.ventas.length ; i++)
    {
      if(this.ventas[i].mes == 1)
      {
        this.ventas[i].mes = "Enero"
      }
      if(this.ventas[i].mes == 2)
      {
        this.ventas[i].mes = "Febrero"
      }
      if(this.ventas[i].mes == 3)
      {
        this.ventas[i].mes = "Marzo"
      }
      if(this.ventas[i].mes == 4)
      {
        this.ventas[i].mes = "Abril"
      }
      if(this.ventas[i].mes == 5)
      {
        this.ventas[i].mes = "Mayo"
      }
      if(this.ventas[i].mes == 6)
      {
        this.ventas[i].mes = "Junio"
      }
      if(this.ventas[i].mes == 7)
      {
        this.ventas[i].mes = "Julio"
      }
      if(this.ventas[i].mes == 8)
      {
        this.ventas[i].mes = "Agosto"
      }
      if(this.ventas[i].mes == 9)
      {
        this.ventas[i].mes = "Septiembre"
      }
      if(this.ventas[i].mes == 10)
      {
        this.ventas[i].mes = "Octubre"
      }
      if(this.ventas[i].mes == 11)
      {
        this.ventas[i].mes = "Noviembre"
      }
      if(this.ventas[i].mes == 12)
      {
        this.ventas[i].mes = "Diciembre"
      }

      this.varMesVentas.push(this.ventas[i].mes)   ;
      this.varTotalVentas.push(this.ventas[i].total);
    }


  } 



}
