import { SearchCepService } from './services/search-cep.service';
import { ApiUsuarioService } from './services/api-usuario.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../loader.service';
import { MzToastService, ErrorMessageResource } from 'ng2-materialize';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormatDocsDirective } from './directive/default-directive';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./../app.component.css']
})


export class CadastroComponent implements OnInit {

  dateActual: number =  Date.now();
  objCep:  IEndereco = null;
  contratoUsuario:IContratoUsuario = { usuario: {} as IUsuario, enderecos: [] as Array<IEndereco>, endereco: {} as IEndereco } as IContratoUsuario;
  isOk: boolean =  true;
  hasRowErro: boolean[]=[]
  isChange: boolean;
  contextItem: object 
  
  private id: number;
  private descriptions: Subscription
  
  constructor(
    private cepService: SearchCepService,
    private apiUsuarioService: ApiUsuarioService,
    private routeNavigate: ActivatedRoute,
    private loaderService: LoaderService,
    private toastService: MzToastService,
    private route: Router
  ) { 
   
  }

  ngOnInit() {
    this.descriptions =  this.routeNavigate.queryParams.subscribe(
      (navigate: any) => {
        this.id = navigate["id"] as number
        if( this.id > 0)
        this.getUserById(this.id);
      }
    )

    this.contratoUsuario.usuario = {
      idUsuario: 0
      ,nome: ''
      ,documento: ''
      ,dataNascimento: ''
      ,sexo: ''
      ,email: ''
      ,login: ''
      ,senha: ''
      ,isAuthentication: false
    } as IUsuario
  }
  ngOnDestroy() {
    this.descriptions.unsubscribe();
  }

 
  getErro(nome: NgModel): string
  {
    let msg: string = ''
    if(nome.errors != null)
    {
      if(nome.errors["minlength"] )
        msg = 'deve ter pelo menos 10 caracteres';
      
      if(nome.errors["required"])
      msg = 'Este campo é obrigatorio';
      
      if(nome.errors["maxlength"])
      msg = 'limite exedido';
    }
    return msg;
  }

  validar(frm: NgForm)
  {
    debugger
    frm.controls['nome']
  }

  postPutUser(_contratoUsuario: IContratoUsuario) {
    this.isChange = false;
    let user: IUsuario = {} as IUsuario
    let adress: IEndereco = {} as IEndereco 
    let retornoApi: Observable<Object>
debugger
    Object.assign( user, _contratoUsuario.usuario)
    let dt = _contratoUsuario.usuario.dataNascimento.split('/')
    user.dataNascimento = dt[2]+'-'+dt[1]+'-'+dt[0]
    adress =_contratoUsuario.endereco
    adress.idUsuario =  user.idUsuario

      if(_contratoUsuario.usuario.sexo)
        user.sexo = 'F'
        else
        user.sexo = 'M' 
    
     if(user.idUsuario > 0) 
        this.apiUsuarioService.putUser(user)
        .toPromise()
        .then((response: Response) => {

          if(adress.id === 0 || adress.id ===  undefined)
            retornoApi = this.apiUsuarioService.postEnderecoUserById(adress)
          else
            retornoApi = this.apiUsuarioService.putEnderecoUserById(adress)

          retornoApi.toPromise()
            .then(() => {
              this.toastService.show("Atualizado com Sucesso!", 3000,'green z-depth-5');  
              this.route.navigate(['/lista'])
            })
            .catch((err: Error) => alert('ERRO => ' + err.message))
        })
        .catch((err: Error) => alert('ERRO => ' + err.message));
      else
      this.apiUsuarioService.postUser(user)
        .toPromise()
        .then((response: Response) => {
          this.toastService.show('Inserido com sucesso', 3000,'red  z-depth-5');  
          this.route.navigate(['/lista'])
          })
          .catch((err: Error) => alert('ERRO => ' + err.message));
      
  }

  getUserById(_id: number)
  {
    this.apiUsuarioService.getUserById(_id)
    .toPromise()
    .then((res: any) => {
      this.isOk = true
      delete res['$id'];
      if(res.enderecos.length > 0)
      {
        res.enderecos.forEach((_endereco: IEndereco)=> {
          let newEnd: IEndereco  = {
                          id:_endereco.id ,
                          idUsuario: _endereco.idUsuario,
                          bairro:_endereco.bairro.trim(),
                          logradouro: _endereco.logradouro.trim(),
                          cep: _endereco.cep.trim(),
                          localidade: _endereco.localidade.trim(),
                          complemento: _endereco.complemento.trim(),
                        } as IEndereco
          this.contratoUsuario.enderecos.push(newEnd)
      });
    }
      delete res['enderecos']
      this.contratoUsuario.usuario = {
            idUsuario: res.idUsuario,
            nome: res.nome.trim(),
            documento: res.documento.trim(),
            dataNascimento: new Date(res.dataNascimento).toLocaleDateString(),
            sexo: res.sexo === 'F' ? true : false,
            email: res.email,
            login: res.login,
            senha: res.senha,
            isAuthentication: res.isAuthentication
            } as IUsuario
    })
  } 

  getClientCep(formCep: NgForm ) {
    
    this.cepService.searchCep(formCep.value["seachCep"])
    .toPromise()
    .then((result: any) => {
      this.objCep = result as IEndereco;
      this.isOk =  false;
      this.view(formCep)
    })
    .catch(err => {
      alert('Erro: =>' + err);
    });
  }

  view(frm: NgForm) {
    frm.form.patchValue({ 
      endereco:
        {
          logradouro: this.objCep.logradouro,
          cep: this.objCep.cep,
          bairro: this.objCep.bairro,
          dataNascimento: new Date().toISOString()
        }
    });
  }

  editAddress(index: number)
  {
    this.isOk =  false;
    this.contratoUsuario.endereco = this.contratoUsuario.enderecos[index];
  }

  deleteEndereco(_id: string, indice: number)
  {
    this.loaderService.display(true)    
    this.apiUsuarioService.deleteEnderecoUserById(_id)
    .toPromise()
    .then((response: Response | IEndereco) => {
      
      this.toastService.show("Excluido com sucesso!", 3000,'red z-depth-5');  
      this.contratoUsuario.enderecos.splice(indice,1);
      this.loaderService.display(false)
    })
    .catch((err:Error) => {
      this.loaderService.display(false)
      console.clear()
      console.log(err.message);
    })
  }

  apertouSim(obj: any)
  {
    this.deleteEndereco(obj.id, obj.indice)
  }

  mudou()
  {
    this.isChange =  true;
  }
}

class ErroApps {
  /**
   *
   */
  constructor(
    hasError: boolean,
    msgBox: string
  ) {}
  
}





