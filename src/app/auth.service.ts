import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUsuarioService } from './cadastro/services/api-usuario.service';
import { LoaderService } from './loader.service';


@Injectable()
export class AuthService {

    constructor(
        private route: Router,
        private apiUsuarioService: ApiUsuarioService,
        private loaderService: LoaderService
    ) { }

    private isAuthencation: boolean =  false
    trigger = new EventEmitter<IUsuario>()
    
    loginUser(usuario:IUsuario)
    {
        this.loaderService.display(true);

        return this.apiUsuarioService.login(usuario)
        .toPromise()
        .then((user: any) => {
            
            delete user["enderecos"]
            delete user["$id"]
            this.isAuthencation = true;
            this.trigger.emit(user)
            this.loaderService.display(false);
            return user;
            
        })
        .catch((err:Error) => { 
            
            this.loaderService.display(false);

            if(err['status'] === 404)
                alert('usuario nao localizdo')
            
                if(err['status'] === 409)
                    alert(err["error"]["message"])
            return err
        })
        
    }

    logoutUser(user: IUsuario)
    {
        debugger
        return this.apiUsuarioService.putUser(user)
        .toPromise()
        .then((ret: Response ) =>{
            this.isAuthencation =  false;
            return ret
        })
        .catch((err: Error) => {
            alert('erro ao tentar sair do sistema' + err.message);
        })
    }

    userIsAutentication(): boolean
    {
        return this.isAuthencation;
    }
}