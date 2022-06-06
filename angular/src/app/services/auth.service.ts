import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { connection } from '../models/connection.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser!: connection
  _isConnected! :boolean
  theToken! : string
  helper = new JwtHelperService();
  i : number = 0
  b! : string
  get isConnected() : boolean{
    return localStorage.getItem('isConnected') == 'true' ? true : false
  }

  isConnectedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected)

  emitIsConnected(){
    this.isConnectedSubject.next(this.isConnected)
  }
  constructor(private _client : HttpClient, private _router : Router) { }
  LoginCustomer(user : connection){
  this._client.post<string>(environment.baseAdres+ 'Auth/customer/login', user).subscribe({
  next : (data : string)=>{
    if(data != null && sessionStorage.getItem('1') == null ){
      const decodedToken = this.helper.decodeToken(data)
      sessionStorage.setItem('token', data)
      for (const prop in decodedToken){
        this.i++
        this.b = this.i.toString()
        console.log(sessionStorage.setItem(this.b,`${decodedToken[prop]}`))
      }
      if (sessionStorage.getItem('5') == 'true'){
        this._isConnected = true

        //this._router.navigate(['./administration/admin'])
          this.emitIsConnected()
        }
      }
    }
  })
}

  LogoutCustomer(){
    this._router.navigate(['./'])
    this._isConnected = false
    sessionStorage.clear();
    this.emitIsConnected()
  }



    LoginEmployee(user : connection){
      this._client.post<string>(environment.baseAdres+ 'Auth/employee/login', user).subscribe({
      next : (data : string)=>{
        if(data != null && sessionStorage.getItem('1') == null ){
          const decodedToken = this.helper.decodeToken(data)
          sessionStorage.setItem('token', data)
          for (const prop in decodedToken){
            this.i++
            this.b = this.i.toString()
            console.log(sessionStorage.setItem(this.b,`${decodedToken[prop]}`))
          }
          if (sessionStorage.getItem('5') == 'true'){
            this._isConnected = true

            //this._router.navigate(['./administration/admin'])
            this.emitIsConnected()
          }
        }
      }
    })
  }
  LogoutEmployee(){
    this._router.navigate(['./'])
    this._isConnected = false
    sessionStorage.clear();
    this.emitIsConnected()
  }
}
