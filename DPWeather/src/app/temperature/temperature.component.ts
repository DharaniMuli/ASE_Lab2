import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  @Input() public current_report;
  @Input() public  location;
  @Input() public  chart;
  @Input() public hourly_report;
  constructor() { }

  ngOnInit() {
  }

}
