import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { requestOptions } from './request-options';
import { handleError } from './handle-error';

import { AppStore } from '../app-store';

import { Article } from '../models/article';
import { ResponseBody } from '../models/response-body';

@Injectable()
export class ArticleDetailPageService {

  constructor(
    private httpClient: HttpClient,
    private appStore: AppStore
  ) { }

  findArticleById(id: number) {
    this.appStore.applyAppState('CHANGE.LOADER', { showLoading: true });
    const url = `/api/v1/article/${id}.json`;
    return this.httpClient.get<ResponseBody<Article>>(encodeURI(url), requestOptions)
      .do((response) => {
        this.appStore.applyAppState('', { currentShowArticle: response.data });
      })
      .catch(handleError)
      .finally(() => {
        this.appStore.applyAppState('CHANGE.LOADER', { showLoading: false });
      });
  }
}
