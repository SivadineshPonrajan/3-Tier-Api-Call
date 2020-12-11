import { Component } from '@angular/core';
import { DataService } from "./services/data.service";

import { Subscription } from 'rxjs';
import {dat} from "./classes/dat";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ring';
  private subscp = new Subscription();

  constructor(private dataService: DataService) { }
  name;
  uid;
  uname;
  uprod;
  uprice;
  biller = new Array<dat>();

  ngOnInit() {
    this.subscp.add(this.dataService.login()._subscribe);
    console.log("subscribed");
  }

  ngOnDestroy(){
    this.subscp.unsubscribe();
    console.log("unsubscribed");
  }

  get() {
    if (this.name >= 0){
      this.dataService
        .sendGetRequest(this.name)
        .subscribe(response=>{
          this.biller = response["bill"].map(item => {
            return new dat(
              item.name,
              item.prod,
              item.price
            );
          });
    });
    }else {
      alert("Enter proper bill number");
    }
  }


  delete() {
    if (this.name >= 0){
      this.dataService
        .sendDeleteRequest(this.name)
        .subscribe(response=>{
          if (response["delete"] === "success"){
            alert("Successfully deleted");
          } else{
            alert("Deletion Error")
          }
        });
    }else {
      alert("Enter proper bill number");
    }
  }

  post() {
    if (this.name >= 0){
      this.dataService
        .sendPostRequest(this.name, this.uname, this.uprod, this.uprice)
        .subscribe(response=>{
          if (response["insertion"] === "success"){
            alert("Successfully inserted");
          } else{
            alert("Insertion Error")
          }
        });
    }else {
      alert("Enter proper bill number");
    }
  }

  update() {
    if (this.name >= 0){
      this.dataService
        .sendPutRequest(this.name, this.uname, this.uprod, this.uprice)
        .subscribe(response=>{
          if (response["updation"] === "success"){
            alert("Successfully updated");
          } else{
            alert("Updation Error")
          }
        });
    }else {
      alert("Enter proper bill number");
    }
  }


}
