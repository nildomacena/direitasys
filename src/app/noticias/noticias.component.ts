import { Component, OnInit } from '@angular/core';
import { FireService } from '../fire.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticias:any[];
  instanceModal: any;
  titulo: string = '';
  subtitulo: string = '';
  urlImagem: string = '';
  urlNoticia: string = '';
  constructor(public fire: FireService, public router: Router) { }

  ngOnInit() {  
    this.getNoticias();
    let options = {
        direction: 'buttom'
      }
      let elems = document.querySelectorAll('.fixed-action-btn');
      let instances = M.FloatingActionButton.init(elems, options);

      let optionsModal = {
        
      }
      var elemsModal = document.querySelectorAll('.modal');
      var instancesModal = M.Modal.init(elemsModal, optionsModal);
      this.instanceModal =  M.Modal.getInstance(elemsModal);
  }
  getNoticias(){
    this.fire.getNoticias()
      .then(noticias => {
        this.noticias = noticias;
        console.log(this.noticias);
      });
  }

  apagarNoticia(noticia){
    let confirma = confirm('Deseja realmente deletar a notícia?');
    if(confirma)
      this.fire.apagarNoticia(noticia).then(_ => {
        M.toast({html: 'Notícia deletada!'});
        this.getNoticias();
      })
  }
  openModal(){
    let modal = M.Modal.getInstance(document.getElementById('modal1'));
    modal.open();
  }
  salvarNoticia(){
    let modal = M.Modal.getInstance(document.getElementById('modal1'));
    
    if(this.titulo == '' || this.subtitulo == '' || this.urlImagem == '' || this.urlNoticia == ''){
      alert('Preencha todas as informações');
      return
    }
    else{
      this.fire.salvarNoticia(this.titulo, this.subtitulo, this.urlImagem, this.urlNoticia)
        .then(_ => {
          modal.close();
          M.toast({html: 'Notícia salva com sucesso!'});
          this.titulo = this.subtitulo = this.urlImagem = this.urlNoticia = '';
          this.getNoticias();
        })
    }
  }

  logout(){
    this.fire.logout()
      .then(_ => {
        this.router.navigate(['']);
      })
  }
}
