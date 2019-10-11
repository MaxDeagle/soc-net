import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  user = {
    // tslint:disable-next-line: max-line-length
    img: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201907/imgonline-com-ua-FrameBlurred-_14-770x433.jpeg?b9RaYEEvetkLvroGBpGaOwg7vTih1Msj',
    first_name: 'John',
    last_name: 'Bruh',
    city: 'Лондон',
    birth: '03/09/1993',
    // tslint:disable-next-line: max-line-length
    status: 'What are you? Me? I am not What are you? Me? I am not What are you? Me? I am not What are you? Me? I am not What are you? Me? I am not What are you? Me? I am not What are you? Me? I am not'
  };

  constructor() { }

  ngOnInit() {
  }

}
