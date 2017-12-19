import { ApiUsuarioService } from './../cadastro/services/api-usuario.service';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(
    private apiUsuarioService: ApiUsuarioService,
    private loaderService: LoaderService
  )
     { }

  usuarios: Array<IUsuario> ;
 
  ngOnInit() {
    this.getUser()
  }

  searchByName(_name: string)
  {
    if(_name.length < 3) return;
    this.loaderService.display(true);
    this.usuarios = new Array();
    let usuario: IUsuario = { idUsuario: 0 ,nome: _name ,documento: '' ,dataNascimento: '',sexo: '',email: ''} as IUsuario ;
    this.apiUsuarioService.getUserByName(usuario)
    .toPromise()
    .then((res: Array<IUsuario>) => {
        res.forEach(user => {
            delete user["$id"]
          this.usuarios.push(user);
        })
        this.loaderService.display(false);
    })
    .catch(err => {
      console.clear();
      console.error(err);
    })
  }

  getUser()
  {
    this.loaderService.display(true);
    this.usuarios = new Array();
    let lst = this.apiUsuarioService.getUser()
    .toPromise()
    .then((data:  Array<IUsuario>) => {
        data.forEach(user => {
          delete user["$id"]
        this.usuarios.push(user);
      })
    this.loaderService.display(false);
    })
    .catch(erro =>{
      this.loaderService.display(false);
      console.log(erro)
    })
  }

  deleteUser(_id: string, indice: number)
  {
    this.apiUsuarioService.deleteUserById(_id)
    .toPromise()
    .then((response: Response | IUsuario) => {
        this.usuarios.splice(indice, 1);
    })
    .catch((err: Error) => {
      console.error(err);
    })
  }

}
