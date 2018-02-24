import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppStore } from '../../app-store';

import { AppState } from '../../models/app-state';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.css']
})
export class ArticleListPageComponent implements OnInit, OnDestroy {

  articles: Article[];

  constructor(
    private appStore: AppStore,
    private route: ActivatedRoute
  ) {
    this.articles = this.route.snapshot.data.articleList.data;
    this.onChangeArticles = this.onChangeArticles.bind(this);
  }

  ngOnInit() {
    this.appStore.registerHandler('CHANGE.ARTICLES', this.onChangeArticles);
  }

  ngOnDestroy() {
    this.appStore.removeHandler('CHANGE.ARTICLES', this.onChangeArticles);
  }

  onChangeArticles(eventName, beforeAppState, appState: AppState) {
    this.articles = appState.articles;
  }
}
