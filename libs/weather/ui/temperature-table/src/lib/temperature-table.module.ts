import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { TemperatureTableComponent } from './temperature-table.component';
import { TimestampDatePipe } from './timestamp-date.pipe';

@NgModule({
  imports: [CommonModule, MatTableModule],
  declarations: [
    TemperatureTableComponent,
    TimestampDatePipe
  ],
  providers: [DatePipe],
  exports: [
    TemperatureTableComponent
  ]
})
export class TemperatureTableModule {
}
