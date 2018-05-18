import { Router } from '@angular/router';
import { FireService } from './../fire.service';
import { Component, OnInit } from '@angular/core';

declare var M: any;

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {
  memes:any[];
  instanceModal: any;
  urlMeme: string = '';
  constructor(public fire: FireService, public router: Router) { }

  ngOnInit() {
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
  
  openModal(){
    let modal = M.Modal.getInstance(document.getElementById('modal1'));
    modal.open();
  }
  
}
