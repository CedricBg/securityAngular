import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ConnectionComponent } from './components/connection/connection.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConnectionComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
