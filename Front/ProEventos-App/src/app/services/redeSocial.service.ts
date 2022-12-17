import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RedeSocial } from '@app/models/RedeSocial';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedeSocialService {

  baseURL = environment.apiURL + 'api/redesSociais';

  constructor(private http: HttpClient) { }

  /**
   *
   * @param origem precisa passar a palavra 'Palestrante' ou 'Evento' (dessa forma)
   * @param id Precisa passar o PalestranteId ou EventoId
   */
  public getRedesSociais(origem: string, id: number): Observable<RedeSocial[]>{
    let URL = (id === 0 ? `${this.baseURL}/${origem}` : `${this.baseURL}/${origem}/${id}`);

    return this.http.get<RedeSocial[]>(URL).pipe(take(1));
  }

  /**
   *
   * @param origem precisa passar a palavra 'palestrante' ou 'evento' (dessa forma)
   * @param id Precisa passar o PalestranteId ou EventoId
   * @param redesSociais Precisa passar redes sociais organizadas em RedeSocial[]
   */
   public saveRedesSociais(origem: string, id: number, redesSociais: RedeSocial[]): Observable<RedeSocial[]>{
    let URL = (id === 0 ? `${this.baseURL}/${origem}` : `${this.baseURL}/${origem}/${id}`);

    return this.http.put<RedeSocial[]>(URL, redesSociais).pipe(take(1));
  }

  /**
   *
   * @param origem precisa passar a palavra 'Palestrante' ou 'Evento' (dessa forma)
   * @param id Precisa passar o PalestranteId ou EventoId
   * @param rsId Precisa passar o id da rede social
   */
   public deleteRedeSocial(origem: string, id: number, rsId: number): Observable<any>{
    let URL = (id === 0 ? `${this.baseURL}/${origem}/${rsId}` : `${this.baseURL}/${origem}/${id}/${rsId}`);

    return this.http.delete(URL).pipe(take(1));
  }
}
