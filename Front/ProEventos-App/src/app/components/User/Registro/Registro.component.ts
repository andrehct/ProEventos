import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { User } from '@app/models/identity/User';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Registro',
  templateUrl: './Registro.component.html',
  styleUrls: ['./Registro.component.scss']
})
export class RegistroComponent implements OnInit {
  user = {} as User;
  form!: FormGroup;
  constructor(private fb: FormBuilder, private accountService: AccountService,
              private router: Router, private toastr: ToastrService) { }

  get f(): any{
    return this.form.controls;
  }

  ngOnInit() {
    this.validation();
  }

  private validation(): void{
    const formOptions: AbstractControlOptions={
      validators: ValidatorField.MustMatch('password', 'confirmarPassword')
    }

    this.form = this.fb.group({
      primNome: ['', Validators.required],
      ultNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, formOptions)
  }

  public register():void{
    this.user = { ... this.form.value}
    this.accountService.registerAcc(this.user).subscribe(
      () => this.router.navigateByUrl('/Dashboard'),
      (error : any) => this.toastr.error(error.error)
    );
  }
}
