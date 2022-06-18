import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clientplanning } from '../models/clientplanning.model';
import { Employee } from '../models/employee.model';
import { postPlanning } from '../models/postPlanning.model';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  isSelected : boolean = false
  constructor(
    private _httpClient : HttpClient, private _route : Router
  ) { }

  sharingData!: Employee;
  PostDate(start : postPlanning)
  {

    this._httpClient.post<postPlanning>(environment.baseAdres + "Planning", start).subscribe()
  }
  GetDate(id : number){
    return this._httpClient.get<postPlanning[]>(environment.baseAdres + "Planning/ByEmployee/"+id)
  }

  saveData(user :Employee){
    this.sharingData = user;
  }
 getData():Employee
  {
    return this.sharingData;
  }

  getCustomer(){
    return this._httpClient.get<clientplanning[]>(environment.baseAdres + "customer")
  }
}

