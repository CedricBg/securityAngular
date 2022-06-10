import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from './components/plan/plan.component';
import { PlanningModule } from './planning.module';

const routes: Routes = [
  {path : '', redirectTo : '404', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
