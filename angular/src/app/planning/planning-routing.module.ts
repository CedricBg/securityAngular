import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from './components/plan/plan.component';
import { PlanningModule } from './planning.module';

const routes: Routes = [
  {path : 'planning' , component : PlanComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
