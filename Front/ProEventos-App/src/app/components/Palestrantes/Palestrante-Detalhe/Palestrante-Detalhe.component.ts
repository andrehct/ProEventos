import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Palestrante } from '@app/models/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-Palestrante-Detalhe',
  templateUrl: './Palestrante-Detalhe.component.html',
  styleUrls: ['./Palestrante-Detalhe.component.scss']
})
export class PalestranteDetalheComponent implements OnInit {
  public form!: FormGroup;
  public situacaoForm = '';
  public corDescricao = '';

  constructor(private fb: FormBuilder, private palestranteService: PalestranteService,
              private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.validation();
    this.verificaForm();
    this.carregarPalestrante();
  }

  private validation(): void{
    this.form = this.fb.group({
      miniCurri: ['']
    })
  }

  private carregarPalestrante(): void{
    this.spinner.show();

    this.palestranteService.getPalestrante().subscribe(
      (palestrante: Palestrante) => {
        this.form.patchValue(palestrante);
      },
      (error: any) =>{
        this.toastr.error('Erro ao carregar o palestrante', 'Erro');
        console.log(error);
      }
    )
  }

  public get f(): any{
    return this.form.controls;
  }

  private verificaForm():void{
    this.form.valueChanges.pipe(
      map(
        () =>{
          this.situacaoForm = 'Mini Currículo está sendo atualizado!';
          this.corDescricao = 'text-warning';
        }
      ), debounceTime(1000), tap(() => this.spinner.show())
    ).subscribe(
      () => {
        this.palestranteService.put({... this.form.value}).subscribe(
          () => {
            this.situacaoForm = 'Mini Currículo foi atualizado!';
            this.corDescricao = 'text-success';

            setTimeout(() => {
              this.situacaoForm = 'Mini Currículo foi carregado!';
              this.corDescricao = 'text-muted';
            }, 2000)
          },
          (error) => {
            this.toastr.error('Erro ao tentar atualizar Palestrante', 'Erro');
            console.log(error);
          }
        ).add(() => this.spinner.hide())
      }
    )
  }
}
