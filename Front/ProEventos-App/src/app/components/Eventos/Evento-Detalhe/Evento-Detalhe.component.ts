import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-Evento-Detalhe',
  templateUrl: './Evento-Detalhe.component.html',
  styleUrls: ['./Evento-Detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form!: FormGroup;

  get f(): any{
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
}
