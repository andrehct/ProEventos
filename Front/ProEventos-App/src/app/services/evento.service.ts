import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';
import { take } from 'rxjs/operators';

@Injectable(
  //{providedIn: 'root'}
)
export class EventoService {
  baseURL = 'https://localhost:5001/api/Eventos';
  constructor(private http: HttpClient) { }

  public getEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.baseURL)
      .pipe(take(1)); //take serve para fazer o subscribe apenas 1 vez e desinscrever dps
  }

  public getEventosByTema (tema : string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`).pipe(take(1));
  }

  public getEventoById (id : number): Observable<Evento>{
    return this.http.get<Evento>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public post (ev : Evento): Observable<Evento>{
    return this.http.post<Evento>(this.baseURL, ev).pipe(take(1));
  }

  public put (ev : Evento): Observable<Evento>{
    return this.http.put<Evento>(`${this.baseURL}/${ev.id}`, ev).pipe(take(1));
  }

  public deleteEvento (id : number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }
}
