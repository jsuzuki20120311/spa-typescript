import * as express from 'express';
import { ArticleController } from '../../../controllers/article-controller';

const article = express.Router();

article.get('/', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.index(req, res, next);
});

article.post('/', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.create(req, res, next);
});

article.get('/all.json', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.all(req, res, next);
});

article.get('/count.json', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.count(req, res, next);
});

article.get('/:id\.json', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.read(req, res, next);
});

article.put('/:id\.json', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.update(req, res, next);
});

article.delete('/:id\.json', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.delete(req, res, next);
});

export default article;
