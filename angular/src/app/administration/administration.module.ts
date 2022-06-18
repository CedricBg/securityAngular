import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { AgentsComponent } from './component/agents/agents.component';
import { NavComponent } from './component/nav/nav.component';
import { PutEmployeeComponent } from './component/put-employee/put-employee.component';
import { GestionAgentComponent } from './component/gestion-agent/gestion-agent.component';
import { HomeComponent } from './component/home/home.component';


@NgModule({
  declarations: [
    AdminComponent,
    AgentsComponent,
    NavComponent,
    PutEmployeeComponent,
    GestionAgentComponent,
    HomeComponent,
  ],
  imports: [
    SharedModule,
    AdministrationRoutingModule,
  ]
})
export class AdministrationModule { }
