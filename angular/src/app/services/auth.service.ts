import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { connection } from '../models/connection.model';
import { token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser!: connection
  _isConnected! :boolean
  theToken! : token
  get isConnected() : boolean{
    return localStorage.getItem('isConnected') == 'true' ? true : false
  }


  isConnectedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected)

  emitIsConnected(){
    this.isConnectedSubject.next(this.isConnected)
  }

  constructor(private _client : HttpClient, private _router : Router) { }


  LoginCustomer(user : connection){
  this._client.post<token>(environment.baseAdres+ 'Auth/customer/login', user).subscribe({
  next : (data : token)=>{
    this.theToken = data
    console.log(this.theToken)


      //if (this.currentUser !=null && this.currentUser.isActive){
        //this.currentUser.Password = data['password'].toString()
       // this.currentUser.Login = data['login'].toString()
        this._isConnected = true
        //sessionStorage.setItem('token', data)
        //sessionStorage.setItem('isConnected', this._isConnected.toString())
        //sessionStorage.setItem('user', JSON.stringify(this.currentUser))
        this._router.navigate(['./administration/admin'])
        this.emitIsConnected()
     // }
    }
  })
}

  LogoutCustomer(){
    this._router.navigate(['./'])
    this._isConnected = false
    sessionStorage.clear();
    this.emitIsConnected()
  }
}

