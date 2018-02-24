import * as express from 'express';
import { ArticleService } from '../services/article-service';
import { AppError } from '../models/app-error';
import { Article } from '../models/article';

/**
 * 記事API用コントローラ
 */
export class ArticleController {

  private articleService: ArticleService;

  /**
   * コンストラクタ
   */
  constructor() {
    this.articleService = new ArticleService();
  }

  all(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.articleService.findAllArticles()
      .then((articles) => {
        res.send({data: articles});
      })
      .catch((error) => {
        error.status = error.status || 500;
        next(error);
      });
  }

  index(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const offset = Number.parseInt(req.query.offset, 10);
    const limit = Number.parseInt(req.query.limit, 10);
    if (Number.isNaN(offset) || Number.isNaN(limit)) {
      const error = new AppError('Not found.');
      error.status = 400;
      next(error);
      return;
    }
    this.articleService.findArticles(offset, limit)
      .then((articles) => {
        res.send({ data: articles })
      })
      .catch((error) => {
        error.status = error.status || 500;
        next(error);
      });
  }

  count(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.articleService.findArticleCount()
      .then((count) => {
        res.send({ data: count });
      })
      .catch((error) => {
        error.status = error.status || 500;
        next(error);
      });
  }

  create(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const article: Article = req.body;
    if (!article.title) {
      const error = new AppError('タイトルが空です。');
      error.status = 400;
      next(error);
      return;
    }
    this.articleService.createArticle(article)
      .then((insertId) => {
        res.send({ data: insertId });
      })
      .catch((error) => {
        error.status = error.status || 500;
        next(error);
      });
  }

  read(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      const error = new AppError();
      error.status = 400;
      next(error);
      return;
    }
    this.articleService.findArticle(id)
      .then((result) => {
        res.send({ data: result });
      })
      .catch((error) => {
        error.status = error.status || 500;
        next(error);
      });
  }

  update(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const id = Number.parseInt(req.params.id, 10);
    const article: Article = req.body;
    if (!article.title) {
      const error = new AppError('タイトルが空です。');
      error.status = 400;
      next(error);
      return;
    }
    if (Number.isNaN(id)) {
      const error = new AppError();
      error.status = 400;
      next(error);
      return;
    }
    this.articleService.modifyArticle(id, article)
      .then((result) => {
        res.send({ data: result });
      })
      .catch((error) => {
        error.status = error.status || 500;
        next(error);
      });
  }

  delete(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      const error = new AppError();
      error.status = 400;
      next(error);
      return;
    }
    this.articleService.removeArticle(id)
      .then((result) => {
        res.send({ data: result });
      })
      .catch((error) => {
        error.status = error.status || 500;
        next(error);
      });
  }
}
