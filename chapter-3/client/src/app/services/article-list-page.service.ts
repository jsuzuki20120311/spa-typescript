import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { handleError } from './handle-error';
import { requestOptions } from './request-options';

import { AppStore } from '../app-store';

import { Article } from '../models/article';
import { ResponseBody } from '../models/response-body';

@Injectable()
export class ArticleListPageService {

  constructor(
    private httpClient: HttpClient,
    private appStore: AppStore
  ) { }

  findArticles() {
    this.appStore.applyAppState('CHANGE.LOADER', { showLoading: true });
    return this.httpClient.get<ResponseBody<Article[]>>('/api/v1/article/all.json', requestOptions)
      .do((response) => {
        this.appStore.applyAppState('CHANGE.ARTICLES', { articles: response.data });
      })
      .catch(handleError)
      .finally(() => {
        this.appStore.applyAppState('CHANGE.LOADER', { showLoading: false });
      });
  }

  deleteArticle(articleId: number) {
    this.appStore.applyAppState('CHANGE.LOADER', { showLoading: true });
    const url = `/api/v1/article/${articleId}.json`;
    return this.httpClient.delete(encodeURI(url), requestOptions)
      .mergeMap(() => this.httpClient.get<ResponseBody<Article[]>>('/api/v1/article/all.json', requestOptions))
      .do((response) => {
        this.appStore.applyAppState('CHANGE.ARTICLES', { articles: response.data });
      })
      .catch(handleError)
      .finally(() => {
        this.appStore.applyAppState('CHANGE.LOADER', { showLoading: false });
      });
  }
}
