import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { connection } from '../models/connection.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  active! : string
  returnData! : string
  response!: boolean
  durationInSeconds! : number
  get isConnected() : boolean{
    return localStorage.getItem('isConnected') == 'true' ? true : false
  }

  isConnectedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected)

  emitIsConnected(){
    this.isConnectedSubject.next(this.isConnected)
  }
  constructor(private _client : HttpClient, private _router : Router, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {

  }

  openSnackBar() {

    this._snackBar.open('Mot de passe ou login incorrect','X'), {
      duration: 30
    }
  }

  LoginCustomer(user : connection){
    try{
  this._client.post<string>(environment.baseAdres+ 'Auth/customer/login', user).subscribe({
  next : (data : string)=>{
    this.returnData = data
    this.active = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/ispersistent'
    if(this.returnData != null ){
      const decodedToken = this.helper.decodeToken(data)
      if(decodedToken[this.active] == 'true'){
        sessionStorage.setItem('token', data)
        for (const prop in decodedToken){
          this.i++
          this.b = this.i.toString()
          sessionStorage.setItem(this.b,`${decodedToken[prop]}`)
        }
        this.i = 0
          this._isConnected = true
          this._router.navigate(['./administration/admin'])
          this.emitIsConnected()
        }
        else{
          this.openSnackBar()
        }
      }
      else{
        this.openSnackBar()
      }
    },
    error : ()=>{
      return false;
    }
  })
  return false;
}
  catch(exception){
    return false;
  }
}

  LogoutCustomer(){
    this._router.navigate(['./administration/admin'])
    this._isConnected = false
    sessionStorage.clear();
    this.emitIsConnected()
  }


   LoginEmployee(user : connection) {

      this._client.post<string>(environment.baseAdres+ 'Auth/employee/login', user).subscribe({
      next : (data : string)=>{
        this.active = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/ispersistent'
        this.returnData = data
        if(this.returnData != null){
          const decodedToken = this.helper.decodeToken(data)
          if(decodedToken[this.active] == 'true'){
            sessionStorage.setItem('token', data)
            for (const prop in decodedToken){
              this.i++
              this.b = this.i.toString()
              sessionStorage.setItem(this.b,`${decodedToken[prop]}`)
            }
            this.i = 0
              this._isConnected = true
              this._router.navigate(['./administration/admin'])
              this.emitIsConnected()
          }
          else{
            this.openSnackBar()
          }
        }
        else{
          this.openSnackBar()
        }
      },
    })

  }


  LogoutEmployee(){
    this._router.navigate(['./auth'])
    this._isConnected = false
    sessionStorage.clear();
    this.emitIsConnected()
  }
}
