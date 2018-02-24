import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../../models/article';

@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.css']
})
export class ArticleDetailPageComponent {

  article: Article;

  constructor(private route: ActivatedRoute) {
    this.article = this.route.snapshot.data.article.data[0];
  }
}
