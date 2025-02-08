import { Injectable } from '@angular/core';
import {PreferenceModel} from "../models/preference.model";

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private preferences!: PreferenceModel;

  savePreferences(preferences: PreferenceModel): void {
    this.preferences = preferences;
  }

  getPreferences(): PreferenceModel {
    return this.preferences;
  }

  delPref(){
    this.preferences = {city:''}
    return this.preferences;
  }
}
