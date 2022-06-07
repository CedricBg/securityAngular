import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { connection } from 'src/app/models/connection.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [MessageService]
})
export class CustomerComponent implements OnInit {

isConnected! :boolean
myformGroup! :FormGroup
response! : boolean

  constructor(private _serviceAuth : AuthService, private _builder : FormBuilder,private messageService: MessageService) { }

  ngOnInit(): void {
    this.myformGroup = this._builder.group({
      login : ['', Validators.required],
      password : ['', Validators.required]

    })

    this._serviceAuth.isConnectedSubject.subscribe({
      next : (data : boolean) => {this.isConnected = data},
    })

  }
  showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Message Content'});
}

  Login(){
    
    this._serviceAuth.LoginCustomer(this.myformGroup.value)
  }

  Logout(){
    this._serviceAuth.LogoutCustomer()
  }
}
