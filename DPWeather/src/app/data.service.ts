import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getForecastData(obj) {
    let url = 'http://api.wunderground.com/api/4bbbc25f4f5946dd/conditions/q/' + obj.state + '/' + obj.city +'.json';
    url = encodeURI(url);
    return this.http.get(url);
  }

  getHourlyForecastData(obj)
  {
    let url = 'http://api.wunderground.com/api/4bbbc25f4f5946dd/hourly/q/' + obj.state + '/' + obj.city +'.json';
    url = encodeURI(url);
    return this.http.get(url);
  }
}
