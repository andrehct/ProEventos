import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '@app/models/identity/UserLogin';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {
  model = {} as UserLogin;

  constructor(private accountService: AccountService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {}

  public login(): void{
    this.accountService.login(this.model).subscribe(
      () => {this.router.navigateByUrl('/dashboard')},
      (error: any) => {
        if(error.status == 401) this.toastr.error('Usuário e/ou senha inválido(s)')
        else console.error(error);
      }
    );
  }
}
