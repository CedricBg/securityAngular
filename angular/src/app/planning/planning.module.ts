import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningRoutingModule } from './planning-routing.module';
import { PlanComponent } from './components/plan/plan.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [
    PlanComponent
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    FullCalendarModule,
    SharedModule
  ]
})
export class PlanningModule { }
