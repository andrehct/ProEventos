import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/identity/User';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { environment } from '@environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AccountService {
  private currentUserSource = new ReplaySubject<User>(1);
  //variáveis com o $ na frente, normalmente, são para receber observables
  public currentUser$ = this.currentUserSource.asObservable();

  baseUrl = environment.apiURL + 'api/User/';

  constructor(private http: HttpClient) { }

  public login(model : any): Observable<void>{
    return this.http.post<User>(this.baseUrl + 'login', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  public logout():void{
    localStorage.removeItem('usuario');
    this.currentUserSource.next(null);
    this.currentUserSource.complete();
  }

  public setCurrentUser(usuario : User):void{
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.currentUserSource.next(usuario);
  }

  public registerAcc(model : any): Observable<void>{
    return this.http.post<User>(this.baseUrl + 'Register', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  public getUser(): Observable<UserUpdate>{
    return this.http.get<UserUpdate>(this.baseUrl + 'getUser').pipe(take(1));
  }

  public updateUser(model: UserUpdate): Observable<void>{
    return this.http.put<UserUpdate>(this.baseUrl + 'updateUser', model).pipe(
      take(1),
      map((user: UserUpdate) => {
              this.setCurrentUser(user);
            }
          )
        );
  }
}
