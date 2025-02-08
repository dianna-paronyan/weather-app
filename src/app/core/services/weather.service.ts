import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Urls} from "../data/urls";
import {Observable} from "rxjs";
import {API_KEY} from "../data/key";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url: string = `${Urls.WEATHER}weather?q=${city}&appid=${API_KEY}&units=metric`;
    return this.http.get<any>(url);
  }

  getForecast(city: string): Observable<any> {
    const url: string = `${Urls.WEATHER}forecast?q=${city}&appid=${API_KEY}&units=metric`;
    return this.http.get(url);
  }

}
