import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';
import { LoaderService } from './loader.service';
import { AuthGuard } from './guard/auth-guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuardResolver } from './guard/auth-guard-resolve';
import { CadastroGuardCandActivate } from './guard/auth-guard-candActivate';
import { HttpClientModule } from '@angular/common/http';
import { DependentesComponent } from './cadastro/dependentes/dependentes.component';
import { CadastroModule } from './cadastro/cadastro-module';
//import { EnderecoComponent } from './cadastro/endereco/endereco.component';
//import { ApiUsuarioService } from './cadastro/services/api-usuario.service';
//import { SearchCepService } from './cadastro/services/search-cep.service';
//import { CadastroComponent } from './cadastro/cadastro.component';
//import { ListaComponent } from './lista/lista.component';




 
@NgModule({
  declarations: [
    AppComponent,
    AlertMessageComponent,
    LoginComponent,
  // CadastroComponent,
  // ListaComponent,
  // DependentesComponent,
  // EnderecoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    CadastroModule,
    AppRoutingModule,
    MaterializeModule.forRoot()
  ],
  providers: [
   // SearchCepService,
   // ApiUsuarioService,
    LoaderService,
    AuthService,
    AuthGuard,
    AuthGuardResolver,
    CadastroGuardCandActivate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
