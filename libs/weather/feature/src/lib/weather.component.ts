import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WeatherStore } from '@weather-forecast/weather/data-access';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodEnum } from '@weather-forecast/weather/utils';

@Component({
  selector: 'wf-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeatherStore],
})
export class WeatherComponent {
  PeriodEnum = PeriodEnum
  isLoading$ = this.weatherStore.isLoading$
  error$ = this.weatherStore.error$
  dataTable$ = this.weatherStore.dataTable$
  period$ = this.weatherStore.period$
  cityName$ = this.weatherStore.cityName$

  constructor(
    private weatherStore: WeatherStore,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  search(search: { cityName: string, period: string }) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: search,
        queryParamsHandling: 'merge'
      });
  }
}
