import { FireService } from './fire.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AngularFireAuth, public fire:FireService, public router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if(this.fire.userInfo){
      console.log(this.fire.userInfo);
      return this.fire.userInfo.ativo;
    }

    else{
      return this.fire.afAuth.authState.first().toPromise()
        .then(user => {
          console.log(user);
          if(!user){
            this.router.navigate(['login']);
            return Promise.resolve(false);
          }
          else{
           return this.fire.getUserInfoByUid(user.uid)
              .then(info =>{
                console.log(info);
                if(info[0].ativo){
                  return Promise.resolve(true);
                }
                else{
                  alert('Seu usuário ainda não está ativo. Comunique ao administrador do sistema.');
                  this.router.navigate(['login']);
                  return Promise.resolve(false)
                }
              })
          }
            
        })
    }
  }
}
