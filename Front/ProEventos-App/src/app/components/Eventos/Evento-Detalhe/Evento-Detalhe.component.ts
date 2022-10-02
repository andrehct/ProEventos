import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Evento-Detalhe',
  templateUrl: './Evento-Detalhe.component.html',
  styleUrls: ['./Evento-Detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form!: FormGroup;
  evento: Evento;
  modoSalvar = 'post';

  get f(): any{
    return this.form.controls;
  }

  get bsconfig() : any{
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    }
  }

  constructor(private fb: FormBuilder, private localeService: BsLocaleService,
              private router: ActivatedRoute, private eventoService: EventoService,
              private spinner: NgxSpinnerService, private toastr: ToastrService) {
    this.localeService.use('pt-br');
  }

  public carregarEvento():void{
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if(eventoIdParam !== null){
      this.spinner.show();

      this.modoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe({
        next: (e : Evento) => {
          this.evento = {... e}; //se fizesse "= e" ele apenas apontaria, o "... e" faz a atribuição real dos valores de "e" para "eventos"
          this.form.patchValue(this.evento);
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

  public validation(): void{
    this.form = this.fb.group(
      {
        local: [],
        dataEvento: [],
        tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        qtdPessoas: [],
        imagemURL: [],
        telefone: [],
        email: ['', [Validators.required, Validators.email]]
      }
    );
  }

  public resetarForm(): void{
    this.form.reset();
  }

  public cssValidator(campoForm : FormControl) : any{
    return {'is-invalid': campoForm.errors && campoForm.touched}
  }

  public salvarAlteracao(): void
  {

    this.spinner.show();

    if(this.form.valid)
    {
      this.evento = (this.modoSalvar === 'post')
                    ? {... this.form.value}
                    : {id: this.evento.id, ... this.form.value}

      this.eventoService[this.modoSalvar](this.evento).subscribe(
      {
        next: () => this.toastr.success('Evento salvo com sucesso', 'Sucesso'),
        error: (error:any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar evento', 'Erro');
        },
        complete: () => this.spinner.hide()
      });
    }
  }
}
