import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { PalestranteService } from '@app/services/palestrante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Perfil-Detalhe',
  templateUrl: './Perfil-Detalhe.component.html',
  styleUrls: ['./Perfil-Detalhe.component.scss']
})
export class PerfilDetalheComponent implements OnInit {

  @Output() changeFormValue = new EventEmitter();

  userUpdate = {} as UserUpdate;
  form!: FormGroup;

  constructor(private fb: FormBuilder, public accountService: AccountService,
    private router: Router, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private palestranteService: PalestranteService) { }

  get f(): any{
    return this.form.controls;
  }

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
    this.verificaForm();
  }

  private verificaForm():void{
    this.form.valueChanges.subscribe(
      () => this.changeFormValue.emit({... this.form.value})
    );
  }

  private carregarUsuario(): void{
    this.spinner.show();
    this.accountService.getUser().subscribe(
      (userRetorno: UserUpdate) => {
        console.log(userRetorno);
        this.userUpdate = userRetorno;
        this.form.patchValue(this.userUpdate);
        this.toastr.success('Usuário carregado','Sucesso!');
      },
      (error) => {
        console.error(error);
        this.toastr.error('Usuário não carregado', 'Erro!');
        this.router.navigate(['/Dashboard']);
      }
    ).add(() => this.spinner.hide());
  }

  private validation(): void{
    const formOptions: AbstractControlOptions={
      validators: ValidatorField.MustMatch('password', 'confirmarSenha')
    }

    this.form = this.fb.group({
      //olhar as propriedades no models/identity userUpdate.ts
      userName: [''],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      titulo: ['NaoInformado', Validators.required],
      funcao: ['NaoInformado', Validators.required],
      phoneNumber: ['', Validators.required],
      descricao: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      imagemURL: ['']
    }, formOptions)
  }


  onSubmit(): void{
    this.atualizarUsuario();
  }

  public atualizarUsuario(): void{
    this.userUpdate = { ... this.form.value}
    this.spinner.show();

    if(this.f.funcao.value == 'Palestrante'){
      this.palestranteService.post().subscribe(
        () => this.toastr.success('Função palestrante ativada', 'Sucesso'),
        (error) => {
          this.toastr.error('Função palestrante não ativada', 'Erro');
          console.log(error);
        }
      )
    }

    this.accountService.updateUser(this.userUpdate).subscribe(
      () => this.toastr.success('Usuário atualizado!', 'Sucesso!'),
      (error: any) => {
        this.toastr.error(error.error);
        console.error(error);
      }
    ).add(() => this.spinner.hide())
  }

  public resetarForm(event : any): void{
    event.preventDefault();
    this.form.reset();
  }
}
