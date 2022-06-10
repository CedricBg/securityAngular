import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { connection } from 'src/app/models/connection.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

isConnected! :boolean
myformGroup! :FormGroup
response! : boolean

  constructor(private _serviceAuth : AuthService, private _builder : FormBuilder) { }

  ngOnInit(): void {
    this.myformGroup = this._builder.group({
      login : ['', Validators.required],
      password : ['', Validators.required]

    })

    this._serviceAuth.isConnectedSubject.subscribe({
      next : (data : boolean) => {this.isConnected = data},
    })

  }


  Login(){
    this._serviceAuth.LoginCustomer(this.myformGroup.value)
  }

  Logout(){
    this._serviceAuth.LogoutCustomer()
  }
}
