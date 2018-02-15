import { CustumerMessageService } from './../alert-message/custumerMessage-service';
import { AlertMessageComponent } from './../alert-message/alert-message.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';
import { ListaComponent } from '../lista/lista.component';
//import { RouterModule } from '@angular/router';
import { SearchCepService } from './services/search-cep.service';
import { CadastroRoutingModule } from './cadastro-routing-module';
import { ApiUsuarioService } from './services/api-usuario.service';
import { DependentesComponent } from './dependentes/dependentes.component';
import { DocsPipe } from '../docs.pipe';
import { FormatDocsDirective } from './directive/default-directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CadastroRoutingModule,
        ReactiveFormsModule ,
        MaterializeModule.forRoot()
    ],
    exports: [],
    declarations: [
        CadastroComponent,
        ListaComponent,
        EnderecoComponent,
        DependentesComponent,
        DocsPipe,
        FormatDocsDirective,
        AlertMessageComponent
    ],
    providers: [
        SearchCepService,
        ApiUsuarioService,
        CustumerMessageService
    ],
})
export class CadastroModule {}

