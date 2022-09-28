import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-Perfil',
  templateUrl: './Perfil.component.html',
  styleUrls: ['./Perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;
  constructor(public fb: FormBuilder) { }

  get f(): any{
    return this.form.controls;
  }

  ngOnInit() {
    this.validation();
  }

  private validation(): void{
    const formOptions: AbstractControlOptions={
      validators: ValidatorField.MustMatch('senha', 'confirmarSenha')
    }

    this.form = this.fb.group({
      primNome: ['', Validators.required],
      ultNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      titulo: ['', Validators.required],
      funcao: ['', Validators.required],
      telefone: ['', Validators.required],
      descricao: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, formOptions)
  }

  onSubmit(): void{
    if(this.form.invalid){
      return;
    }
  }

  public resetarForm(event : any): void{
    event.preventDefault();
    this.form.reset();
  }
}
