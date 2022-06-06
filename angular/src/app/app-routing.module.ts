import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourofourComponent } from './component/fourofour/fourofour.component';

const routes: Routes = [
  { path : 'planning' , loadChildren: ()=> import('./planning/planning.module').then(m => m.PlanningModule)},
  { path : 'auth' , loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)},
  { path : 'administration' , loadChildren: ()=> import('./administration/administration.module').then(m => m.AdministrationModule)},
  {path : '', redirectTo : 'auth', pathMatch : 'full'},
  {path : '**', redirectTo : '404', pathMatch : 'full'},
  {path : '404', component : FourofourComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
