import { AuthGuard } from './guard/auth-guard';
import { LoaderService } from './loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { SearchCepService } from './cadastro/services/search-cep.service';
import { HttpClientModule } from '@angular/common/http';
import { ListaComponent } from './lista/lista.component';
import { ReactiveFormsModule } from '@angular/forms'
import { ApiUsuarioService } from './cadastro/services/api-usuario.service';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { CadastroGuardCandActivate } from './guard/auth-guard-candActivate';


 
@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ListaComponent,
    AlertMessageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterializeModule.forRoot()
  ],
  providers: [
    SearchCepService,
    ApiUsuarioService,
    LoaderService,
    AuthService,
    AuthGuard,
    CadastroGuardCandActivate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
