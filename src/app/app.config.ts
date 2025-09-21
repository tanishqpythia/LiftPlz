import { ApplicationConfig,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, NgxUiLoaderService } from "ngx-ui-loader"
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgApexchartsModule } from "ng-apexcharts";


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "rgba(12,80,219,0.98)",
  "bgsOpacity": 1,
  "bgsPosition": "bottom-right",
  "bgsSize": 100,
  "bgsType": "three-strings",
  "blur": 2,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "rgba(12,80,219,0.98)",
  "fgsPosition": "center-center",
  "fgsSize": 110,
  "fgsType": "three-strings",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40,40,40,0.27)",
  "pbColor": "rgba(12,80,219,0.98)",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "Loading...",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
    ),
    importProvidersFrom(
      
      NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
      NgxUiLoaderRouterModule,
      NgxUiLoaderHttpModule
    ), provideAnimationsAsync()
  ],
};
