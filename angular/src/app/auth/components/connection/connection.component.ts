import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],

})
export class ConnectionComponent implements OnInit {
  myformGroup! : FormGroup
  isConnected! :boolean
  response! : boolean
  constructor(private _serviceAuth : AuthService, private _builder : FormBuilder) { }

  ngOnInit(): void {
    this.myformGroup = this._builder.group({
      login : ['', Validators.required],
      password : ['', Validators.required]

    })

  }


  Login(){

    this._serviceAuth.LoginEmployee(this.myformGroup.value)



  }

  Logout(){
    this._serviceAuth.LogoutEmployee()
  }
}


