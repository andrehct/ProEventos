import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];
  widthImgs: number = 100;
  marginImgs: number = 2;
  showImgs: boolean = true;
  private _filtroLista: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  public get filtroLista() : string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  private filtrarEventos(value: string) : any{
    value = value.toLowerCase();
    return this.eventos.filter(
      (e: {tema:string; local:string}) => e.tema.toLocaleLowerCase().indexOf(value) !== -1 ||
                                          e.local.toLocaleLowerCase().indexOf(value) !== -1
    );
  }

  alterarShowImgs(){
    this.showImgs = !this.showImgs;
  }

  public getEventos(): void{

    this.http.get('https://localhost:5001/api/Eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = response;
      },
      error => console.log(error)
    );
  }

}
