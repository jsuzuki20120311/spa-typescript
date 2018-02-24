import { Component, OnInit } from '@angular/core';

import * as toastr from 'toastr';

import { Article } from '../../models/article';

import { RegisterArticlePageService } from '../../services/register-article-page.service';

@Component({
  selector: 'app-register-article-page',
  templateUrl: './register-article-page.component.html',
  styleUrls: ['./register-article-page.component.css']
})
export class RegisterArticlePageComponent implements OnInit {

  article: Article;

  isCompleted: boolean;

  constructor(private service: RegisterArticlePageService) { }

  ngOnInit() {
    this.article = {
      title: '',
      body: ''
    };
    this.isCompleted = false;
  }

  titleChanged(event: Event) {
    this.article.title = (event.target as HTMLInputElement).value;
  }

  bodyChanged(event: Event) {
    this.article.body = (event.target as HTMLInputElement).value;
  }

  registerButtonClicked() {
    this.service.createArticle(this.article)
      .subscribe(() => {
        this.isCompleted = true;
        toastr.success('記事を登録しました。');
      },
      (error) => {
        const message = error.message || 'エラーが発生しました。';
        toastr.error(message);
      });
  }
}
