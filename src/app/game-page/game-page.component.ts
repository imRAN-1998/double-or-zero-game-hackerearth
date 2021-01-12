import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { playerInfo } from '../main-page/main-page.component';
declare var anime: any;


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
  animations:[
    trigger('lists',[
      transition('* => *' , [
        query(':enter',style({opacity : 0}),{optional : true}),

        query(':enter' , stagger('150ms',[
          animate('0.4s ease-in',keyframes([
            style({opacity : 0,transform : 'scale(0.5,0.5)',offset : 0}),
            style({opacity : 0.5,transform : 'scale(1.2,1.2)',offset : 0.3}),
            style({opacity : 1,transform : 'scale(1,1)',offset : 1})
          ]))
        ]),{optional : true})
      ])
    ]),
  ]
})
export class GamePageComponent implements OnInit,AfterViewInit {


  close : boolean = false;
  delay : boolean = true;
  players : playerInfo[] = [];

  constructor(private router : Router) { 
    this.close = false;
  }

  ngOnInit(): void {
    console.log('page has appeared')
    setTimeout(()=>{
      if(this.delay){
        this.playersFetch();
      }
    },1500)
  }
  public time;
  playersFetch(){
    this.close = true;
    if(sessionStorage.getItem('gamePlayers')){
      this.players = JSON.parse(sessionStorage.getItem('gamePlayers'));
      console.log(this.players);
    }
    
  }
  ngAfterViewInit(){
    window.addEventListener('load',()=>{
      console.log('loaded')
      this.delay = false;
      this.playersFetch();
    })
  }

  spinWheel(){
    console.log('spin');
  }




  backToMain(){
    this.router.navigate(['/']);
  }

}
