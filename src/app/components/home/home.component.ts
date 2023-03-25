import { Component, OnInit } from '@angular/core';
// import * as Highcharts  from 'highcharts' ;
// import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  start_date:any;
  end_date:any
  constructor() { }

  ngOnInit(): void {
  }

}
