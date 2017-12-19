import { SearchCepService } from './services/search-cep.service';
import { ApiUsuarioService } from './services/api-usuario.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../loader.service';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./../app.component.css']
})
export class CadastroComponent implements OnInit {

  dateActual: number =  Date.now();
  objCep:  IEndereco = null;
  contratoUsuario:IContratoUsuario = { usuario: {} as IUsuario, enderecos: [] as Array<IEndereco>, endereco: {} as IEndereco } as IContratoUsuario;
  isOk: boolean;
  hasRow: boolean
  isChange: boolean;
  private id: number;
  private descriptions: Subscription


  constructor(
    private cepService: SearchCepService,
    private apiUsuarioService: ApiUsuarioService,
    private routeNavigate: ActivatedRoute,
    private loaderService: LoaderService,
  ) { }



  ngOnInit() {
    this.descriptions =  this.routeNavigate.queryParams.subscribe(
      (navigate: any) => {
        this.id = navigate["id"] as number
        if( this.id > 0)
        this.getUserById(this.id);
      }
    )
  }
  ngOnDestroy() {
    this.descriptions.unsubscribe();
  }

  postPutUser(_contratoUsuario: IContratoUsuario) {
    this.isChange = false;
    let user: IUsuario = {} as IUsuario
    let adress: Array<IEndereco> = [] 

    Object.assign( user, _contratoUsuario.usuario)
    adress =_contratoUsuario.enderecos

      if(_contratoUsuario.usuario.sexo)
        user.sexo = 'F'
        else
        user.sexo = 'M' 
    
     if(user.idUsuario > 0) 
      this.apiUsuarioService.putUser(user)
      .toPromise()
      .then((response: Response) => {
          console.log(response)
      })
      .catch((err: Error) => {
        console.clear()
          console.log(err.message)
      })
    else
      this.apiUsuarioService.postUser(user)

  }

  getUserById(_id: number)
  {
    this.apiUsuarioService.getUserById(_id)
    .toPromise()
    .then((res: any) => {
      this.isOk =  true;
      delete res['$id'];

      res.enderecos.forEach((_endereco: IEndereco)=> {
        this.contratoUsuario.enderecos.push(_endereco)
        
      });
      delete res['enderecos']
      this.contratoUsuario.usuario = res as IUsuario
      if(res.sexo === 'F')
        this.contratoUsuario.usuario.sexo = true 
      else
        this.contratoUsuario.usuario.sexo = false
    })
  } 

  getClientCep(formCep: NgForm ) {
    
    this.cepService.searchCep(formCep.value["seachCep"])
    .toPromise()
    .then((result: any) => {
      this.objCep = result as IEndereco;
      this.isOk =  true;
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
          uf: this.objCep.uf,
          dataNascimento: new Date().toISOString()
        }
    });
  }

  editAddress(index: number)
  {
    this.hasRow = true;
    this.contratoUsuario.endereco = this.contratoUsuario.enderecos[index];
  }

  deleteEndereco(_id: string, indice: number)
  {
    this.loaderService.display(true)    
    this.apiUsuarioService.deleteEnderecoUserById(_id)
    .toPromise()
    .then(() => {
      this.contratoUsuario.enderecos.splice(indice,1);
      this.loaderService.display(false)
    })
    .catch((err:Error) => {
      this.loaderService.display(false)
      console.log(err.message);
    })
  }

  mudou()
  {
    debugger
    this.isChange =  true;
  }
}





