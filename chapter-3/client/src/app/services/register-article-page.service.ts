import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { AppStore } from '../app-store';

import { handleError } from './handle-error';
import { requestOptions } from './request-options';

import { Article } from '../models/article';
import { ResponseBody } from '../models/response-body';

@Injectable()
export class RegisterArticlePageService {

  constructor(
    private httpClient: HttpClient,
    private appStore: AppStore
  ) { }

  createArticle(article: Article) {
    this.appStore.applyAppState('CHANGE.LOADER', { showLoading: true });
    return this.httpClient.post<ResponseBody<Article>>('/api/v1/article', article, requestOptions)
      .catch(handleError)
      .finally(() => this.appStore.applyAppState('CHANGE.LOADER', { showLoading: false }));
  }
}
