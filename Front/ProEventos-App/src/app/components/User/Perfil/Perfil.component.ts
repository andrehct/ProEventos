import { Component, OnInit } from '@angular/core';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { environment } from '@environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Perfil',
  templateUrl: './Perfil.component.html',
  styleUrls: ['./Perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user = {} as UserUpdate;
  localImagemURL = '';
  file: File;

  public get isPalestrante(): boolean{
    return this.user.funcao === 'Palestrante';
  }

  constructor(private spinner : NgxSpinnerService, private toastr: ToastrService,
              private accountService: AccountService)
  { }

  public setFormValue(usuario: UserUpdate): void{
    this.user = usuario;
    if(this.user.imagemURL)
      this.localImagemURL = environment.apiURL + `Resources/Perfil/${this.user.imagemURL}`;
    else
      this.localImagemURL = './assets/SemImagem.png';
  }

  onFileChange(ev : any):void
  {
    const reader = new FileReader();

    reader.onload = (event : any) => this.localImagemURL = event.target.result;

    this.file = ev.target.files;

    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  private uploadImagem():void{
    this.spinner.show();
    this.accountService.postUpload(this.file).subscribe(
      () => this.toastr.success('Imagem atualizada com sucesso', 'Sucesso'),
      (error: any) => {
        this.toastr.error('Erro ao fazer upload de imagem', 'Erro');
        console.error(error);
      }
    ).add(() => this.spinner.hide())
  }

  ngOnInit() {
  }
}
