import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { Palestrante } from '@app/models/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { environment } from '@environments/environment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-Palestrante-Lista',
  templateUrl: './Palestrante-Lista.component.html',
  styleUrls: ['./Palestrante-Lista.component.scss']
})
export class PalestranteListaComponent implements OnInit {

  public termoBuscaChanged: Subject<string> = new Subject<string>();
  public pagination = { } as Pagination;
  public palestrantes: Palestrante[] = [];

  constructor(private palestranteService: PalestranteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.pagination = {currentPage: 1, itemsPerPage: 3, totalItems: 1} as Pagination;
    this.carregarPalestrantes();
  }

  public filtrarPalestrantes(evt: any) : void{
    if(this.termoBuscaChanged.observers.length == 0)
    {
      this.termoBuscaChanged.pipe(debounceTime(1500)).subscribe(
        filtrarPor => {
          this.spinner.show();
          this.palestranteService.getPalestrantes(this.pagination.currentPage,
            this.pagination.itemsPerPage, filtrarPor).subscribe(
              (paginatedResult: PaginatedResult<Palestrante[]>) => {
                this.palestrantes = paginatedResult.result;
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

  public getImagemPalestrante(imageName: string): string{
    if(imageName)
      return environment.apiURL + `Resources/Perfil/${imageName}`;
    else
      return './assets/SemImagem.png';
  }

  public carregarPalestrantes(){
    this.spinner.show();

    this.palestranteService.getPalestrantes(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
      next: (paginatedResult : PaginatedResult<Palestrante[]>) => {
        this.palestrantes = paginatedResult.result;
        this.pagination = paginatedResult.pagination;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os palestrantes', 'Erro!')
      }
    }).add(() => this.spinner.hide());
  }

}
