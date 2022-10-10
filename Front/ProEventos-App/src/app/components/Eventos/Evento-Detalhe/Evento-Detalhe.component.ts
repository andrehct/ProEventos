import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { EventoService } from '@app/services/evento.service';
import { LoteService } from '@app/services/lote.service';
import { setDate } from 'ngx-bootstrap/chronos/utils/date-setters';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Evento-Detalhe',
  templateUrl: './Evento-Detalhe.component.html',
  styleUrls: ['./Evento-Detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  modalRef: BsModalRef;
  form!: FormGroup;
  evento: Evento;
  localEventoId: number;
  modoSalvar = 'post';
  loteAtual = {id: 0, nome: '', indice: 0};

  get f(): any{
    return this.form.controls;
  }

  get modoEditar(): boolean{
    return this.modoSalvar === 'put';
  }

  get bsconfig() : any{
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:mm',
      containerClass: 'theme-default',
      showWeekNumbers: false
    }
  }

  get lotes(): FormArray{
    return this.form.get('lotes') as FormArray;
  }

  constructor(private fb: FormBuilder, private localeService: BsLocaleService,
              private activatedRouter: ActivatedRoute, private eventoService: EventoService,
              private spinner: NgxSpinnerService, private toastr: ToastrService,
              private router: Router, private loteService: LoteService,
              private modalService: BsModalService) {
    this.localeService.use('pt-br');
  }

  public carregarEvento():void{
    this.localEventoId = +this.activatedRouter.snapshot.paramMap.get('id');

    if(this.localEventoId !== null && this.localEventoId !== 0){
      this.spinner.show();

      this.modoSalvar = 'put';

      this.eventoService.getEventoById(this.localEventoId).subscribe({
        next: (e : Evento) => {
          this.evento = {... e}; //se fizesse "= e" ele apenas apontaria, o "... e" faz a atribuição real dos valores de "e" para "eventos"
          this.form.patchValue(this.evento);
          this.evento.lotes.forEach(lote =>{
            this.lotes.push(this.criarLote(lote));
          }); //carregando os lotes
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar evento', 'Erro!');
          console.error(error);
        },
        complete: () => this.spinner.hide()
      }); //o "+" faz uma string virar int
    }
  }

  ngOnInit() {
    this.carregarEvento();
    this.validation();
  }

  public mudarValorData(value: Date, indice: number, campo: string): void{
    this.lotes.value[indice][campo] = value;
  }

  public validation(): void{
    this.form = this.fb.group(
      {
        local: [],
        dataEvento: [],
        tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        qtdPessoas: [],
        imagemURL: [],
        telefone: [],
        email: ['', [Validators.required, Validators.email]],
        lotes: this.fb.array([])
      }
    );
  }

  adicionarLote(): void{
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }

  criarLote(lote: Lote): FormGroup{
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio, Validators.required],
      dataFim: [lote.dataFim, Validators.required]
    })
  }

  public resetarForm(): void{
    this.form.reset();
  }

  public cssValidator(campoForm : FormControl | AbstractControl) : any{
    return {'is-invalid': campoForm.errors && campoForm.touched}
  }

  public salvarEvento(): void
  {
    this.spinner.show();

    if(this.form.valid)
    {
      this.evento = (this.modoSalvar === 'post')
                    ? {... this.form.value}
                    : {id: this.evento.id, ... this.form.value}

      this.eventoService[this.modoSalvar](this.evento).subscribe(
      {
        next: (eventoRetorno: Evento) => {
          this.toastr.success('Evento salvo com sucesso', 'Sucesso');
          //BEGIN
          //após salvar com sucesso chama a pagina de detalhe desse novo evento,
          //para ele "entrar em modo editar". Possível pois o "next" recebe um evento de retorno,
          //basta olhar no "post" (back/src/API/Controllers/EventosController.cs)
          this.router.navigate([`Eventos/Detalhe/${eventoRetorno.id}`]);
          //END
        },
        error: (error:any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar evento', 'Erro');
        },
        complete: () => this.spinner.hide()
      });
    }
  }

  public salvarLotes(): void
  {
    if(this.form.controls.lotes.valid){
      this.spinner.show();
      this.loteService.saveLote(this.localEventoId, this.form.value.lotes).subscribe(
        () => {
          this.toastr.success('Lotes salvos com sucesso','Sucesso!');
          this.lotes.reset();
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar salvar lotes.', 'Erro');
          console.error(error);
        }
      ).add(() => this.spinner.hide());
    }
  }

  public removerLote(template: TemplateRef<any>, indice: number): void{
    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmDeleteLote(): void{
    this.modalRef.hide();
    this.spinner.show();

    this.loteService.deleteLote(this.localEventoId, this.loteAtual.id).subscribe(
      () => {
        this.toastr.success('Lote deletado com sucesso', 'Sucesso');
        this.lotes.removeAt(this.loteAtual.indice);
      },
      (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o lote ${this.loteAtual.id}`, 'Erro');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }

  public declineDeleteLote(): void{
    this.modalRef.hide();
  }

  public retornaTituloLote(nome: string): string{
    return (nome === null || nome === '') ? 'Nome do lote' : nome
  }
}
