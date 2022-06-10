import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { putEmployee } from 'src/app/models/putEmployee.model';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  listEmployee! : Employee[]
  constructor(
    private _serviceEmployee : EmployeeService
  ) { }

  ngOnInit(): void {
    this.getAll()

  }

getAll(){
  this._serviceEmployee.getAll().subscribe({
    next : (data : Employee[]) => {
      this.listEmployee = data
      }
    })
  }


putEmployee(user : putEmployee){

}

}
