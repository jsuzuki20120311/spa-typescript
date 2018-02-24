import * as mysql from 'mysql';
import { Article } from '../models/article';
import { AppError } from '../models/app-error';

/**
 * 記事データ用Daoクラス
 */
export class ArticleDao {

  /**
   * データベースコネクション
   */
  private connection: mysql.IConnection;

  constructor(connection: mysql.IConnection) {
    this.connection = connection;
  }

  insertArticle(article: Article): Promise<number> {
    const query = 'insert into article (title, body, created_at, updated_at) values (?, ?, now(), now())';
    const param = [
      article.title,
      article.body
    ];
    return new Promise<number>((resolve, reject) => {
      this.connection.query(query, param, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result.insertId);
      });
    });
  }

  selectAllArticles(): Promise<Article[]> {
    return new Promise<Article[]>((resolve, reject) => {
      const query = 'select' +
        ' id' +
        ' ,title' +
        ' ,body' +
        ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
        ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
        ' from article' +
        ' order by id';
      this.connection.query(query, [], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

  selectCount(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const query = 'select count(id) as count from article';
      this.connection.query(query, [], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        if (typeof results[0].count !== 'number') {
          throw new TypeError();
        }
        resolve(results[0].count);
      });
    });
  }

  selectArticles(offset: number = 0, limit: number = 0): Promise<Article[]> {
    return new Promise<Article[]>((resolve, reject) => {
      const query = 'select' +
          ' id' +
          ' ,title' +
          ' ,body' +
          ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
          ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
        ' from article' +
        ' order by id' +
        ' limit ?, ?';
      this.connection.query(query, [offset, limit], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

  selectArticleById(id: number): Promise<Article[]> {
    return new Promise<Article[]>((resolve, reject) => {
      const query = 'select ' +
          ' id' +
          ' ,title' +
          ' ,body' +
          ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
          ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
        ' from article' +
        ' where id = ?';
      this.connection.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        if (!Array.isArray(results) || results.length === 0) {
          const appError = new AppError('Article data is not found.');
          appError.status = 404;
          reject(appError);
          return;
        }
        resolve(results);
      });
    });
  }

  updateArticle(id: number, article: Article): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const query = 'update article ' +
        'set title = ? ' +
          ', body = ? ' +
          ', updated_at = now() ' +
        'where id = ?';
      const params = [
        article.title,
        article.body,
        id
      ];
      this.connection.query(query, params, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

  deleteArticle(id: number): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      const query = 'DELETE FROM article WHERE ID = ?';
      this.connection.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  lock(id: number): Promise<Article> {
    return new Promise<Article>((resolve, reject) => {
      const query = 'select ' +
        ' id ' +
        ' ,title' +
        ' ,body' +
        ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
        ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
        ' from article where id = ? for update';
      this.connection.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

}
