import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import {
  rotateInDownLeftOnEnterAnimation,
  pulseAnimation
  // rollInAnimation,
  // zoomInLeftAnimation,
  // zoomInDownOnEnterAnimation,
  // hueRotateAnimation,
  // zoomInUpOnEnterAnimation,
  // rubberBandAnimation,
  // flashAnimation,
  // rubberBandOnEnterAnimation
} from 'angular-animations';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { GameServiceService } from "../game-service.service";
import { Router } from '@angular/router';

declare var anime: any;


export type playerInfo = {
  uniqueid : number;
  Selected : boolean;
  Name :  string;
  image : String;
  Bet : string;
  Price : string;
  Win : number;
  Lose : number;
  selectTag : boolean;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  animations:[
    trigger('lists',[
      transition('* => *' , [
        query(':enter',style({opacity : 0}),{optional : true}),

        query(':enter' , stagger('150ms',[
          animate('0.4s ease-in',keyframes([
            style({opacity : 0,transform : 'translateY(-50px)',offset : 0}),
            style({opacity : 0.5,transform : 'translateY(10px)',offset : 0.3}),
            style({opacity : 1,transform : 'translateY(0px)',offset : 1})
          ]))
        ]),{optional : true})
      ])
    ]),
    trigger('appendPlayers',[
      transition('* => *' , [
        query(':enter',style({opacity : 0}),{optional : true}),
        query(':leave',style({opacity : 1}),{optional : true}),

        query(':enter' , stagger('150ms',[
          animate('0.3s ease-in',keyframes([
            style({opacity : 0,transform : 'translateX(-50px)',offset : 0}),
            // style({opacity : 0.5,transform : 'translateX(10px)',offset : 0.3}),
            style({opacity : 1,transform : 'translateX(0px)',offset : 1})
          ]))
        ]),{optional : true}),
        query(':leave' , stagger('150ms',[
          animate('0.4s ease-in',keyframes([
            style({opacity : 1,transform : 'translateX(0px)',offset : 0}),
            // style({opacity : 0.5,transform : 'translateX(10px)',offset : 0.3}),
            style({opacity : 0,transform : 'translateX(-50px)',offset : 1})
          ]))
        ]),{optional : true})
      ])
    ]),
    fadeInOnEnterAnimation(),
     fadeOutOnLeaveAnimation(),
     pulseAnimation({ anchor: 'pulse' }),
     rotateInDownLeftOnEnterAnimation({ anchor: 'enterLetterAnim1' }),
  ]
})
export class MainPageComponent implements OnInit, OnDestroy {

  players : playerInfo[] = [];
  playersCheckedForGame : playerInfo[] = [];
  sT : any ;
  currentPage : number = 0;
  totalPage : number = 0;
  state : boolean = false;
  text = "Double or Zero".split('');
  fetch : boolean = false;
  public animate() {
    this.sT =setInterval(()=>{
      this.state = !this.state;
      console.log('interval');
    },1000)
  }

 
  constructor(private services1 : GameServiceService,
    private router1 : Router) {
     }
  tenplayers : playerInfo[] = [];
  ngOnInit(): void {
    if(sessionStorage.getItem('allplayers')){
      this.players = JSON.parse(sessionStorage.getItem('allplayers'));
      console.log('players from session', this.players);
      this.executeInCommon();
      this.checkForMaxPlayersAllowedForGame();
    }else{
      this.fetch = true;
      this.services1.getData().subscribe(data=>{
        this.fetch = false;
        console.log('players from api', data);
        data.forEach((d,index)=>{
          this.players.push({
            uniqueid : index,
            ...d,
            image : d['Profile Image'],
            Win : 0,
            Lose : 0,
            Selected : false,
            selectTag : true
          })
        })
        sessionStorage.setItem('allplayers',JSON.stringify(this.players));
        this.executeInCommon();
      }) 
    }
    if(sessionStorage.getItem('gamePlayers')){
      this.playersCheckedForGame = JSON.parse(sessionStorage.getItem('gamePlayers'));
      this.playersCheckedForGame.forEach(gP=>{
        this.players.forEach(p=>{
          if(gP.uniqueid == p.uniqueid){
            p['Price'] = gP['Price'];
            p['Win'] = gP['Win'];
            p['Lose'] = gP['Lose'];
          }
        })
      })
    }else{
      this.playersCheckedForGame = [];
    }


    var lineDrawingBEt = anime({
      targets: '#lineDrawingbet path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 3000,
      // delay: function(el, i) { return i * 250 },
      delay: 0,
      direction: 'forwards',
      loop: false
    });

  }
  executeInCommon(){
    this.playersPerPage(0,this.players);
    this.currentPage = 1;
    this.totalPage = this.players.length /10;
  }



