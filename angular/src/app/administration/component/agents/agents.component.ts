import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { PlanningService } from 'src/app/services/planning.service';
import { PutEmployeeComponent } from '../put-employee/put-employee.component';
import { GestionAgentComponent } from '../gestion-agent/gestion-agent.component';


@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  listEmployee! : Employee[]
  constructor(
    private _serviceEmployee : EmployeeService,public dialog: MatDialog,private _router : Router, private _planningService : PlanningService
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
  diallogConfig.width = "50vw";
  diallogConfig.height= "75vh";
  const dialogRef = this.dialog.open(PutEmployeeComponent,diallogConfig);
  }

  Delete(id: number){
    this._serviceEmployee.Delete(id).subscribe({
    next : ()=>{
      this.redirectTo('./administration/admin/agents')
      }
    })
  }

 redirectTo(uri:string){
  this._router.navigateByUrl('./', {skipLocationChange: true}).then(()=>
  this._router.navigate([uri]));
}

planning(user : Employee){
  this._planningService.saveData(user)
  this._router.navigate(['./administration/admin/planningagent'])
}
}
