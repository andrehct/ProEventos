import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-Registro',
  templateUrl: './Registro.component.html',
  styleUrls: ['./Registro.component.scss']
})
export class RegistroComponent implements OnInit {
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
      userName: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, formOptions)
  }
}
