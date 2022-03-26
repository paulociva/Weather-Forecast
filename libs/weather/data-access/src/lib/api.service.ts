import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { environment } from '@weather-forecast/shared/environments';
import { CityResponse, DataResponse, PeriodEnum } from '@weather-forecast/weather/utils';

@Injectable()
export class ApiService {

  readonly CITY_URL = '/geo/1.0/direct';
  readonly DATA_URL = '/data/2.5/onecall';
  readonly OTHER_PERIODS = 'current,minutely,alerts,';

  constructor(private http: HttpClient) {
  }

  getLocationByCityName(city: string) {
    return this.http.get<CityResponse[]>(`${environment.openWeatherApi}${this.CITY_URL}?q=${city}&limit=1&appid=${environment.openWeatherApiKey}`)
      .pipe(map(res => res[0]))
  }

  getCastByLongLat(period: string, lat: number, lon: number) {
    return this.http.get<DataResponse>(`${environment.openWeatherApi}${this.DATA_URL}?lat=${lat}&lon=${lon}&exclude=${this.excludePeriods(period)}&appid=${environment.openWeatherApiKey}`)
  }

  private excludePeriods(period: string): string {
    return this.OTHER_PERIODS + (period === PeriodEnum.HOURLY ?
      PeriodEnum.DAILY :
      PeriodEnum.HOURLY);
  }
}
