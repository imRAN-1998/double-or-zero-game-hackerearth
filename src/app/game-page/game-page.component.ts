import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('wheel') wheel : ElementRef;

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
      this.changeToOnGame();
      console.log(this.players);
    }
    
  }
  changeToOnGame(){
    this.players.forEach(pl=>{
      pl['p_status'] = 'ongame'
    })
  }
  ngAfterViewInit(){
    window.addEventListener('load',()=>{
      console.log('loaded')
      this.delay = false;
      this.playersFetch();
    })
  }

  go_disable : boolean = false;
  spinWheel(){
    console.log('spin');
    if(this.go_disable){
      return;
    }
    const rand_v = Math.ceil( Math.random() * 9) ;
    this.wheel.nativeElement.classList.remove('one');
    this.wheel.nativeElement.classList.remove('two');
    this.wheel.nativeElement.classList.remove('three');
    this.wheel.nativeElement.classList.remove('four');
    this.wheel.nativeElement.classList.remove('five');
    this.wheel.nativeElement.classList.remove('six');
    this.wheel.nativeElement.classList.remove('seven');
    this.wheel.nativeElement.classList.remove('eight');
    this.wheel.nativeElement.classList.remove('nine');
    if(rand_v == 1){
      setTimeout(()=>{
        this.wheel.nativeElement.classList.add('one')
      },10)
    }else if(rand_v == 2){
      setTimeout(()=>{
        this.wheel.nativeElement.classList.add('two')
      },10)
    }else if(rand_v == 3){
      setTimeout(()=>{
        this.wheel.nativeElement.classList.add('three')
      },10)
    }else if(rand_v == 4){
      setTimeout(()=>{
        this.wheel.nativeElement.classList.add('four')
      },10)
    }else if(rand_v == 5){
      setTimeout(()=>{
        this.wheel.nativeElement.classList.add('five')
      },10)
    }else if(rand_v == 6){
      setTimeout(()=>{
        this.wheel.nativeElement.classList.add('six')
      },10)
    }else if(rand_v == 7){
      setTimeout(()=>{
        this.wheel.nativeElement.classList.add('seven')
      },10)
    }else if(rand_v == 8){
      setTimeout(()=>{
        this.wheel.nativeElement.classList.add('eight')
      },10)
    }else if(rand_v == 9){
      setTimeout(()=>{
        this.wheel.nativeElement.classList.add('nine')
      },10)
    }
    this.go_disable = true;
    setTimeout(()=>{
      this.go_disable = false;
      this.playersWon(rand_v);
    },7000)
    this.changeToOnGame();
    console.log(this.wheel);
    console.log(rand_v);
  }
  playersWon(val){
    this.players.forEach((player,index)=>{
      if(player.Bet == val){
        player['Win'] = player['Win'] + 1;
        player['Price'] = ((+player['Price']) + (+player['Price'])).toString();
        player['p_status'] = 'win'
      }else{
        player['Lose'] = player['Lose'] + 1;
        player['p_status'] = 'lose'
      }
    })
    console.log(this.players);
    // this.changeToOnGame();
    this.setChanges();
  }


  setChanges(){
    sessionStorage.removeItem('gamePlayers');
    sessionStorage.setItem('gamePlayers',JSON.stringify(this.players));
  }

  backToMain(){
    this.setChanges();
    this.router.navigate(['/']);
  }

}
