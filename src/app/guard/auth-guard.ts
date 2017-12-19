import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth.service';
import { Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    
    if(this.authService.userIsAutentication())
      return true;

      this.route.navigate(['/login']);
  }

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

}
