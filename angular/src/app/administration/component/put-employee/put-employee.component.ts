import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { putEmployee } from 'src/app/models/putEmployee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import {FloatLabelType} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-put-employee',
  templateUrl: './put-employee.component.html',
  styleUrls: ['./put-employee.component.scss']
})
export class PutEmployeeComponent implements OnInit {
  formUpdate! : FormGroup
  id! : number
  employee! : Employee
  constructor(private _serviceEmployee : EmployeeService, private _builder : FormBuilder, private _activatedRoute : ActivatedRoute,
    private dialogRef: MatDialogRef<PutEmployeeComponent>,
        @Inject(MAT_DIALOG_DATA) data : any
    ){
        this.employee = data
     }



  ngOnInit(): void {

    this.id = this._activatedRoute.snapshot.params['id']
    this.formUpdate = this._builder.group({
      id : [this.employee.id, Validators.required],
      name : [this.employee.name, Validators.required],
      firstname : [this.employee.firstName, Validators.required],
      birthdate : [this.employee.birthdate, Validators.required],
      securitycardnumber : [this.employee.securityCard, Validators.required],
      entryService : [this.employee.entryService, Validators.required],
      employeeCardNumber : [this.employee.employeeCardNumber, Validators.required],
      registreNational : [this.employee.registreNational, Validators.required],
      role : [this.employee.role, Validators.required],
      Country : [this.employee.country, Validators.required],
      vehicle : [this.employee.vehicle, Validators.required],


    })
    console.log(this.employee)


  }

}
