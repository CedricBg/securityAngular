import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TieInterceptor } from './services/tie.interceptor';
import { FourofourComponent } from './component/fourofour/fourofour.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FourofourComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass : TieInterceptor, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { } 
