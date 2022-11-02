import { Component } from '@angular/core';
import { User } from './models/identity/User';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProEventos-App';
  constructor(public accountService: AccountService){}

  ngOnInit(): void{
    this.setCurrentUser();
  }

  setCurrentUser(): void{
    let user: User;

    if(localStorage.getItem('usuario'))
      user = JSON.parse(localStorage.getItem('usuario') ?? '{}')
    else
      user = null;

    if(user)
      this.accountService.setCurrentUser(user);
  }
}
