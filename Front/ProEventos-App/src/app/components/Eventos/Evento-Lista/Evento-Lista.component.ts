import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-Evento-Lista',
  templateUrl: './Evento-Lista.component.html',
  styleUrls: ['./Evento-Lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public widthImgs: number = 100;
  public marginImgs: number = 2;
  showImgs: boolean = true;
  private _filtroLista: string = "";
  public modalRef = {} as BsModalRef;

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  public ngOnInit() {
    this.spinner.show();
    this.getEventos();
  }

  public get filtroLista() : string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  private filtrarEventos(value: string) : Evento[]{
    value = value.toLowerCase();
    return this.eventos.filter(
      (e: {tema:string; local:string}) => e.tema.toLocaleLowerCase().indexOf(value) !== -1 ||
                                          e.local.toLocaleLowerCase().indexOf(value) !== -1
    );
  }

  public alterarShowImgs(){
    this.showImgs = !this.showImgs;
  }

  public getEventos(): void{
    this.eventoService.getEventos().subscribe({
      next: (_eventos : Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = _eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos', 'Erro!')
      },
      complete: () => this.spinner.hide()
    });
  }

  public openModal(template: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
  }

  public confirm(): void{
    this.modalRef.hide();
    this.toastr.success('O evento foi deletado com sucesso', 'Deletado!')
  }

  public decline(): void{
    this.modalRef.hide();
  }

  public detalheEvento(id: number): void{
    this.router.navigate([`Eventos/Detalhe/${id}`]);
  }
}
