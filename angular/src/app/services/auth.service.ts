import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { connection } from '../models/connection.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
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
  ngOnInit(): void {

  }

  LoginCustomer(user : connection){
  this._client.post<string>(environment.baseAdres+ 'Auth/customer/login', user).subscribe({
  next : (data : string)=>{
    if(data != null ){
      const decodedToken = this.helper.decodeToken(data)
      sessionStorage.setItem('token', data)
      for (const prop in decodedToken){
        this.i++
        this.b = this.i.toString()
        sessionStorage.setItem(this.b,`${decodedToken[prop]}`)
      }
      this.i = 0
      if (sessionStorage.getItem('5') == 'true'){
        this._isConnected = true

        this._router.navigate(['./administration/admin'])
        this.emitIsConnected()
        }
      }
      else if (data != null && sessionStorage.getItem('1') != null){
        this._router.navigate(['./administration/admin'])
        if (sessionStorage.getItem('5') == 'true'){
          this._isConnected = true
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


   LoginEmployee(user : connection) : boolean{
     try{
      this._client.post<string>(environment.baseAdres+ 'Auth/employee/login', user).subscribe({
      next : (data : string)=>{
        if(data != null){
          const decodedToken = this.helper.decodeToken(data)
          sessionStorage.setItem('token', data)
          for (const prop in decodedToken){
            console.log(this.i)
            this.i++
            this.b = this.i.toString()
            sessionStorage.setItem(this.b,`${decodedToken[prop]}`)
          }
          this.i = 0 
          if (sessionStorage.getItem('5') == 'true'){
            this._isConnected = true
            console.log(this._isConnected)
            this._router.navigate(['./administration/admin'])
            this.emitIsConnected()
          }  
        }
      }
    })
    return true;
  }
  catch(exception){
    return false;
  }
}

  LogoutEmployee(){
    this._router.navigate(['./'])
    this._isConnected = false
    sessionStorage.clear();
    this.emitIsConnected()
  }
}
