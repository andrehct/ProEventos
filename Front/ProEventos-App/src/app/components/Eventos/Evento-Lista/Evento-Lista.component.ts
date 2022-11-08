import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { environment } from '@environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-Evento-Lista',
  templateUrl: './Evento-Lista.component.html',
  styleUrls: ['./Evento-Lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  public eventos: Evento[] = [];
  public widthImgs: number = 100;
  public marginImgs: number = 2;
  showImgs: boolean = true;
  public eventoId : number;
  public modalRef = {} as BsModalRef;
  public pagination = { } as Pagination;
  public termoBuscaChanged: Subject<string> = new Subject<string>();

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  public ngOnInit() {
    this.pagination = {currentPage: 1, itemsPerPage: 3, totalItems: 1} as Pagination;
    this.carregarEventos();
  }

  public filtrarEventos(evt: any) : void{
    if(this.termoBuscaChanged.observers.length == 0)
    {
      this.termoBuscaChanged.pipe(debounceTime(1500)).subscribe(
        filtrarPor => {
          this.spinner.show();
          this.eventoService.getEventos(this.pagination.currentPage,
            this.pagination.itemsPerPage, filtrarPor).subscribe(
              (paginatedResult: PaginatedResult<Evento[]>) => {
                this.eventos = paginatedResult.result;
                this.pagination = paginatedResult.pagination;
              },
              (error: any) => {
                this.spinner.hide();
                this.toastr.error('Erro ao carregar os eventos', 'Erro!')
              }
            ).add(() => this.spinner.hide())
        }
      )
    }
    this.termoBuscaChanged.next(evt.value);
  }

  public alterarShowImgs(){
    this.showImgs = !this.showImgs;
  }


  public mostraImagem(imgUrl: string): string{
    return (imgUrl !== '' && imgUrl !== null) ? `${environment.apiURL}Resources/Images/${imgUrl}`
                           : 'assets/SemImagem.png'
  }

  public carregarEventos(): void{
    this.spinner.show();

    this.eventoService.getEventos(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
      next: (paginatedResult : PaginatedResult<Evento[]>) => {
        this.eventos = paginatedResult.result;
        this.pagination = paginatedResult.pagination;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos', 'Erro!')
      }
    }).add(() => this.spinner.hide());
  }

  public openModal(event : any, template: TemplateRef<any>, eventoID : number): void{
    event.stopPropagation();
    this.eventoId = eventoID;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
  }

  public confirm(): void{
    this.modalRef.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        //objeto no back/src/api/EventosController, task de delete
        if(result.message === 'Deletado'){
          this.toastr.success('O evento foi deletado com sucesso', 'Deletado!');
          this.spinner.hide();
          this.carregarEventos();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`,  'Erro');
        this.spinner.hide();
      },
      () => {this.spinner.hide();}
    );
  }

  public decline(): void{
    this.modalRef.hide();
  }

  public detalheEvento(id: number): void{
    this.router.navigate([`Eventos/Detalhe/${id}`]);
  }

  public pageChanged(event): void{
    this.pagination.currentPage = event.page;
    this.carregarEventos();
  }
}
