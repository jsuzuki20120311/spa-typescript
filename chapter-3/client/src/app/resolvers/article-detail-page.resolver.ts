import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ArticleDetailPageService } from '../services/article-detail-page.service';

@Injectable()
export class ArticleDetailPageResolver implements Resolve<any> {

  constructor(private service: ArticleDetailPageService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.findArticleById(route.params.id);
  }
}
