import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { putEmployee } from 'src/app/models/putEmployee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { PutEmployeeComponent } from '../put-employee/put-employee.component';



@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  listEmployee! : Employee[]
  constructor(
    private _serviceEmployee : EmployeeService,public dialog: MatDialog
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

openDialog(user : Employee) {
  const diallogConfig = new MatDialogConfig;
  diallogConfig.data = user
  diallogConfig.disableClose = false;
  diallogConfig.autoFocus = true;
  diallogConfig.width = "75vw";
  diallogConfig.height= "75vh";
  const dialogRef = this.dialog.open(PutEmployeeComponent,diallogConfig);
  }
}
