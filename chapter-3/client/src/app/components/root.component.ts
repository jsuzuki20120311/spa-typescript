import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStore } from '../app-store';
import { AppState } from '../models/app-state';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit, OnDestroy {

  showLoading: boolean;

  constructor(private appStore: AppStore) {
    this.showLoading = this.appStore.appState.showLoading;
    this.changeLoader = this.changeLoader.bind(this);
  }

  ngOnInit() {
    this.appStore.registerHandler('CHANGE.LOADER', this.changeLoader);
  }

  ngOnDestroy() {
    this.appStore.removeHandler('CHANGE.LOADER', this.changeLoader);
  }

  changeLoader(eventName: string, beforeAppState: AppState, currentAppeState: AppState) {
    this.showLoading = currentAppeState.showLoading;
  }
}
