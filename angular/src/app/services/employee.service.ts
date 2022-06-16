import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PutEmployeeComponent } from '../administration/component/put-employee/put-employee.component';
import { Employee } from '../models/employee.model';
import { putEmployee } from '../models/putEmployee.model';

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


    }


}
