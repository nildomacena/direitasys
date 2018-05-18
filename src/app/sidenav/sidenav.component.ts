import { FireService } from './../fire.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public router: Router, public fire: FireService) { }

  ngOnInit() {
  }

  goto(link){
    console.log(link)
    this.router.navigate([link]);
  } 
  logout(){
    this.fire.logout()
      .then(_ => {
        this.goto('login');
      })
  }
}
