import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './components/connection/connection.component';

const routes: Routes = [
  {path : '', redirectTo : 'connexion', pathMatch : 'full'},
  {path : 'connexion', component : ConnectionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
