import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CSSService {
  // Base font sizes to adjust from
  private fontSizes = {
    '--header-font-size-large': 2,
    '--header-font-size-medium': 1.5,
    '--header-font-size-small': 1.25,
    '--body-font-size-large': 1.125,
    '--body-font-size-medium': 1,
    '--body-font-size-small': 0.875,
    '--component-font-size-large': 1.25,
    '--component-font-size-medium': 1,
    '--component-font-size-small': 0.875,
    '--font-size-extra-large': 2.5,
    '--font-size-extra-small': 0.75,
  };

  private fontSizeStep = 0.125; // Font size increment step

  constructor(private apiService: ApiService) {}

  // Increase font sizes
  increaseFontSizes() {
    (Object.keys(this.fontSizes) as Array<keyof typeof this.fontSizes>).forEach((key) => {
      this.fontSizes[key] += this.fontSizeStep;
      document.documentElement.style.setProperty(key, `${this.fontSizes[key]}rem`);
    });
  }

  // Decrease font sizes
  decreaseFontSizes() {
    (Object.keys(this.fontSizes) as Array<keyof typeof this.fontSizes>).forEach((key) => {
      this.fontSizes[key] = Math.max(this.fontSizes[key] - this.fontSizeStep, this.fontSizeStep);
      document.documentElement.style.setProperty(key, `${this.fontSizes[key]}rem`);
    });
  }

  // Reset font sizes to original values
  resetFontSizes() {
    (Object.keys(this.fontSizes) as Array<keyof typeof this.fontSizes>).forEach((key) => {
      document.documentElement.style.setProperty(key, `${this.fontSizes[key]}rem`);
    });
  }

  // Fetch and set colors from API
  fetchAndSetColors() {
    this.apiService.getSync('getcss').subscribe((response: any) => {
      Object.keys(response).forEach((key) => {
        document.documentElement.style.setProperty(`--${key}`, response[key]);
      });
    });
  }
}
