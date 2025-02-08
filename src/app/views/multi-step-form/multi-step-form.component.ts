import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {StepsModule} from "primeng/steps";
import {NgForOf, NgIf} from "@angular/common";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {Router} from "@angular/router";
import {PreferenceService} from "../../core/services/preference.service";
import {CitiesService} from "../../core/services/cities.service";
import {PreferenceModel} from "../../core/models/preference.model";

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [
    Button,
    AutoCompleteModule,
    FormsModule,
    StepsModule,
    NgIf,
    CheckboxModule,
    NgForOf,
    RadioButtonModule
  ],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss'
})
export class MultiStepFormComponent {
  cities!: string[];
  selectedCity!: string;
  activeIndex: number = 0;
  filteredCities!: any[];
  steps: any[] = [
    {label: 'Select Cities'},
    {label: 'Metrics Preferences', disabled: true},
    {label: 'Display Options', disabled: true},
    {label: 'Confirmation', disabled: true}
  ];

  metrics: { name: string; selected: boolean }[] = [
    {name: 'Temperature', selected: false},
    {name: 'Humidity', selected: false},
    {name: 'Wind Speed', selected: false}
  ];

  displayOptions = {
    layout: '',
    chartType: ''
  };
  preferences = {
    city: ''
  };
  constructor( private router: Router,
               private preferencesService: PreferenceService,
               private citiesService: CitiesService
  ) {
    this.cities = this.citiesService.getCities();
  }

  areMetricsValid(): boolean {
    return this.metrics.some(metric => metric.selected);
  }

  areDisplayOptionsValid(): boolean {
    return this.displayOptions.layout !== '' && this.displayOptions.chartType !== '';
  }

  // Step 1
  filterCountry(event: any) {
    this.filteredCities = this.cities.filter(city =>
      city.toLowerCase().startsWith(event.query.toLowerCase())
    );
  }

  onSelectCity() {
    this.steps = [
      {label: 'Select Cities'},
      {label: 'Metrics Preferences', disabled: false},
      {label: ' Display Options', disabled: true},
      {label: 'Confirm', disabled: true},
    ];
  }

  // Step 2
  onMetricsSelectionComplete() {
    if (this.metrics.some(metric => metric.selected)) {
      this.steps = [
        {label: 'Select Cities'},
        {label: 'Metrics Preferences', disabled: false},
        {label: ' Display Options', disabled: false},
        {label: 'Confirm', disabled: true},
      ];
    }
  }

  // Step 3
  onDisplayOptionsComplete() {
    if (this.displayOptions.layout && this.displayOptions.chartType) {
      this.steps = [
        {label: 'Select Cities'},
        {label: 'Metrics Preferences', disabled: false},
        {label: 'Display Options', disabled: false},
        {label: 'Confirmation', disabled: false}
      ];
    }
  }

  // Final Step
  getSelectedMetrics(): string[] {
    return this.metrics.filter(metric => metric.selected).map(metric => metric.name);
  }
  updatePreferences(data: PreferenceModel) {
    this.preferences = { ...this.preferences, ...data };
  }
  confirmPreferences() {
    this.updatePreferences({city: this.selectedCity});
    this.router.navigate(['/dashboard']);
    this.preferencesService.savePreferences(this.preferences)
  }

}
