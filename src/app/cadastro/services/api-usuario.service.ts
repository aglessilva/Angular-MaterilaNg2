import {  RequestOptions, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Injectable, Inject } from '@angular/core';


import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';




@Injectable()
export class ApiUsuarioService {
 
//   constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient)
  constructor(
   private http: HttpClient,
  ) 
  { }

  private heders = new HttpHeaders({
    'cache-control':'no-cache',
    'content-type': 'application/json; charset=utf-8',

  })
  postUser(usuario: any) {
      return this.http.post('http://localhost:8080/webApi/api/Usuarios', JSON.stringify(usuario), { headers: this.heders})
  }

  putUser(usuario: IUsuario)
  {
    return this.http.put('http://localhost:8080/webApi/api/Usuarios/' + usuario.idUsuario, JSON.stringify(usuario), { headers: this.heders})
  }

  getUser() { 
    return this.http.get('http://localhost:8080/webApi/api/Usuarios')
  }

  getUserById(_id: number) { 
    return this.http.get('http://localhost:8080/webApi/api/Usuarios/' + _id)
  }

  getUserByName(user: IUsuario) { 

    return this.http.post('http://localhost:8080/webApi/api/Usuarios/filter', JSON.stringify(user),{ headers : this.heders });
  }

  deleteEnderecoUserById(_idUser: string) { 
    return this.http.delete('http://localhost:8080/webApi/api/Endereco/' +_idUser, { headers: this.heders } );
  }

  postEnderecoUserById(_endereco: IEndereco) { 
    return this.http.post('http://localhost:8080/webApi/api/Endereco/',JSON.stringify(_endereco), { headers: this.heders } );
  }

  putEnderecoUserById(_endereco: IEndereco){ 
    return this.http.put('http://localhost:8080/webApi/api/Endereco/'+ _endereco.id ,JSON.stringify(_endereco), { headers: this.heders } );
  }

  deleteUserById(_idUser: string)
  {
    return this.http.delete('http://localhost:8080/webApi/api/Usuarios/' +_idUser, { headers: this.heders })
  }

  login(user: IUsuario)
  {
    return this.http.post('http://localhost:8080/webApi/api/Usuarios/Login', JSON.stringify(user), { headers: this.heders })
  }

} 
