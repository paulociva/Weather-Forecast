import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SearchModule } from '@weather-forecast/weather/ui/search';
import { TemperatureTableModule } from '@weather-forecast/weather/ui/temperature-table';
import { ApiModule } from '@weather-forecast/weather/data-access';
import { WeatherComponent } from './weather.component';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    SearchModule,
    TemperatureTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: WeatherComponent
      }
    ]),
    MatProgressSpinnerModule,
  ],
  declarations: [
    WeatherComponent
  ],
})
export class WeatherModule {
}
