import { DependentesComponent } from './dependentes/dependentes.component';
import { ListaComponent } from './../lista/lista.component';
import { AuthGuard } from './../guard/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnderecoComponent } from './endereco/endereco.component';



const routesCadastro: Routes = [
  { path: 'endereco', component: EnderecoComponent },
  { 
    path: 'lista', 
    component: ListaComponent,
    canActivate: [AuthGuard],
    // resolve:{ usuario: AuthGuardResolver}
  },
  {
    path:'dependente', component: DependentesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesCadastro)],
  exports: [RouterModule],
})
export class CadastroRoutingModule { }

