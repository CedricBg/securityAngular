import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { ConnectionComponent } from './components/connection/connection.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ConnectionComponent,
    CustomerComponent,
    
  ],
  imports: [
    AuthRoutingModule,
    SharedModule 
  ]
})
export class AuthModule { }
