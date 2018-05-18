import { FireService } from './fire.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logado: boolean = false;
  constructor(public auth: AngularFireAuth, public fire: FireService){
    this.auth.authState.subscribe(user => {
      if(user)
        this.fire.getUserInfoByUid(user.uid)
          .then(info => {
            this.logado = info[0].ativo;
            console.log(this.logado)
          })
      else
        this.logado = false;

    })
  }
}
