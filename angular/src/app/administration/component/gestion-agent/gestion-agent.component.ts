import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { PlanningService } from 'src/app/services/planning.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { clientplanning } from 'src/app/models/clientplanning.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { postPlanning } from 'src/app/models/postPlanning.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import frLocale from '@fullcalendar/core/locales/fr'

@Component({
  selector: 'app-gestion-agent',
  templateUrl: './gestion-agent.component.html',
  styleUrls: ['./gestion-agent.component.scss']
})
export class GestionAgentComponent implements OnInit {
events : any = []



  user! :Employee
  reponse! : string | undefined
  customer! : clientplanning[]
  formclient! : FormGroup
  SelectedCustomer! : string
  start : boolean = true
  isEndDateVisible! :boolean
  workday! : postPlanning
  _tmpStartDate! : string
  _tmpEndDate! : string
  getDate! : postPlanning[]
  stardate! : string
  enddate! : string[]
  starttime! : string
  endtime! : string
  array! : string[]
  get tmpStartDate() : string {
    if(this._tmpStartDate!= null) this.isEndDateVisible = true
    return this._tmpStartDate
  }

  get tmpEndDate() : string {
    return this._tmpEndDate
  }

  constructor(
    private _planningService : PlanningService, private _builder : FormBuilder, private _route :  Router,private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.user = this._planningService.getData()
    this._planningService.getCustomer().subscribe({
      next :   (data : clientplanning[]) =>{
        this.customer =  data

      }
    })

     this._planningService.GetDate(this.user.id).subscribe({
      next : async (data : postPlanning[]) =>{
        this.getDate = await data
        this.allDates()
      }
    })



    this.formclient = this._builder.group({
      Customer : ['',Validators.required],
      startTime : [''],
      endTime : ['']
    })

  }


SelectCutom(){
  this.workday = this.formclient.value
  this.workday.idEmployee = this.user.id
  this.workday.endTime = this.tmpEndDate
  this.workday.startTime = this.tmpStartDate
  this._planningService.PostDate(this.workday)
  this.openSnackBar()
  this._route.navigate(['../administration/admin'])
}

allDates(){
  console.log(this.getDate)
  for(let elt in this.getDate){
    this.array = this.getDate[elt].startTime.split(" ")

    console.log(this.array[0])
    console.log(this.array[1])
    this.events = [
      { title: this.getDate[elt].customer , date : this.array[0].toString() },
      { title: this.array[1] , date : this.array[0].toString() },

      //{ title: '08:00 End', date: '2022-06-01' },
    ]


    console.log(this.getDate[elt].startTime)
    console.log(this.getDate[elt].endTime)
    console.log(this.getDate[elt].customer)

  }
  console.log(this.events)
}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale : frLocale,
    dateClick: this.handleDateClick.bind(this),
    events: this.events,


  };
  handleDateClick(arg: any) {
    this.reponse = arg.dateStr +" "+ prompt("Entrez l'heure pour "+ arg.dateStr , "00:00" )
    if(this.start == true){
      this._tmpStartDate = this.reponse
      this.start = false
    }
    else
      this._tmpEndDate = this.reponse
  }
  openSnackBar() {

    this._snackBar.open('La date à bien été ajouté','X'), {
      duration: 20
    }
  }
}
