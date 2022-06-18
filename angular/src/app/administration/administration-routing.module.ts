import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from '../planning/components/plan/plan.component';
import { AdminComponent } from './component/admin/admin.component';
import { AgentsComponent } from './component/agents/agents.component';
import { GestionAgentComponent } from './component/gestion-agent/gestion-agent.component';
import { NavComponent } from './component/nav/nav.component';

const routes: Routes = [
  { path : 'admin', component : AdminComponent, children : [
    {path : '', redirectTo : 'agents', pathMatch : 'full' },
    {path : 'agents' , component : AgentsComponent },
    {path : 'nav' , component : NavComponent },
    {path : 'planningagent' , component : GestionAgentComponent, children: [
      {path : '', redirectTo : 'planning', pathMatch : 'full' },
      {path : 'planning' , component : PlanComponent },
    ] },
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
