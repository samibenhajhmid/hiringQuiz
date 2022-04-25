import { Component } from '@angular/core';
import {Title, Meta} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hiringQuiz';
  title1 = 'Demo';
  greeting : any = {};
  constructor() {

  }
}
