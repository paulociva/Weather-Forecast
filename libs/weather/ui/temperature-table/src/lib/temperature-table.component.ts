import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PeriodEnum } from '@weather-forecast/weather/utils';

@Component({
  selector: 'wf-temperature-table',
  templateUrl: './temperature-table.component.html',
  styleUrls: ['./temperature-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemperatureTableComponent {

  @Input() data: Record<string, string>[] = [];
  @Input() columns?: string[] | null;
  @Input() period: PeriodEnum = PeriodEnum.DAILY;
}
