import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from '../planning/components/plan/plan.component';
import { AdminComponent } from './component/admin/admin.component';
import { AgentsComponent } from './component/agents/agents.component';
import { NavComponent } from './component/nav/nav.component';

const routes: Routes = [
  { path : 'admin', component : AdminComponent, children : [
    {path : 'planning' , component : PlanComponent },
    {path : 'agents' , component : AgentsComponent },
    {path : 'nav' , component : NavComponent },
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
