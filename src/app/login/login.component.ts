import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FireService } from './../fire.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  nome: string = '';
  confirmPassword: string = '';
  signup: boolean = false;
  constructor(public fire: FireService, public auth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if(user)
        this.router.navigate(['noticias']);
    })
  }

  solicitarAcesso(){
    this.signup = !this.signup;
    console.log('signup', this.signup);
  }

  enviar(){
    if(this.email == '' || this.password == '' || this.nome == '' && this.signup)
      alert('Preencha todas as informações corretamente');
    else if(this.signup){
      if(this.password != this.confirmPassword)
        alert('As senhas digitadas não conferem');
      else
        this.fire.signup(this.email, this.password, this.nome)
          .then(info => {
            alert('Solicitação enviada com sucesso. Aguarde enquanto seu cadastro é ativado com pelos administradores do sistema.');
            console.log(info);
          })
    }
    else{
      this.fire.login(this.email, this.password);
    }
  }

}
