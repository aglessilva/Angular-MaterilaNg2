import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  ngOnInit(){}

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }



  loginUser(frm: any)
  {
    let user: IUsuario = {} as IUsuario
    user.login =  frm.login
    user.senha = frm.senha;

     this.authService.loginUser(user)
  }

}
