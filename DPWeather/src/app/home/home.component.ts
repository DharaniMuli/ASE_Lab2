import { Component, OnInit } from '@angular/core';
import { DataService} from "../data.service";
import { Chart } from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public current_report: object;
  public location: object;
  public state: string = "MO";
  public city: string = "Kansas City";

  public  hourly_report: object[]=[];
  public  timeArray = [];
  public  temperatureArray = [];
  public chart = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.createLocationObject();
    this.getDataFromService();
    this.getHourlyDataFromService();
  }
  ForecastWeather = () =>{

    this.createLocationObject();
    this.getDataFromService();
    this.removeData();
    this.getHourlyDataFromService();

  }
  createLocationObject=()=>{

    this.location = {state : this.state, city : this.city};

  }
  getDataFromService = ()=> {
    this.data.getForecastData(this.location).subscribe( data => {
      this.current_report = data;
    });
  }
  getHourlyDataFromService = ()=>{
    this.data.getHourlyForecastData(this.location).subscribe(data=>{
        this.generateHourlyReport(data);
        this.generateChartArrays(this.hourly_report);
        this.generateHourlyChart();
    });

  }
  generateHourlyReport= (data) =>{
    data = data['hourly_forecast'];
    let obj=null;
    for(let i = 0 ; i< 10 ; i++)
    {
      obj = {
        temperature: data[i]['temp']['english'],
        condition: data[i]['condition'],
        image: data[i]['icon_url'],
        time:data[i]['FCTTIME']['civil']
      }
      this.hourly_report.push(obj);
    }

  }
  generateChartArrays =(data) =>{
      for(let prop in data)
      {
        this.temperatureArray.push(data[prop]['temperature']);
        this.timeArray.push(data[prop]['time']);
      }
  }
  generateHourlyChart= () => {

      this.chart = new Chart('canvas', {
        type: 'line',
        responsive:'true',
        maintainAspectRatio: false,
        scaleFontColor: 'red',
        data: {
        labels: this.timeArray,
        datasets: [
          {
            data: this.temperatureArray ,
            borderColor: "white",
            fill: true
          },

        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              fontColor: "white"
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              fontColor: "white"
            }
          }],
        }
      }
    });

  }
  removeData=()=> {
    this.hourly_report=[];
    this.temperatureArray=[];
    this.timeArray=[];
  }

}

