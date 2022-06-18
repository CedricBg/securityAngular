import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { PlanningService } from 'src/app/services/planning.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { clientplanning } from 'src/app/models/clientplanning.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { postPlanning } from 'src/app/models/postPlanning.model';
import { event } from 'src/app/models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-gestion-agent',
  templateUrl: './gestion-agent.component.html',
  styleUrls: ['./gestion-agent.component.scss']
})
export class GestionAgentComponent implements OnInit {

  ok! : boolean
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
  getDate : postPlanning[] = []
  stardate! : string
  enddate! : string[]
  starttime! : string
  endtime! : string
  startarray! : string[]
  endarray! : string[]
  events: any[] = []
  get tmpStartDate() : string {
    if(this._tmpStartDate!= null) this.isEndDateVisible = true
    return this._tmpStartDate
  }

  get tmpEndDate() : string {
    return this._tmpEndDate
  }

  constructor(
    private _planningService : PlanningService, private _builder : FormBuilder, private _route :  Router,private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.user = this._planningService.getData()
    this._planningService.getCustomer().subscribe({
      next :   (data : clientplanning[]) =>{
        this.customer =  data

      }
    })

     this._planningService.GetDate(this.user.id).subscribe({
      next : (data : postPlanning[]) =>{
        this.getDate = data
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
  this._route.navigateByUrl('../administration/admin/planningagent/planning')
}
allDates(){
  console.log(this.getDate.length)
  for(let elt in this.getDate){
    this.startarray = this.getDate[elt].startTime.split(" ")
    this.endarray = this.getDate[elt].endTime.split(" ")         //console.log()
    console.log(this.endarray[0])
    console.log(this.endarray[1])
    //console.log(this.getDate[elt].startTime)
    //console.log(this.getDate[elt].endTime)
    //console.log(this.getDate[elt].customer)

    this.events.push(

      { title: this.startarray[1]+' '+this.getDate[elt].customer , date: this.startarray[0] },
      { title:  this.endarray[1] , date:  this.endarray[0] },

    );
  }

 this.ok = true //on ne charge le calendrier dans le html que quand on les dnnées
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
