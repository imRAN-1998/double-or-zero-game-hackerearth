import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

type userData={
  Name :  string;
  Price : string;
  Bet : string;
  "Profile Image" : String
}

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(private http1 : HttpClient) { }

  getData(){
    return this.http1.get<userData[]>('https://aqueous-caverns-98789.herokuapp.com/https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json');
  }
}
