import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as toastr from 'toastr';

import { Article } from '../../models/article';

import { UpdateArticlePageService } from '../../services/update-article-page.service';

@Component({
  selector: 'app-update-article-page',
  templateUrl: './update-article-page.component.html',
  styleUrls: ['./update-article-page.component.css']
})
export class UpdateArticlePageComponent {

  isCompleted: boolean;

  article: Article;

  constructor(
    private route: ActivatedRoute,
    private service: UpdateArticlePageService
  ) {
    this.article = this.route.snapshot.data.article.data[0];
  }

  titleChanged(event) {
    this.article.title = event.target.value;
  }

  bodyChanged(event) {
    this.article.body = event.target.value;
  }

  updateButtonClicked() {
    this.service.updateArticle(this.article)
      .subscribe(() => {
        this.isCompleted = true;
        toastr.success('記事を更新しました。');
      },
      (error) => {
        const message = error.message || 'エラーが発生しました。';
        toastr.error(message);
      });
  }
}
