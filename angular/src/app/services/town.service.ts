import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ville } from '../models/ville.model';
import { Pays } from '../models/pays.model';
import { departement } from '../models/department.model';
import { statut } from '../models/statut.model';

@Injectable({
  providedIn: 'root'
})
export class TownService {

  constructor(
    private _httpClient : HttpClient
  ) { }

  getAll() : Observable<Ville[]>{
    return this._httpClient.get<Ville[]>(environment.baseAdres+ 'town')
  }

  getAllCountrys() : Observable<Pays[]>{
  return this._httpClient.get<Pays[]>(environment.baseAdres+ 'town/contrys')
  }

  getAllDept() : Observable<departement[]>{
    return this._httpClient.get<departement[]>(environment.baseAdres+ 'formulaire/departement')
  }

  getAllStatut() : Observable<statut[]>{
    return this._httpClient.get<statut[]>(environment.baseAdres+ 'formulaire/statut')
  }
}
