import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../core/services/weather.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputGroupModule} from "primeng/inputgroup";
import {FloatLabelModule} from "primeng/floatlabel";
import {TableModule} from "primeng/table";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {ChartModule} from "primeng/chart";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {CardModule} from "primeng/card";
import {LoadingComponent} from "../../shared/components/loading/loading.component";
import {PreferenceService} from "../../core/services/preference.service";
import {CitiesService} from "../../core/services/cities.service";
import {WeatherModel} from "../../core/models/weather.model";
import {PreferenceModel} from "../../core/models/preference.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    InputTextModule,
    InputGroupModule,
    FloatLabelModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    ChartModule,
    NgIf,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    CardModule,
    LoadingComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  cities!: string[];
  weatherData: WeatherModel[] = [];
  filteredCities: any[] = [];
  preferences!: PreferenceModel;
  preferencesChartType: any;
  selectedCity!: string;
  chartData: any;
  chartOptions: any;
  highestTemp: number = 0;
  lowestTemp: number = 0;
  averageHumidity: number = 0;

  ngOnInit() {
    this.getWeatherData();
    this.preferences = this.preferencesService.getPreferences();
    this.selectedCity = this.preferences?.city;
    this.preferencesChartType = this.preferences?.chartType || 'line';
    if (this.selectedCity) {
      this.showForecast();
    }
  }

  constructor(
    private weatherService: WeatherService,
    private preferencesService: PreferenceService,
    private citiesService: CitiesService
  ) {
    this.cities = this.citiesService.getCities();
  }

  getWeatherData() {
    this.cities.forEach(city => {
      this.weatherService.getWeather(city).subscribe({
        next: (data) => {
          this.weatherData.push({
            city,
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            weatherCondition: data.weather[0].description
          });
          this.filteredCities = [...this.weatherData];
        },
        error: (error) => {
          console.error('Error getting weather data', error);
        }
      });
    });
  }

  filterCities(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue) {
      this.filteredCities = this.weatherData.filter(city =>
        city.city.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.filteredCities = [...this.weatherData];
    }
  }

  sortCitiesBy(prop: string): void {
    this.filteredCities.sort((a, b) => a[prop] - b[prop]);
  }

  showForecast(): void {
    this.weatherService.getForecast(this.selectedCity).subscribe({
      next: (data) => {
        const labels = data.list.map((item: any) => item.dt_txt);
        const temperatures = data.list.map((item: any) => item.main.temp);
        this.creteChart(labels, temperatures)
        this.getMetrics();
      },
      error: (error) => {
        console.error('Error getting forecast data', error);
      },
    });
  }

  getMetrics() {
    this.weatherService.getForecast(this.selectedCity).subscribe({
      next: (data: any) => {
        const temperatures = data.list.map((item: any) =>  Math.round(item.main.temp));
        const humidities = data.list.map((item: any) => item.main.humidity);

        this.highestTemp = Math.round(Math.max(...temperatures));
        this.lowestTemp = Math.round(Math.min(...temperatures));
        this.averageHumidity = (
          humidities.reduce((sum: number, humidity: number) => sum + humidity, 0) / humidities.length
        );
      },
      error: (error) => {
        console.error('Error getting forecast data', error);
      },
    });
  }

  creteChart(labels: string[], temperatures: number[]) {
    const chartType = this.preferencesChartType;

    this.chartData = {
      labels: labels.slice(0, 16),
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatures.slice(0, 16),
          borderColor: '#42A5F5',
          backgroundColor: chartType === 'bar' ? '#42A5F5' : 'rgba(66,165,245,0.2)',
          fill: chartType !== 'bar',
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: chartType === 'bar'
        ? {
          x: {
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)',
            },
          },
        }
        : {
          x: {
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)',
            },
          },
        },
      type: chartType,
    };

    return this.chartData;
  }

}
