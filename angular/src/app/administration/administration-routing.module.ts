import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationModule } from './administration.module';
import { AdminComponent } from './component/admin/admin.component';

const routes: Routes = [
  { path : 'admin', component : AdminComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
