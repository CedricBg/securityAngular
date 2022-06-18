import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(
    private _httpClient : HttpClient
  ) { }


  getAll() : Observable<Employee[]>{
    return this._httpClient.get<Employee[]>(environment.baseAdres+ 'Employee' )
  }

  putEmployee(user : Employee){
    console.log(user)
    return this._httpClient.put<Employee>(environment.baseAdres+ 'Employee', user)
    }

  Delete(id: number){
  return this._httpClient.delete(environment.baseAdres+ 'employee/'+id)
  }
}
