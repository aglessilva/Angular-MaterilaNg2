import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchCepService {

  constructor(
    private _http: HttpClient
  ) { }

  searchCep(_cep: string): Observable<any> {
    return this._http.get( "https://viacep.com.br/ws/" + _cep + "/json/" );
   }
}
