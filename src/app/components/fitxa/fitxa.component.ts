import { Component, OnInit } from '@angular/core';
import {SiblingComponentsService} from '../../service/siblingComponents.service';

@Component({
  selector: 'app-fitxa',
  templateUrl: './fitxa.component.html',
  styleUrls: ['./fitxa.component.css']
})
export class FitxaComponent implements OnInit {
  activity;
  ratings;
  constructor( public siblingService: SiblingComponentsService) {
    this.activity = this.siblingService.subscribeActivity();
    this.ratings = this.activity.ratings;
  }

  ngOnInit() {
  }

}
