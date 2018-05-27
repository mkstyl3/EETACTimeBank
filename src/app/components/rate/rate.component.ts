import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

declare let require: any;

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  constructor() { this.rate = 1; }
  @Output() emitRate = new EventEmitter();
  @ViewChild('maindiv') mainDiv: ElementRef;

  fullstar = require('../../../assets/img/star-full.png');
  star = require('../../../assets/img/star.png');
  star1img = this.fullstar;
  star2img = this.star;
  star3img = this.star;
  star4img = this.star;
  star5img = this.star;
  rate: number;
  id: string;

  show(id: string) {
    this.id = id;
    this.mainDiv.nativeElement.style.display = 'inline';
  }

  hide() {
    this.mainDiv.nativeElement.style.display = 'none';
  }

  send() {
    const te = {'id': this.id, 'rate': this.rate};
    this.emitRate.emit(te);
    this.mainDiv.nativeElement.style.display = 'none';
  }

  click(num: number) {
    this.rate = num;
    switch (num) {
      case 1:
      this.star1img = this.fullstar;
      this.star2img = this.star;
      this.star3img = this.star;
      this.star4img = this.star;
      this.star5img = this.star;
      break;
      case 2:
      this.star1img = this.fullstar;
      this.star2img = this.fullstar;
      this.star3img = this.star;
      this.star4img = this.star;
      this.star5img = this.star;
      break;
      case 3:
      this.star1img = this.fullstar;
      this.star2img = this.fullstar;
      this.star3img = this.fullstar;
      this.star4img = this.star;
      this.star5img = this.star;
      break;
      case 4:
      this.star1img = this.fullstar;
      this.star2img = this.fullstar;
      this.star3img = this.fullstar;
      this.star4img = this.fullstar;
      this.star5img = this.star;
      break;
      case 5:
      this.star1img = this.fullstar;
      this.star2img = this.fullstar;
      this.star3img = this.fullstar;
      this.star4img = this.fullstar;
      this.star5img = this.fullstar;
      break;
    }
  }

  ngOnInit() {
  }

}
