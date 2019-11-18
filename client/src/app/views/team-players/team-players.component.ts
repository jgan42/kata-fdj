import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TeamPlayers } from '../../interfaces/team-players';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.scss']
})
export class TeamPlayersComponent implements OnInit {

  teamPlayers: TeamPlayers;
  subscription: Subscription;

  constructor(private teamsService: TeamsService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.subscription = this.route.params
      .pipe(
        switchMap(params => this.teamsService.getTeamPlayers(params.teamId))
      )
      .subscribe(teamPlayers => this.teamPlayers = teamPlayers);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goBack() {
    this.location.back();
  }

}
