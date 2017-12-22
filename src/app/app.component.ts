import { Component, ChangeDetectorRef  } from '@angular/core';
import { RouterLinkActive, Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { AuthService } from './auth.service';
import { ApiUsuarioService } from './cadastro/services/api-usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoader: boolean;
  habilitar: boolean;
  user: IUsuario = {} as IUsuario

      constructor(
          private loaderService: LoaderService,
          private cdRef: ChangeDetectorRef,
          private authService: AuthService,
          private route: Router ) {
              this.showLoader = false;
              this.habilitar =  false;
      }
  
      ngOnInit() {
          this.loaderService.status.subscribe((val: boolean) => {
              this.showLoader = val;
              this.cdRef.detectChanges();
          });          

          this.authService.trigger.subscribe((mostrar: IUsuario) =>{
              this.habilitar = mostrar.isAuthentication
              this.user.idUsuario =  mostrar.idUsuario
              this.user.nome =  mostrar.nome.trim()
              this.user.documento =  mostrar.documento.trim()
              this.user.dataNascimento =  mostrar.dataNascimento
              this.user.email =  mostrar.email.trim()
              this.user.login =  mostrar.login.trim()
              this.user.senha =  mostrar.senha.trim()
              this.user.sexo =  mostrar.sexo.trim()

              this.route.navigate(['/cadastro'])
          })
      }

      logout()
      {   
          this.user.isAuthentication =  false
          this.authService.logoutUser(this.user)
          .then((ret: any) => {
                this.habilitar = false;
                this.route.navigate(['/login'])
          })
          .catch( err => {
            alert('nao foi possivel sair do sistema, tente novamente');
          });
      }
}
