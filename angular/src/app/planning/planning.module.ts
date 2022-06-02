import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanningRoutingModule } from './planning-routing.module';
import { PlanComponent } from './components/plan/plan.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
]);



@NgModule({
  declarations: [
    PlanComponent
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    FullCalendarModule,
  ]
})
export class PlanningModule { }
