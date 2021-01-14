import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class GamePageComponent implements OnInit,AfterViewInit,OnDestroy{

  @ViewChild('wheel') wheel : ElementRef;
  @ViewChild('number') popnumber : ElementRef;
  @ViewChild('over') wheelover : ElementRef;

  close : boolean = false;
  delay : boolean = true;
  players : playerInfo[] = [];
  num_value : any;
  timeout1 : any;
  timeout2 : any;

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
    let timeout1 ;
    if(rand_v == 1){
      this.timeout1 = setTimeout(()=>{
        this.wheel.nativeElement.classList.add('one')
      },10)
    }else if(rand_v == 2){
      this.timeout1 = setTimeout(()=>{
        this.wheel.nativeElement.classList.add('two')
      },10)
    }else if(rand_v == 3){
      this.timeout1 = setTimeout(()=>{
        this.wheel.nativeElement.classList.add('three')
      },10)
    }else if(rand_v == 4){
      this.timeout1 = setTimeout(()=>{
        this.wheel.nativeElement.classList.add('four')
      },10)
    }else if(rand_v == 5){
      this.timeout1 = setTimeout(()=>{
        this.wheel.nativeElement.classList.add('five')
      },10)
    }else if(rand_v == 6){
      this.timeout1 = setTimeout(()=>{
        this.wheel.nativeElement.classList.add('six')
      },10)
    }else if(rand_v == 7){
      this.timeout1 = setTimeout(()=>{
        this.wheel.nativeElement.classList.add('seven')
      },10)
    }else if(rand_v == 8){
      this.timeout1 = setTimeout(()=>{
        this.wheel.nativeElement.classList.add('eight')
      },10)
    }else if(rand_v == 9){
      this.timeout1 = setTimeout(()=>{
        this.wheel.nativeElement.classList.add('nine')
      },10)
    }
    this.go_disable = true;
    this.num_value = rand_v;
    this.timeout2 = setTimeout(()=>{
      this.go_disable = false;
      this.playersWon(rand_v);
    },7000)
    this.changeToOnGame();
    console.log(this.wheel);
    console.log(rand_v);
  }
  playersWon(val){
    this.checkForPopNumber(val);
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

  checkForPopNumber(rand_v){
    if(rand_v == 1){
      this.popnumber.nativeElement.classList.add('one');
      this.wheelover.nativeElement.classList.add('one');
    }else if(rand_v == 2){
      this.popnumber.nativeElement.classList.add('two');
      this.wheelover.nativeElement.classList.add('two');
    }else if(rand_v == 3){
      this.popnumber.nativeElement.classList.add('three');
      this.wheelover.nativeElement.classList.add('three');
    }else if(rand_v == 4){
      this.popnumber.nativeElement.classList.add('four');
      this.wheelover.nativeElement.classList.add('four');
    }else if(rand_v == 5){
      this.popnumber.nativeElement.classList.add('five');
      this.wheelover.nativeElement.classList.add('five');
    }else if(rand_v == 6){
      this.popnumber.nativeElement.classList.add('six');
      this.wheelover.nativeElement.classList.add('six');
    }else if(rand_v == 7){
      this.popnumber.nativeElement.classList.add('seven');
      this.wheelover.nativeElement.classList.add('seven');
    }else if(rand_v == 8){
      this.popnumber.nativeElement.classList.add('eight');
      this.wheelover.nativeElement.classList.add('eight');
    }else if(rand_v == 9){
      this.popnumber.nativeElement.classList.add('nine');
      this.wheelover.nativeElement.classList.add('nine');
    }
  }
  removeOverlay(){
    this.popnumber.nativeElement.classList.remove('one');
    this.popnumber.nativeElement.classList.remove('two');
    this.popnumber.nativeElement.classList.remove('three');
    this.popnumber.nativeElement.classList.remove('four');
    this.popnumber.nativeElement.classList.remove('five');
    this.popnumber.nativeElement.classList.remove('six');
    this.popnumber.nativeElement.classList.remove('seven');
    this.popnumber.nativeElement.classList.remove('eight');
    this.popnumber.nativeElement.classList.remove('nine');

    this.wheelover.nativeElement.classList.remove('one');
    this.wheelover.nativeElement.classList.remove('two');
    this.wheelover.nativeElement.classList.remove('three');
    this.wheelover.nativeElement.classList.remove('four');
    this.wheelover.nativeElement.classList.remove('five');
    this.wheelover.nativeElement.classList.remove('six');
    this.wheelover.nativeElement.classList.remove('seven');
    this.wheelover.nativeElement.classList.remove('eight');
    this.wheelover.nativeElement.classList.remove('nine');
    this.changeToOnGame();
  }


  setChanges(){
    sessionStorage.removeItem('gamePlayers');
    sessionStorage.setItem('gamePlayers',JSON.stringify(this.players));
  }

  backToMain(){
    this.setChanges();
    this.router.navigate(['/']);
  }

  ngOnDestroy(){
    if(this.timeout1){
      clearTimeout(this.timeout1);
    }
    if(this.timeout2){
      clearTimeout(this.timeout2);
    }
  }

}
