import { CanActivate } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { ListaComponent } from './lista/lista.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth-guard';
import { CadastroGuardCandActivate } from './guard/auth-guard-candActivate';
import { AuthGuardResolver } from './guard/auth-guard-resolve';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'login' },
  { 
    path: 'cadastro',
    component: CadastroComponent,
    canDeactivate: [CadastroGuardCandActivate],
    canActivate: [AuthGuard]
  },
  // { 
  //   path: 'lista', 
  //   component: ListaComponent,
  //   canActivate: [AuthGuard],
  //   // resolve:{ usuario: AuthGuardResolver}
  // },
  { 
    path: 'alertMessage', 
    component: AlertMessageComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
