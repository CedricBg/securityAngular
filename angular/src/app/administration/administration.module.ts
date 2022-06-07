import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdminComponent } from './component/admin/admin.component';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    SharedModule,
    AdministrationRoutingModule,
  ]
})
export class AdministrationModule { }
