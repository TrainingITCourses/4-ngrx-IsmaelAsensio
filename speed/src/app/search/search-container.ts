import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
//import { GlobalState } from '../reducers/index';
import { SearchAgencies, SearchStatus, SearchMissions, SaveLaunches } from '../reducers/launch.actions';
import { LaunchState } from '../reducers/launch.reducer';

@Component({
  selector: 'app-search-container',
  template: `
    <app-search-presenter
      (eventSearchAgencies)="onSearchAgencies($event)"
      (eventSearchStatus)="onSearchStatus($event)"
      (eventSearchMissions)="onSearchMissions($event)"
      (eventSaveLaunches)="onSaveLaunches()"
    >
    </app-search-presenter>
    <app-launches-display [launches]="launchesResult"> </app-launches-display>
  `
  ,
  styles: []
})

export class ContainerComponent implements OnInit {

  public launchesResult: any[];

  constructor(private store: Store<LaunchState>) {}

  ngOnInit() {
    this.store.select('launch').subscribe(value => (this.launchesResult = value.launches));
  }

  onSearchAgencies(textToSearch: string) {
    this.store.dispatch(new SearchAgencies(textToSearch));
  }

  onSearchStatus(id: string) {
    this.store.dispatch(new SearchStatus(id));
  }

  onSearchMissions(textToSearch: string) {
    this.store.dispatch(new SearchMissions(textToSearch));
  }

  onSaveLaunches() {
    this.store.dispatch(new SaveLaunches(this.launchesResult));
  }
}