  checkBox(event,i,uni_id){  
    console.log(event.checked,i);
    this.tenplayers.forEach((p,index)=>{
      if(i == index){
        if(event.checked == false){
          p['Selected'] = true;
        }else{
          p['Selected'] = false;
        }
      }
    })
    if(this.playersMatchedBySearch.length > 0){
      this.playersMatchedBySearch.forEach((p,index)=>{
        if((i + 10*(this.currentPage-1)) == index){
          if(event.checked == false){
            p['Selected'] = true;
            console.log(p,"checked player")
          }else{
            p['Selected'] = false;
          }
        }
      })
      this.playersMatchedBySearch.forEach(el=>{
        if(el['Selected']){
          this.players.forEach(d=>{
            if(d.uniqueid == el.uniqueid){
              d['Selected'] = true;
            }
          })
        }
      })
    }else{
      this.players.forEach((p,index)=>{
        if((i + 10*(this.currentPage-1)) == index){
          if(event.checked == false){
            p['Selected'] = true;
            console.log(p,"checked player")
          }else{
            p['Selected'] = false;
          }
        }
      })
    }
    this.players.forEach((el,index)=>{
      if(uni_id == index){
        if(event.checked == false){
          this.playersCheckedForGame.push(this.players[index]);
        }else{
          for(let i=0;i<this.playersCheckedForGame.length;i++){
            if(this.playersCheckedForGame[i].uniqueid == uni_id){
              this.playersCheckedForGame.splice(i,1);
            }
          }
        }
      }
    })
    console.log(this.playersCheckedForGame);
    if(this.playersCheckedForGame.length >=2){
      this.minPlayers = false;
    }
   this.checkForMaxPlayersAllowedForGame();
  }
  playersPerPage(startValue,playersListSent){
    this.totalPage = Math.trunc(playersListSent.length/10);
    if(playersListSent.length%10 != 0){
      this.totalPage++;
    }
    if(this.totalPage == 0){
      this.totalPage = 1;
    }
    console.log(this.totalPage)
    let start = startValue;
    let end=0;
    if(playersListSent.length< 10){
      end  = playersListSent.length;
    }else if((playersListSent.length -  startValue) < 10){
      end = playersListSent.length;
    }
    else{
      end = startValue+10;
    }
    // this.tenplayers.forEach((p,index)=>{
    //   p['Selected'] = false;
    // })
    this.tenplayers = [];
    console.log(start,end,"0000000000")
    setTimeout(()=>{
      for(let i=start;i<end;i++){
        this.tenplayers.push(playersListSent[i]);
      }
    },10)
  }


  checkForMaxPlayersAllowedForGame(){
    let maxSelected = 0;
    this.players.forEach((p)=>{
      if(p['Selected'] == true){
        maxSelected++;
      }
    })
    console.log(maxSelected);
    if(maxSelected == 9){
      console.log('close');
      this.players.forEach(el=>{
        if(el['Selected'] == false){
          el['selectTag'] = false;
        }
      })
      this.playersMatchedBySearch.forEach(el=>{
        if(el['Selected'] == false){
          el['selectTag'] = false;
        }
      })
      this.animate();
    }else{
      if(this.sT){
        clearInterval(this.sT);
      }
      this.players.forEach(el=>{
        el['selectTag'] = true;
      })
      this.playersMatchedBySearch.forEach(el=>{
        el['selectTag'] = true;
      })
    }
  }



  leftPage(){
    if(this.currentPage > 1){
      this.currentPage--;
      if(this.searchHasEnabled){
        this.playersPerPage((this.currentPage-1) * 10, this.playersMatchedBySearch);
      }else{
        this.playersPerPage((this.currentPage-1) * 10, this.players);
      }
    }
  }
  rightPage(){
    if(this.currentPage < this.totalPage ){
      this.currentPage++;
      if(this.searchHasEnabled){
        this.playersPerPage((this.currentPage-1) * 10, this.playersMatchedBySearch);
      }else{
        console.log('in');
        console.log(this.currentPage-1);
        this.playersPerPage((this.currentPage-1) * 10, this.players);
      }
    }
  }

  minPlayers : boolean = false;
  selectedSession(){
    if(this.playersCheckedForGame.length < 2){
      this.minPlayers = true;
    }else{
      sessionStorage.removeItem('gamePlayers');
      sessionStorage.setItem('gamePlayers',JSON.stringify(this.playersCheckedForGame));
      sessionStorage.removeItem('allplayers');
      sessionStorage.setItem('allplayers',JSON.stringify(this.players));
      if(this.sT){
        clearInterval(this.sT);
      }
      this.players = [];
      this.playersCheckedForGame = [];
      this.tenplayers = [];
      this.playersMatchedBySearch = [];
      this.router1.navigate(['/game']);
    }
  }


  searchHasEnabled : boolean = false;
  playersMatchedBySearch : playerInfo[] = []; 
  searchPlayerByName(e){
    console.log(e);
    console.log(e.length);
    if(e.length > 0){
      this.searchHasEnabled = true;
    }else{
      this.searchHasEnabled = false;
    }
    this.playersMatchedBySearch = [];
    this.players.forEach(player=>{
      if(player.Name.toLowerCase().indexOf(e.toLowerCase()) != -1){
        this.playersMatchedBySearch.push(player);
      }
    })
    this.currentPage=1;
    console.log(this.playersMatchedBySearch);
    this.playersPerPage(0,this.playersMatchedBySearch);


  }
  ngOnDestroy(){
    // console.log('destroy triggered');
    if(this.sT){
      clearInterval(this.sT);
    }
  }

}
