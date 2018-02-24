import { Injectable } from '@angular/core';
import { AppState } from './models/app-state';

type Handler = (eventName: string, beforeState: AppState, currentState: AppState) => void;

interface EmitInfo {

  eventName: string;

  handlers: Handler[];
}

@Injectable()
export class AppStore {

  appState: AppState;

  emitInfoList: EmitInfo[];

  constructor() {
    this.appState = {
      articles: [],
      showLoading: false,
    };
    this.emitInfoList = [];
  }

  applyAppState(eventName: string, chagedState: AppState): void {
    const emitInfo = this.emitInfoList.find((emitInfo: EmitInfo) => {
      return emitInfo.eventName === eventName
    });
    if ( ! emitInfo) {
      return;
    }
    const beforeAppState = Object.assign({}, this.appState);
    this.appState = Object.assign(this.appState, chagedState);
    emitInfo.handlers.forEach((handler: Handler) => {
      handler(eventName, beforeAppState, this.appState);
    });
  }

  registerHandler(eventName: string, handler: Handler): void {
    const emitInfo = this.emitInfoList.find((emitInfo: EmitInfo) => {
      return emitInfo.eventName === eventName
    });
    if (emitInfo) {
      emitInfo.handlers.push(handler);
    } else {
      this.emitInfoList.push({
        eventName: eventName,
        handlers: [handler]
      });
    }
  }

  removeHandler(eventName: string, handler: Handler): void {
    const emitInfo = this.emitInfoList.find((emitInfo: EmitInfo) => {
      return emitInfo.eventName === eventName;
    });
    const handlerIndex = emitInfo.handlers.indexOf(handler);
    if (handlerIndex === -1) {
      return;
    }
    emitInfo.handlers.splice(handlerIndex, 1);
  }
}
