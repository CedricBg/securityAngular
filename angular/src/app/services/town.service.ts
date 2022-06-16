import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ville } from '../models/ville.model';

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
}
