import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PeriodEnum } from '@weather-forecast/weather/utils';

@Pipe({
  name: 'timestampDate'
})
export class TimestampDatePipe implements PipeTransform {
  constructor(private dataPipe: DatePipe) {
  }

  transform(value: string, period: PeriodEnum): string | null {
    return this.dataPipe.transform(
      Number(value) * 1000,
      period === PeriodEnum.DAILY ? 'mediumDate' : 'medium');
  }
}
