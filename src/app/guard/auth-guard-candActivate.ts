import { CadastroComponent } from './../cadastro/cadastro.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DependentesComponent } from '../cadastro/dependentes/dependentes.component';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable()
export class CadastroGuardCandActivate implements CanDeactivate<CadastroComponent> {
    canDeactivate(
        component: CadastroComponent,
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        
        if(component.isChange)
        {
            if(confirm('todos os dados deste formarios serão perdidos\n deseja continuar!'))
                return true;
        }
        else
            return true;    
    }
}

@Injectable()
export class DependenteGuardCandActivate implements CanDeactivate<DependentesComponent> {
    canDeactivate(
        component: DependentesComponent,
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        
        if(component.formulario.dirty)
           return confirm('todos os dados deste formarios serão perdidos\n deseja continuar!')
        //else
           //return true;    
    }
}