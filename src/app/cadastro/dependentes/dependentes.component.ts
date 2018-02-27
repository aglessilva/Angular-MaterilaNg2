import { Router } from '@angular/router';
import { ApiUsuarioService } from './../services/api-usuario.service';
import { Component, OnInit,Renderer  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel, FormControl,ReactiveFormsModule  } from '@angular/forms';
import { MzToastService, MzValidationComponent } from 'ng2-materialize';
import { ValidatorErrorMessage } from '../../errorMessageResource';
import { MsgBoxService } from '../../loader.service';


@Component({
  selector: 'app-dependentes',
  templateUrl: './dependentes.component.html',
  styleUrls: ['./dependentes.component.css'],
})
export class DependentesComponent implements OnInit  {

  formulario:  FormGroup
  listUsuario: ISelectItem[]=[];
  dependente: IUsuario = {} as IUsuario ;
  msgErrorResource: any       

  
  constructor(
      private formularioBuilder: FormBuilder,
      private msgBoxService: MsgBoxService,
      private apiUsuarioService: ApiUsuarioService,
      private toastService: MzToastService,
      private route: Router,
    ) {
      this.msgErrorResource = ValidatorErrorMessage
    }
 
    log(e:string) {console.clear();console.log(e)}


  ngOnInit() {
    
    //pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')

     this.formulario = this.formularioBuilder.group({
        responsavel:[this.dependente.responsavel, Validators.required]
        ,nome: [null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]] 
        ,documento: ['225.327.038-57', Validators.minLength(14)] 
        ,dataNascimento: [(new Date().toLocaleString()), [Validators.required, Validators.minLength(8)]] 
        ,email: [null, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required]]
        ,sexo:[false]
      })
      this.getAllUsers()
  }

  getAllUsers()
  {
      this.apiUsuarioService.getUser()
      .toPromise()
      .then((response: Array<IUsuario>) => {
          response.forEach(use => {
              this.listUsuario.push({key:use.nome, value: use.idUsuario} as ISelectItem)
          })
      })
      .catch((err: Error) => {
          alert(err.message)
      })
  }

  apertouSim(eve: any): boolean
  {
    debugger
    return true
  }


  postPutUser() {
    debugger

    if(this.formulario.invalid)
      return

    this.dependente = Object.assign({}, this.formulario.value) ;
    
    if (1===1)
    return

    // this.dependente.tipo = 'D'
    // let dt = this.dependente.dataNascimento.split('/')
    // this.dependente.dataNascimento = dt[2]+'-'+dt[1]+'-'+dt[0]

    // if(this.dependente.sexo)
    //   this.dependente.sexo = 'F'
    //   else
    //   this.dependente.sexo = 'M' 
  
    // let response: IUsuario =  null;
    
    // if(this.dependente.idUsuario > 0) 
    //     this.apiUsuarioService.putUser(this.dependente)
    //     .toPromise()
    //     .then(response => {
    //       this.toastService.show("Dados atualizado com Sucesso!", 3000,'blue z-depth-5');  
    //       this.route.navigate(['/lista'])
    //     })
    //     .catch((err: Error) => alert('ERRO => ' + err.message));
        
    //   else
    //   {
    //     this.apiUsuarioService.postUser(this.dependente)
    //     .toPromise()
    //     .then((responseUser: IUsuario) => {
    //       this.toastService.show("Dados atualizado com Sucesso!", 3000,'blue z-depth-5');  
    //       this.route.navigate(['/lista'])
    //       })
    //       .catch((err: Error) => console.log('ERRO => ' + err.message + '---> ' + err));
    //   }
  }



}


