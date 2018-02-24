import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import * as toastr from 'toastr';
import { Article } from '../../../models/article';
import { ArticleListPageService } from '../../../services/article-list-page.service';

@Component({
  selector: 'app-article-row',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: Article;

  title: string;

  formattedCreatedAt: string;

  formattedUpdatedAt: string;

  constructor(
    private service: ArticleListPageService
  ) { }

  ngOnInit() {
    const INPUT_FORMAT = 'YYYY-MM-DD HH:mm:ss';
    const OUTPUT_FORMAT = 'YYYY年MM月DD日';
    this.formattedCreatedAt = moment(this.article.createdAt, INPUT_FORMAT).format(OUTPUT_FORMAT);
    this.formattedUpdatedAt = moment(this.article.updatedAt, INPUT_FORMAT).format(OUTPUT_FORMAT);
  }

  deleteButtonClicked(articleId: number) {
    if ( ! confirm('削除しますか?')) {
      return;
    }
    this.service.deleteArticle(articleId)
      .subscribe(() => {
        toastr.success('記事を削除しました。');
      },
      (error) => {
        const message = error.message || 'エラーが発生しました。';
        toastr.error(message);
      });
  }
}
