import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ArticleListPageService } from '../services/article-list-page.service';

@Injectable()
export class ArticleListPageResolver implements Resolve<any> {

  constructor(private service: ArticleListPageService) {
  }

  resolve() {
    return this.service.findArticles();
  }
}
