import * as mysql from 'mysql';
import { DbConfigManager } from '../config/db-config-manager';
import { ArticleDao } from '../dao/article-dao';
import { Article } from '../models/Article';
import { AppError } from '../models/app-error';


export class ArticleService {

  /**
   * 登録済みの全ての記事データを取得します。
   * @returns {Promise<Article[]>}
   */
  async findAllArticles(): Promise<Article[]> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      return await articleDao.selectAllArticles();
    } catch(error) {
      throw error;
    } finally {
      connection.destroy();
    }
  }

  /**
   * 第一引数と第二引数で指定された登録済記事データを取得します。
   * @param {number} offset 
   * @param {number} limit 
   * @returns {Promise<Article[]>}
   */
  async findArticles(offset: number, limit: number): Promise<Article[]> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      return await articleDao.selectArticles(offset, limit);
    } catch(error) {
      throw error;
    } finally {
      connection.destroy();
    }
  }

  /**
   * 登録されている記事の件数を取得します。
   * @returns {Promise<number>}
   */
  async findArticleCount(): Promise<number> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      return await articleDao.selectCount();
    } catch(error) {
      throw error;
    } finally {
      connection.destroy();
    }
  }

  /**
   * 記事を新規登録します。登録完了時、登録した記事のidを返します。
   * @param article
   * @returns {Promise<number>}
   */
  async createArticle(article: Article): Promise<number> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      return await articleDao.insertArticle(article);
    } catch(error) {
      throw error;
    } finally {
      connection.destroy();
    }
  }

  /**
   * 引数で指定されたidの記事を取得します。
   * @param id {number}
   * @returns {Promise<Article>}
   */
  async findArticle(id: number): Promise<Article[]> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      return await articleDao.selectArticleById(id);
    } catch(error) {
      throw error;
    } finally {
      connection.destroy();
    }
  }

  async modifyArticle(id: number, article: Article): Promise<Article> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      const results = await articleDao.lock(id);
      if (!Array.isArray(results) || results.length === 0) {
        const error = new AppError();
        error.status = 404;
        throw error;
      }
      if (results[0].updatedAt !== article.updatedAt) {
        const error = new AppError();
        error.status = 500;
        throw error;
      }
      return await articleDao.updateArticle(id, article);
    } catch(error) {
      throw error;
    } finally {
      connection.destroy();
    }
  }

  async removeArticle(id: number): Promise<void> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      const results = await articleDao.lock(id);
      if (!Array.isArray(results) || results.length === 0) {
        const error = new AppError();
        error.status = 404;
        throw error;
      }
      return await articleDao.deleteArticle(id);
    } catch(error) {
      throw error;
    } finally {
      connection.destroy();
    }
  }
}
