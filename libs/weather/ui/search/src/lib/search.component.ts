import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { PeriodEnum } from '@weather-forecast/weather/utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'wf-search',
  templateUrl: './search.component.html',
  styleUrls: ['search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  @Output() searchChanges = new EventEmitter<{ cityName: string, period: string }>();
  readonly periods = [{label: 'Daily', value: PeriodEnum.DAILY}, {label: 'Hourly', value: PeriodEnum.HOURLY}];
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      cityName: ['', [Validators.required]],
      period: [PeriodEnum.DAILY, [Validators.required]]
    });
  }

  @Input() set period(period: PeriodEnum) {
    this.searchForm.get('period')?.setValue(period)
  }

  @Input() set cityName(cityName: string | null) {
    if (cityName)
      this.searchForm.get('cityName')?.setValue(cityName)
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(
      untilDestroyed(this),
      filter((formValue) => !!(formValue.cityName && formValue.period)),
      debounceTime(300),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    ).subscribe((formValue) => {
      this.searchChanges.emit(formValue)
    })
  }
}
