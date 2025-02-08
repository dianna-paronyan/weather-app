import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  protected cities: string[] = ['London', 'New York', 'Paris', 'Yerevan'];
  constructor() { }

  getCities(): string[] {
    return [...this.cities];
  }

}
