import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UpdateArticlePageService } from '../services/update-article-page.service';

@Injectable()
export class UpdateArticlePageResolver implements Resolve<any> {

  constructor(private service: UpdateArticlePageService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.findArticleById(route.params.id);
  }
}
