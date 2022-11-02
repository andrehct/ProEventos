import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  constructor(public accountService: AccountService, private router:Router) { }

  ngOnInit() {
  }

  logout(): void{
    this.accountService.logout();
    this.router.navigateByUrl('/User/Login');
  }

  showMenu(): boolean{
    return this.router.url !== '/User/Login';
  }
}
