import { TownService } from './../../../services/town.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import {FloatLabelType} from '@angular/material/form-field';
import { Ville } from 'src/app/models/ville.model';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { options } from 'preact';
import { Pays } from 'src/app/models/pays.model';
import { departement } from 'src/app/models/department.model';
import { statut } from 'src/app/models/statut.model';


@Component({
  selector: 'app-put-employee',
  templateUrl: './put-employee.component.html',
  styleUrls: ['./put-employee.component.scss']
})
export class PutEmployeeComponent implements OnInit {
  formUpdate! : FormGroup
  id! : number
  employee! : Employee
  town! : Ville[]
  country! : Pays[]
  dept!  : departement[]
  stat! : statut[]

  filteredOptions! : Observable<Ville[]>
  constructor(private _serviceEmployee : EmployeeService, private _serviceTown : TownService , private _builder : FormBuilder, private _activatedRoute : ActivatedRoute,
    private dialogRef: MatDialogRef<PutEmployeeComponent>,
        @Inject(MAT_DIALOG_DATA) data : Employee
    ){
        this.employee = data
     }

  ngOnInit(): void {

    this.initForm()

    this._serviceTown.getAllCountrys().subscribe({
      next : async (data : any) => {
          this.country = await data
      }
    })

    this._serviceTown.getAll().subscribe({
      next : async (data : any) => {
          this.town = await data
      }
    })
    this._serviceTown.getAllDept().subscribe({
      next : async (data : any) => {
          this.dept = await data
          console.log(this.dept)
      }
    })
    this._serviceTown.getAllStatut().subscribe({
      next : async (data : any) => {
        this.stat = await  data
        console.log(this.stat)
      }
    })
  }


  initForm() {
    this.formUpdate = this._builder.group({
      id : [this.employee.id, Validators.required],
      name : [this.employee.name, Validators.required],
      firstName : [this.employee.firstName, Validators.required],
      birthDate : [this.employee.birthDate, Validators.required],
      vehicle : [this.employee.vehicle, Validators.required],
      securityCard : [this.employee.securityCard, Validators.required],
      entryService : [this.employee.entryService, Validators.required],
      employeeCardNumber : [this.employee.employeeCardNumber, Validators.required],
      registreNational : [this.employee.registreNational, Validators.required],
      role : [this.employee.role, Validators.required],
      language : [this.employee.language,Validators.required],
      street : [this.employee.street,Validators.required],
      postcode : [this.employee.postcode,Validators.required],
      streetNumber : [this.employee.streetNumber,Validators.required],
      phone : [this.employee.phone,Validators.required],
      email : [this.employee.email,Validators.required],
      country : [this.employee.country, Validators.required],
      departement : [this.employee.departement,Validators.required],
    })
  }

  PutEmployee(){
    this._serviceEmployee.putEmployee(this.formUpdate.value).subscribe()
  }
}
