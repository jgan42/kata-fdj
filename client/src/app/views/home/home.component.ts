import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import {debounceTime, startWith, switchMap} from 'rxjs/operators';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../interfaces/team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchControl: FormControl;
  valueChangesSub: Subscription;
  teamList: Team[] = [];

  constructor(private fb: FormBuilder, private teamsService: TeamsService) {
    this.searchControl = this.fb.control('');
  }

  ngOnInit() {
    this.valueChangesSub = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap(value => this.teamsService.getTeamsByLeagueName(value))
      )
      .subscribe(value => this.teamList = value || []);
  }

  ngOnDestroy() {
    if (this.valueChangesSub) {
      this.valueChangesSub.unsubscribe();
    }
  }

}
