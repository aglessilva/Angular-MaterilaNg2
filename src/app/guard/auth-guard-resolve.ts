import { ApiUsuarioService } from './../cadastro/services/api-usuario.service';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ListaComponent } from '../lista/lista.component';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuardResolver implements Resolve<ListaComponent>
{

    constructor(private apiUsuarioService: ApiUsuarioService ) {
        
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {

         return this.apiUsuarioService.getUser()
    }
}