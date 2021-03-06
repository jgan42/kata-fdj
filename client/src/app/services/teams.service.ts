import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../interfaces/team';
import { environment } from '../../environments/environment';
import { TeamPlayers } from '../interfaces/team-players';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) {}

  getTeamsByLeagueName(name: string) {
    return this.http.get<Team[]>(`${environment.apiUrl}teams?leagueName=${name}`)
  }

  getTeamPlayers(id: string) {
    return this.http.get<TeamPlayers>(`${environment.apiUrl}team-players?teamId=${id}`)
  }
}
