import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, Observable, throwError } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CityResponse, DataResponse, GenericState, PeriodEnum, SelectorUtil } from '@weather-forecast/weather/utils';

import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';

interface WeatherState extends GenericState<{ city: CityResponse, data: DataResponse }> {
  cityName: string;
  period: PeriodEnum;
}

@Injectable()
export class WeatherStore extends ComponentStore<WeatherState> {
  searchParams$: Observable<{ cityName: string; period: PeriodEnum }> =
    this.route.queryParams.pipe(
      map(params => ({cityName: params['cityName'], period: params['period']})),
      filter(params => params.cityName && params.period),
    );

  loadWeather = this.effect<{ cityName: string, period: string }>((params$) =>
    params$.pipe(
      tap(() => {
        this.patchState({
          status: 'loading',
          error: null
        });
      }),
      switchMap(({cityName, period}) =>
        this.weatherApiService.getLocationByCityName(cityName).pipe(
          switchMap((city) =>
            city ?
              this.weatherApiService.getCastByLongLat(period, city.lat, city.lon).pipe(
                map((data) => ({city, data}))
              ) : throwError(() => new Error('City not found'))
          ),
          tapResponse(
            (res) => {
              this.patchState({
                data: {city: res.city, data: res.data},
                status: 'success',
                error: null
              });
            },
            (error: HttpErrorResponse) => {
              this.patchState({
                status: 'error',
                error: error.message
              });
            }
          )
        )
      )
    )
  );

  dataTable$ = this.select((state) => {
    const days = state.data?.data.daily;
    const hours = state.data?.data.hourly;
    const city = state.data?.city;
    const columns: string[] = [];
    const rows: Record<string, string> = {};
    if (city) {
      columns.push('City Name')
      rows['City Name'] = city.name
    }
    if (days && state.period === PeriodEnum.DAILY) {
      days.forEach(day => {
        columns.push(day.dt.toString())
        rows[day.dt.toString()] = day.temp.day.toString()
      })
      return {columns, rows: [rows]};
    }
    if (hours && state.period === PeriodEnum.HOURLY) {
      [...Array(8)].forEach((day, index) => {
        columns.push(hours[index * 3].dt.toString())
        rows[hours[index * 3].dt.toString()] = hours[index * 3].temp.toString()
      })
      return {columns, rows: [rows]};
    }
    return null;
  });

  period$ = this.select((state) => {
    return state.period
  });
  cityName$ = this.select((state) => {
    return state.cityName
  });
  isLoading$ = this.searchParams$.pipe(
    tap((searchParams) => {
      this.patchState({
        ...searchParams
      });
      this.loadWeather({...searchParams});
    }),
    switchMap(() => this.select(SelectorUtil.isLoading)));
  error$ = this.select(SelectorUtil.error);

  constructor(
    private route: ActivatedRoute,
    private weatherApiService: ApiService,
  ) {
    super({cityName: '', period: PeriodEnum.DAILY, data: null, status: 'pending', error: null});
  }
}
