import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
  providers:[MessageService]
})
export class ConnectionComponent implements OnInit {
  myformGroup! : FormGroup
  isConnected! :boolean
  respnse! : boolean
  constructor(private _serviceAuth : AuthService, private _builder : FormBuilder, private messageService: MessageService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.myformGroup = this._builder.group({
      login : ['', Validators.required],
      password : ['', Validators.required]
      
    })
    this.primengConfig.ripple = true
  }
  showError() {
    this.messageService.add({key:'myKey1',severity:'error', summary: 'Error', detail: 'Erreur de login'});
}

  Login(){
      
      console.log(this._serviceAuth.LoginEmployee(this.myformGroup.value))
      this.showError()

  }

  Logout(){
    this._serviceAuth.LogoutEmployee()
  }
}


